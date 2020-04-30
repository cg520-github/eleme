<template>
	<div class="business">
		<Header fixed :title="this.$route.query.title">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
		</Header>
		<div class="select">
			<ul>
				<li :class="nowSelect==0?'active':''" @click="sel(0)">
					{{this.$route.query.title}}
					<span :class="nowSelect==0?'el-icon-caret-top':'el-icon-caret-bottom'"></span>
				</li>
				<li :class="nowSelect==1?'active':''" @click="sel(1)">
					排序
					<span :class="nowSelect==1?'el-icon-caret-top':'el-icon-caret-bottom'"></span>
				</li>
				<li :class="nowSelect==2?'active':''" @click="sel(2)">
					筛选
					<span :class="nowSelect==2?'el-icon-caret-top':'el-icon-caret-bottom'"></span>
				</li>
			</ul>

		</div>
		<div class="content">
			<div class="item" v-for="item in shopsList"  @click="trunShops(item)">
				<div class="left">
					<img :src="item.image_path">
				</div>

				<div class="right">
					<h4>
						<i>品牌</i>
						<b>{{item.name}}</b>
						<span>票</span>
						<span>准</span>
						<span>保</span>
					</h4>
					<p>
						<el-rate id="pf" v-model="item.rating" disabled></el-rate>
						月售{{item.recent_order_num}}单
						<i>准时达</i>
						<i :style="{backgroundColor:'#'+item.delivery_mode.color,border:'1px solid #'+item.delivery_mode.color}">{{item.delivery_mode.text}}</i>
					</p>
					<p>
						<span>￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</span>
						<span>{{item.distance}}/<b>{{item.order_lead_time}}</b></span>
					</p>
				</div>
			</div>
			<div class="mask" v-if="!(nowSelect==null)">
				<div class="fl" v-if="nowSelect == 0">
					<el-row>
						<el-col :span="12">
							<el-menu :default-active="fnIndex">
								<el-menu-item v-for="(item,index) in classData" :index="''+index" :key="''+index">
									<img>
									<div slot="title" style="display: inline-block;" @click="selItem(item)">
										<span>{{item.name}}</span>
										<span>{{item.count}}</span>
									</div>

								</el-menu-item>
							</el-menu>

						</el-col>
						<el-col :span="12">
							<div style="" class="list">
								<ul>
									<li v-for="item in nowItem.sub_categories">
										<span @touchend="sleEnd(item)">{{item.name}}</span>
										<span>{{item.count}}</span>
									</li>
								</ul>
							</div>
						</el-col>
					</el-row>
				</div>
				<div class="px" v-if="nowSelect == 1">
					<ul>
						<li @click="px(4)">
							<div>
								<span class="el-icon-sort"></span>
							</div>
							<div>智能排序</div>
						</li>
						<li @click="px(5)">
							<div>
								<span class="el-icon-location-outline"></span>
							</div>
							<div>距离最近</div>
						</li>
						<li @click="px(6)">
							<div>
								<span class="el-icon-magic-stick"></span>
							</div>
							<div>销量最高</div>
						</li>
						<li @click="px(1)">
							<div>
								<span class="el-icon-coin"></span>
							</div>
							<div>起送价最低</div>
						</li>
						<li @click="px(3)">
							<div>
								<span class="el-icon-time"></span>
							</div>
							<div>时间</div>
						</li>
						<li @click="px(2)">
							<div>
								<span class="el-icon-truck"></span>
							</div>
							<div>配送速度最快</div>
						</li>
					</ul>
				</div>
				<div class="sx" v-if="nowSelect == 2">
					<div>
						<h4>配送方式</h4>
						<button v-for="item in distributionMode" :style="{color:'#'+item.color}" @click="selectDistributionMode(item)">
							<span class="el-icon-check activeDistributionMode" v-if="item==nowDistributionMode"></span>{{item.text}}
						</button>
					</div>
					<div>
						<h4>商家属性（可以多选）</h4>
						<button v-for="item in merchantAttribute" style="position: relative;" @click="selectMerchantAttribute(item)">
							<span :style="{color:'#'+item.icon_color,border:'1px solid #'+item.icon_color}" v-if="(!item.onoff)">{{item.icon_name}}</span>
							<span class="el-icon-check activeDistributionMode" style="position:absolute;top:0.6rem;left:0.2rem;" v-else></span>
							{{item.name}}
						</button>
					</div>
					<p>
						<button @click="clearData">清空</button>
						<button @click="suerData">确定（{{fn_nowMerchantAttribute}}）</button>
					</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	
	import {
		Header
	} from 'mint-ui'
	import request from '../api/request'
	export default {
		name: 'Business',
		methods: {
			back() {
				this.$router.back()
			},
			sel(index) {
				this.nowSelect = index;
			},
			trunShops(item) {
				this.$router.push('/shops/'+item.id)
			},
			selItem(item) {
				this.nowItem = item;
			},
			sleEnd(item) {
				this.nowSelect = null;


				// 请求和选择有关的数据
				request.getRestaurantCategory({
					latitude: this.$store.state.locationInfo.latitude,
					longitude: this.$store.state.locationInfo.longitude,
					restaurant_category_id: this.nowItem.item,
					tegory_ids: item.id
				}).then((res) => {

					this.listShop = res;
				})

			},
			px(id) {

				this.nowSelect = null;
				// 请求和选择有关的数据
				request.getRestaurantCategory({
					latitude: this.$store.state.locationInfo.latitude,
					longitude: this.$store.state.locationInfo.longitude,
					order_by: id
				}).then((res) => {
					this.listShop = res;
				})
			},
			selectDistributionMode(item) {
				this.nowDistributionMode = item;
			},
			selectMerchantAttribute(item){
				item.onoff=!item.onoff;
				// if(this.nowMerchantAttribute.indexOf(item)!=-1){
				// 	//有就删除
				// 	this.nowMerchantAttribute.splice(this.nowMerchantAttribute.indexOf(item),1)
				// }else{
				// 	//没有就添加
				// 	this.nowMerchantAttribute.push(item);
				// }
				
			},
			clearData(){
				this.nowDistributionMode={};
				let arr=this.merchantAttribute.map((item)=>{
					return{
						...item,
						onoff:false
					}
				})
				this.merchantAttribute=arr;
			},
			suerData(){
				this.nowSelect = null;
				// 请求和选择有关的数据
				request.getShopping({
					latitude: this.$store.state.locationInfo.latitude,
					longitude: this.$store.state.locationInfo.longitude,
					delivery_mode: JSON.stringify(this.nowDistributionMode),
					support_ids:JSON.stringify(this.nowMerchantAttribute)
				}).then((res) => {
					this.listShop = res;
					this.nowDistributionMode={};
					let arr=this.merchantAttribute.map((item)=>{
						return{
							...item,
							onoff:false
						}
					})
					this.merchantAttribute=arr;
				})
			}
		},
		components: {
			Header
		},
		data() {
			return {
				nowSelect: null,
				shopsList: [],
				classData: [],
				nowId: null,
				nowItem: {},
				distributionMode: [],
				merchantAttribute: [],
				nowDistributionMode: {},
				nowMerchantAttribute:[]
			}
		},
		created() {
			
			let id = this.$route.query.id;
			this.nowId = id;
			request.getShopping({
				latitude: this.$store.state.locationInfo.latitude,
				longitude: this.$store.state.locationInfo.longitude,
				restaurant_category_id: id
			}).then((res) => {
				this.shopsList = res
			})

			//获取数据
			request.getRestaurantCategory({
				latitude: this.$store.state.locationInfo.latitude,
				longitude: this.$store.state.locationInfo.longitude,
			}).then((res) => {
				this.classData = res
			})

			request.getDeliveryMods().then((res) => {
				this.distributionMode = res
			})

			request.getCategory().then((res) => {
				
				let arr=res.map((item)=>{
					return{
						...item,
						onoff:false
					}
				})
				this.merchantAttribute = arr;
			})
		},
		computed: {
			fnIndex() {

				let index1 = null;
				this.classData.map((item, index) => {
					if (item.id == this.nowId) {
						index1 = index;
						this.nowItem = item
					}
				})
				return '' + index1;
			},
			fn_nowMerchantAttribute(){
				let arr=this.merchantAttribute.filter((item)=>{
					return item.onoff
				})
				return arr.length;
			}
		},
		watch:{
			merchantAttribute:{
				handler(){
					this.nowMerchantAttribute=[]
					this.merchantAttribute.map((item)=>{
						if(item.onoff){
							this.nowMerchantAttribute.push(item);
						}
					})
					
				},
				deep:true
			}
		}
	}
</script>

<style lang="less">
	.business {
		padding-top: 3.32rem;
		.mint-header {
			font-size: 0.28rem;
			height: 1.78rem;
			padding: 0 0.2rem;
			z-index: 99999999!important;
			
		
			.mint-header-title {
				line-height: 1.78rem;
				color: #fff;
				font-size: 0.78rem;
				font-weight: bold;
			}
		
			.is-left span {
				font-size: 0.78rem;
			}
		
		}
		.mask {
			position: fixed;
			top: 3.32rem;
			left: 0;
			width: 100%;
			height: 100vh;
			background: rgba(0, 0, 0, .5);
			z-index: 10;

			.fl {
				.el-col:nth-of-type(1) {
					.is-active {
						background: #fff;
						color: #000;
					}

					ul {
						background: #eee !important;

						.el-menu-item {
							img {
								width: 0.76rem;
								height: 0.62rem;
								background: red;
							}

							height: 1.7rem;
							line-height: 1.7rem;

							div {
								width: 4.84rem;

								span:nth-of-type(1) {
									color: #939393;
									font-size: 0.5rem;
									float: left;
								}

								span:nth-of-type(2) {
									float: right;
									font-size: 0.34rem;
									color: #fff;
									background: #cccccc;
									border-radius: 0.32rem;
									line-height: 0.58rem;
									margin-top: 0.44rem;
									padding: 0.12rem;
								}
							}
						}
					}
				}

				.list {
					background: #fff;
					border-top: 1px solid #fafafa;
					padding-left: 0.44rem;
					max-height: 100vh;
					overflow-y: auto;

					li {
						height: 1.6rem;
						line-height: 1.6rem;
						border-bottom: 0.08rem solid #f4f4f4;
						font-size: 0.52rem;
						color: #666666;

						span:nth-of-type(1) {
							float: left;

						}

						span:nth-of-type(2) {
							float: right;
							padding-right: 0.42rem
						}
					}
				}
			}

			.px {
				background: #fff;

				ul {
					li {
						height: 2.38rem;
						display: flex;
						display: -webkit-flex;

						div:nth-of-type(1) {
							width: 1.74rem;

							span {
								float: left;
								width: 0.54rem;
								height: 0.46rem;
								margin: 0.96rem 0 0 0.84rem;
								font-size: 0.56rem;
							}
						}

						div:nth-of-type(2) {
							width: 13.26rem;
							border-bottom: 1px solid #f0f0f0;
							height: 100%;
							box-sizing: border-box;
							line-height: 2.38rem;
							color: #525252;
							font-size: 0.48rem;
						}
					}
				}
			}

			.sx {
				background: #f1f1f1;

				.activeDistributionMode {
					color: #308fe9 !important;
					font-size: 0.6rem;
				}

				div {
					background: #fff;
					padding-left: 0.44rem;

					h4 {
						height: 1.38rem;
						line-height: 1.38rem;
						color: #393939;
						font-size: 0.36rem;
					}

					button {
						width: 4.44rem;
						height: 1.32rem;
						border: 1px solid #efefef;
						background: #fff;
						border-radius: 0.1rem;
						margin-bottom: 0.28rem;
						margin-right: 0.2rem;
						span{
							margin-right: 0.2rem;
						}
					}
				}

				div:nth-of-type(2) {
					padding-bottom: 0.34rem;

					span {
						border-radius: 0.1rem;
						line-height: 0;
						padding: 0.04rem 0.08rem;
						margin-right: 0.04rem;
					}
					
				}

				p {
					padding: 0.28rem 0.2rem;
					height: 1.68rem;

					button {
						width: 7.08rem;
						height: 100%;
						border-radius: 0.1rem;

					}

					button:nth-of-type(1) {
						background: #fff;
						color: #000;
						margin-right: 0.24rem
					}

					button:nth-of-type(2) {
						background: #56d176;
						color: #fff;

					}
				}
			}
		}

		.mint-header {
			height: 1.82rem;

			.mint-header-title {
				color: #FFF;
				font-weight: bold;
				font-size: 0.74rem;
			}

			z-index: 99999999;
		}

		.select {
			height: 1.5rem;
			width: 100%;
			position: fixed;
			top: 1.82rem;
			left: 0;
			border-bottom: 1px solid #f0f0f0;
			z-index: 99999999;
			background: #ffffff;

			ul {
				height: 100%;
				display: flex;
				display: -webkit-flex;

				li {
					width: 0;
					flex: 1;
					height: 100%;
					line-height: 1.5rem;
					text-align: center;
					color: #000;
					font-size: 0.48rem;
				}

				.active {
					color: #298de7;
				}
			}
		}

		.content {
			position: relative;

			.item {
				width: 100%;
				height: 4.24rem;
				border-bottom: 0.04rem solid #d4d4d4;
				display: flex;
				display: -webkit-flex;
				padding-right: 0.28rem;
				box-sizing: border-box;

				.left {
					width: 3.28rem;
					height: 100%;

					img {
						width: 2.5rem;
						height: 2.5rem;
						margin: 0.72rem 0 0 0.38rem;
					}
				}

				.right {
					width: 11.4rem;
					height: 100%;
					padding-top: 0.38rem;
					box-sizing: border-box;

					h4 {
						height: 1.28rem;
						line-height: 1.28rem;
						color: #242424;
						font-size: 0.58rem;
						font-weight: bold;

						i {
							font-style: normal;
							font-size: 0.24rem;
							background: #ffd966;
							padding: 0 0.06rem 0.04rem 0.06rem;
							border-radius: 0.1rem;
						}

						span {
							font-weight: normal;
							float: right;
							font-size: 0.34rem;
							color: #939393;
							border: 0.04rem solid #f0f0f0;
							padding: 0.04rem;
							margin-top: 0.38rem;
							margin-right: 0.04rem;
							line-height: 0.58rem;
						}
					}

					p:nth-of-type(1) {
						height: 1.02rem;
						line-height: 1.02rem;
						font-size: 0.28rem;
						color: #7F7F7F;

						#pf {
							width: 3rem;
							float: left;

							span {
								margin-top: 0.26rem;

								i {
									font-size: 0.24rem;
									margin-right: 0.02rem;
								}
							}

						}

						>i {
							float: right;
							font-style: normal;
							font-size: 0.24rem;
							line-height: 0.56rem;
							padding: 0.08rem;
							color: #fff;

						}

						>i:nth-of-type(1) {
							border: 1px solid #1883e2;
							color: #1883e2;
						}

						>i:nth-of-type(2) {
							margin-right: 0.06rem;

						}
					}

					p:nth-of-type(2) {
						height: 1.1rem;
						line-height: 1.1rem;

						span:nth-of-type(1) {
							margin-left: 0.2rem;
							font-size: 0.36rem;
							color: #545454;
							float: left;
						}

						span:nth-of-type(2) {
							float: right;
							margin-right: 0.54rem;
							font-size: 0.32rem;
							color: #545454;

							b {
								color: #3090e9;
							}
						}
					}
				}
			}
		}
	}
</style>
