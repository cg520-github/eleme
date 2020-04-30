<template>
	<div class="shopGood">
		<div class="mask" :style="{backgroundColor:'#f60'}"></div>
		<div class="header" @click="trunShopInfo(shopInfo.id)">
			<div>
				<span class="el-icon-arrow-left" @click="back"></span>
				<img src="" alt="">
			</div>
			<div>
				<h4>{{shopInfo.name}}</h4>
				<p>{{shopInfo.category}}</p>
				<p>公告:{{shopInfo.promotion_info}}</p>
			</div>
		</div>
		<div class="info">
			<ul class="list">
				<li @click="selIndex(0)" :class="index==0?'active':''"><span>商品</span></li>
				<li @click="selIndex(1)" :class="index==1?'active':''"><span>评价</span></li>
			</ul>
			<div class="good" v-if=" index == 0">
				<el-row>
					<el-col :span="6">
						<div class="grid-content bg-purple-dark1">
							<ul>
								<li v-for="(item,index) in menu" :class="nowIndex==index?'active':''" @click="selectAides(index,item)">{{item.name}}</li>
							</ul>
						</div>
					</el-col>
					<el-col :span="18">
						<div class="scroll" @touchmove="move($event)" ref='scroll'>
							<div class="grid-content bg-purple-dark2" v-for="(item,index) in menu" :ref="'index'+index">
								<div class="shoppingItem" v-for="sonItem in item.foods">
									<div class="left">
										<img class="shopping-img">
										<img src="../assets/images/xp.png" class="new-products-img">
									</div>
									<div class="right">
										<h3>
											<span>{{sonItem.name}}</span>
											<span :style="{color:'#'+sonItem.attributes.icon_color}">{{sonItem.attributes.icon_name}}</span>
										</h3>
										<p>{{sonItem.description}}</p>
										<p>
											<span>月售{{sonItem.satisfy_count}}份</span>
											<span>好评率{{sonItem.satisfy_rate*100}}%</span>
										</p>
										<p>
											<span class="unit-price"><i>￥</i>{{sonItem.price}}</span>
											<span class="add-shopping" @click="addNum(sonItem)">+</span>
											<span class="shopping-num" v-if="sonItem.onoff">{{sonItem.num}}</span>
											<span class="del-shopping" v-if="sonItem.onoff" @click="remNum(sonItem)">-</span>
										</p>
									</div>
								</div>

							</div>
						</div>
					</el-col>

				</el-row>
			</div>
			<div class="evaluate" v-else>
				<div class="comprehensive-score">
					<div class="left">
						<p>{{score.overall_score}}</p>
						<p>综合评价</p>
						<p>高于周边商家{{score.compare_rating*100}}%</p>
					</div>
					<div class="right">
						<div>
							<span class="title">服务态度</span>
							<el-rate id="pf" disabled show-score text-color="#ff9900" v-model="service_score"></el-rate>
						</div>
						<div>
							<span class="title">菜品评价</span>
							<el-rate id="pf" disabled show-score text-color="#ff9900" v-model="food_score"></el-rate>
						</div>
						<div>
							<span class="title">送达时间</span>
							<span class="service-time">{{score.deliver_time}}分钟</span>
						</div>
					</div>
				</div>
				<div class="user-rating">
					<ul class="label">
						<li  v-for="(item,index) in RatingsTags" :class="{'nolabel':notag.indexOf(item.nameTag)!=-1,'active':nowTagsIndex==index}"   @click="ratingsTags(item,index)">{{item.nameTag}}{{item.count}}</li>
					</ul>
					<div class="content" v-loading.fullscreen="!onoffData" element-loading-text="加载中" element-loading-spinner="el-icon-loading" style="width: 100%;">
						<div class="appraise" v-for="item in ugcRatingsData">
							<div class="appraise_box">
								<div class="left">
									<img :src="item.avatar" alt="">
								</div>
								<div class="right">
									<h5>{{item.username}} <span>{{item.rated_at}}</span></h5>
									<p>
										<el-rate id="pf" v-model="item.rating_star"></el-rate>
										<span>{{item.rating_text}}</span>
									</p>
									<div class="img_dra" >
										<img  v-for="sonItem in item.item_ratings" :src="sonItem.image_hash" alt="">
									</div>
									<div class="com_label">
										<span v-for="sonItem in item.item_ratings">{{sonItem.name}}</span>
									</div>
								</div>
							</div>
						</div>

						
						<div style="height: 2rem;line-height: 2rem;text-align: center;font-size: 0.46rem;" @click="start" @touchend="end">
							上拉刷新数据
						</div>
					</div>
				</div>
			</div>
		</div>
		<zz v-if="onoff" :foods="foods" @fn="sureGoods" @del="fnDel"></zz>
		<div class="bot" v-if="this.index==0?true:false">
			<img :src="imgSel">
			<i v-if="allNum">{{allNum}}</i>
			<div @click="showCarData">
				<span>￥{{allPrice}}</span>
				<span>{{shopInfo.piecewise_agent_fee.tips}}</span>
			</div>
			<span v-if="dis">还差￥{{dis}}元起送</span>
			<span class="js" v-else  @click="mai">去结算</span>
		</div>
		
		<shopCar @parentClear="clearCar" :carDatas="menu" v-if="onoffCar" @hiddenCarData="hiddenCarData" @changeAddCarNum="changeAddCarNum" @changeRemoveCarNum="changeRemoveCarNum"></shopCar>
	</div>
</template>

<script>
	import request from '../api/request';
	import zz from '../components/zz'
	import shopCar from '../components/shop-car'
	import starge from '../api/tool.js'
	export default {

		name: 'Shops',
		components: {
			zz,
			shopCar
		},
		data() {
			return {
				shopInfo: {
					name: "",
					address: "",
					id: null,
					phone: "",
					category: "",
					supports: [{
							description: "",
							icon_color: "",
							icon_name: "",
							id: null,
							name: "",
						},

					],
					recent_order_num: null,
					rating_count: null,
					rating: null,
					promotion_info: "",
					piecewise_agent_fee: {
						tips: ""
					},
					opening_hours: [""],
					is_new: true,
					is_premium: true,
					image_path: "",
					float_minimum_order_amount: null,
					float_delivery_fee: null,
					distance: "",
					order_lead_time: "",
					delivery_mode: {
						color: "",
						id: null,
						text: ""
					}
				},
				index: 0,
				menu: [], // 食品列表	
				nowIndex: 0,
				num: 0,
				onoff: false,
				foods: {},
				imgSel: './static/img/car1.png',
				score: {},
				service_score: 0,
				food_score: 0,
				RatingsTags:[],
				nowTagsIndex:0,
				pages: 1,
				up: 0,
				onoffData: true,
				tag_name:'全部',
				ugcRatingsData:[],
				notag:['不满意','差评'],
				loactionCar:[],
				onoffCar:false
			}
		},
		methods: {
			trunShopInfo(id){
				console.log(id)
				this.$router.push('/info-shop?shopId='+id)
			},
			changeAddCarNum(id){
				let arr=[];
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.id==id) {
							sonItem.num++;
						}
						if (sonItem.onoff) {
										
							arr.push({
								id:sonItem.id,
								num:sonItem.num
							})
						}
					})
				})
				

				
				//改变本地存储的购物车数据
				let id1 = this.$route.params.id;
				starge.setCarShop(id1,arr);
			},
			changeRemoveCarNum(id){
				let arr=[];
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.id==id) {
							if(sonItem.num>0){
								sonItem.num--;
							}
							if(sonItem.num==0){
								sonItem.onoff=false;
							}else if (sonItem.num < 0) {
								sonItem.num = 0;
							}
						}
						if (sonItem.onoff) {
										
							arr.push({
								id:sonItem.id,
								num:sonItem.num
							})
						}
					})
				})
				

				
				let id1 = this.$route.params.id;
				//改变本地存储的购物车数据
				starge.setCarShop(id1,arr);
			},
			showCarData(){
				this.onoffCar=true;
			},
			hiddenCarData(){
				this.onoffCar=false;
			},
			clearCar(){
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.onoff) {
							sonItem.onoff==false;
							sonItem.num=0;
						}
						if(sonItem.num==0){
							sonItem.onoff=false;
						}else if (sonItem.num < 0) {
							sonItem.num = 0;
						}
						
					})
				})
				this.onoffCar=false;
				

				
				
				//改变本地存储的购物车数据
				let id = this.$route.params.id;
				starge.setCarShop(id,[]);
			},
			back(ev) {
				ev.stopPropagation();
				this.$router.back();
			},
			selIndex(index) {
				this.index = index;
			},
			selectAides(index, item) {
				this.nowIndex = index;
				this.rightData = item;
				let iH = this.$refs['index' + index][0].offsetTop;
				this.$refs.scroll.scrollTo(0, iH);
			},
			move(ev) {
				let str = null;
				for (let attr in this.$refs) {
					let obj = this.$refs[attr][0];
					if (attr != 'scroll') {
						if (obj.getBoundingClientRect().top >= 0 && obj.getBoundingClientRect().top <= (this.$refs.scroll.offsetHeight -
								240)) {
							str = attr.substring(5)
							this.nowIndex = str;
						}
					}
				}
			},
			addNum(sonItem) {
				if (sonItem.onoff) {
					sonItem.num++;
				} else {
					this.onoff = true;
					this.foods = {
						name: sonItem.name,
						specifications: sonItem.specifications.name,
						values: sonItem.specifications.values,
						price: sonItem.price,
						tagert: sonItem
					}
				}
				let arr=[];
				
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.onoff) {

							arr.push({
								id:sonItem.id,
								num:sonItem.num
							})
						}
					})
				})
				
				
				//改变本地存储的购物车数据
				let id = this.$route.params.id;
				starge.setCarShop(id,arr);
			},
			remNum(sonItem) {
				sonItem.num--;

				if (sonItem.num == 0) {
					sonItem.onoff = false;
				} else if (sonItem.num < 0) {
					sonItem.num = 0;
				}
				let arr=[];
				
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.onoff) {
				
							arr.push({
								id:sonItem.id,
								num:sonItem.num
							})
						}
					})
				})
				
				
				//改变本地存储的购物车数据
				let id = this.$route.params.id;
				starge.setCarShop(id,arr);
			},
			sureGoods(item) {
				item.target.onoff = true;
				item.target.num = 1;
				this.onoff = false;
				let arr=[];
				
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.onoff) {

							arr.push({
								id:sonItem.id,
								num:sonItem.num
							})
						}
					})
				})
				console.log(arr)
				
				//改变本地存储的购物车数据
				let id = this.$route.params.id;
				starge.setCarShop(id,arr);
			},
			fnDel() {
				this.onoff = false;
			},
			mai() {
				this.$store.commit('changeSettlement',{
					shopInfo:this.shopInfo,
					goods:this.menu
				})
				this.$router.push('/sure-order');
			},
			ratingsTags(item,index){
				this.nowTagsIndex=index;
				this.tag_name=item.nameTag;
				//获取评价信息
				request.getUgcRatings({
					restaurant_id: this.$route.params.id,
					tag_name:this.tag_name,
					offset: (this.pages - 1) * 20
				}).then((res) => {
					this.ugcRatingsData=res;
				})
			},
			start(ev) {
				ev = ev.targetTouches[0];
				this.up = ev.pageY;
			},
			end(ev) {
				ev = ev.changedTouches[0];
				let dis = ev.pageY - this.up;
			
				if (dis < 0 && this.onoffData) {
					this.onoffData = false;
					this.pages++;
					setTimeout(() => {
						//获取评价信息
						request.getUgcRatings({
							restaurant_id: this.$route.params.id,
							tag_name:this.tag_name,
							offset: (this.pages - 1) * 20
						}).then((res) => {
							this.ugcRatingsData = this.ugcRatingsData.concat(res)
							this.onoffData = true;
						})
					}, 1000)
				}
			},
		},
		created() {
			let id = this.$route.params.id;

			let carList=starge.getCarShop(id);
			

			request.getShoppingRestaurant({
				restaurant_id: id
			}).then((res) => {
				this.shopInfo = res;
			})


			// 食品列表

			request.getMenu({
				restaurant_id: id
			}).then((res) => {
				res.forEach((item) => {
					item.foods.forEach((sonItem) => {

						sonItem.onoff = false;
						sonItem.num = 0;
						carList.forEach((itemId)=>{
							if(sonItem.id==itemId.id){
								sonItem.num = itemId.num;
								sonItem.onoff = true;
							}
						})
						
					})
				})

				this.menu = res;
			})


			//获取评分
			request.getRatingsScores({
				restaurant_id: id
			}).then((res) => {
				this.score = res;
				this.service_score = parseFloat(parseFloat(this.score.service_score).toFixed(2))
				this.food_score = parseFloat(parseFloat(this.score.food_score).toFixed(2))
			})
			
			//获取评价分类
			request.getRatingsTags({
				restaurant_id: id
			}).then((res) => {
				this.RatingsTags=res;
			})
			
			request.getUgcRatings({
				restaurant_id: id,
				tag_name:this.tag_name,
				offset: (this.pages - 1) * 20
			}).then((res) => {
				this.ugcRatingsData=res;
			})
			
		},
		watch: {
			menu: {
				handler() {

					let sel = false;
					
					this.menu.forEach((item) => {
						item.foods.forEach((sonItem) => {
							if (sonItem.onoff) {
								sel = true;
								
							}
						})
					})

					if (sel) {
						this.imgSel = './static/img/car2.png';
					} else {
						this.imgSel = './static/img/car1.png';
					}
					
					
				},
				deep: true
			}
		},
		computed: {
			allNum() {

				let i = 0;
				
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.onoff) {
							i++;
							
						}
					})
				})
				
				
				
				return i;
			},
			allPrice() {
				let all = 0;
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.onoff) {

							all += sonItem.price * sonItem.num
						}
					})
				})

				return all;
			},
			dis() {
				let all = 0;
				this.menu.forEach((item) => {
					item.foods.forEach((sonItem) => {
						if (sonItem.onoff) {

							all += sonItem.price * sonItem.num
						}
					})
				})
				if ((all - this.shopInfo.float_minimum_order_amount) >= 0) {
					return false;
				} else {
					return -(all - this.shopInfo.float_minimum_order_amount);
				}
			}
		}
	}
</script>

<style lang="less">
	.shopGood {
		position: relative;
		
		.mask {
			width: 100%;
			min-height: 100vh;
			filter: blur(30px);
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.header {
			height: 3.6rem;
			width: 100%;
			background: transparent;
			display: flex;
			display: -webkit-flex;

			div:nth-of-type(1) {
				width: 4.56rem;
				height: 100%;

				span {
					font-size: 0.94rem;
					color: #fff;
					float: left;
					margin: 1.38rem 0 0 0.44rem;
					width: 0.94rem;
					height: 0.72rem;
				}

				img {
					float: left;
					width: 2.74rem;
					height: 2.68rem;
					margin: 0.6rem 0 0 0rem;
					background: green
				}
			}

			div:nth-of-type(2) {
				width: 10.46rem;
				height: 100%;
				padding-top: 0.36rem;
				box-sizing: border-box;

				h4 {
					height: 1.1rem;
					line-height: 1.1rem;
					color: #fff;
					font-size: 0.88rem;
					font-weight: bold;
				}

				p {
					height: 0.96rem;
					line-height: 0.96rem;
					color: #fff;
					font-size: 0.48rem;
				}
			}
		}

		.info {
			background: #fff;

			.list {
				height: 1.68rem;
				display: flex;
				display: -webkit-flex;
				border-bottom: 1px solid #e1e1e1;
				box-sizing: border-box;

				li {
					width: 0;
					flex: 1;
					line-height: 1.68rem;
					text-align: center;
					color: #474848;
					font-size: 0.6rem;
				}

				.active {

					span {
						color: #2288e7;
						border-bottom: 0.1rem solid #2288e7;
						padding-bottom: 0.28rem;

					}
				}
			}

			.good {
				background: #fff;

				.el-col-18 {
					height: 19.56rem;
					overflow: hidden;
					position: relative;

					.scroll {
						height: 19.56rem;
						overflow: scroll;
						position: relative;
					}
					::-webkit-scrollbar{width:0px;height:0px;}
				}

				.bg-purple-dark1 {
					padding-top: 0.38rem;

					li {
						width: 100%;
						height: 2.58rem;
						line-height: 2.58rem;
						text-align: center;
						color: #4f4d4d;
						font-size: 0.6rem;
						background: #f5f5f5;
						border-left: 0.14rem solid transparent;
						box-sizing: border-box;
					}

					.active {
						border-color: #3191e8;
						color: #383838;
						background: #fff;
					}
				}

				.bg-purple-dark2 {
					padding-top: 0.38rem;

					.shoppingItem {
						width: 100%;

						display: -webkit-box;
						display: flex;
						padding-right: 0.48rem;
						box-sizing: border-box;

						.left {
							position: relative;
							width: 2.22rem;
							overflow: hidden;

							.shopping-img {
								width: 1.9rem;
								height: 1.9rem;
								margin: 0.3rem 0 0 0.38rem;
								background: red;
							}

							.new-products-img {
								position: absolute;
								top: 0;
								left: 0;
								width: 0.94rem;
								height: 0.94rem;
							}
						}

						.right {
							width: 8.7rem;
							height: 100%;
							padding: 0.3rem 0 0 0.32rem;
							box-sizing: border-box;

							h3 {
								height: 0.96rem;
								line-height: 0.96rem;
								padding-left: 0.02rem;

								span:nth-of-type(1) {
									float: left;
									font-size: 0.68rem;
									font-weight: bold;
								}

								span:nth-of-type(2) {
									float: right;
									line-height: 0.44rem;
									margin-top: 0.06rem;
									font-size: 0.24rem;
									padding: 0.08rem 0.02rem 0.06rem 0.06rem;
									border: 0.04rem solid #ff6600;
									color: #ff6600;
									border-radius: 0.1rem;
									margin-right: 0.08rem;
								}
							}

							p:nth-of-type(1) {
								height: 0.84rem;
								line-height: 0.84rem;
								padding-left: 0.02rem;
								color: #6e6d6d;
								font-size: 0.46rem;
							}

							p:nth-of-type(2) {
								height: 0.84rem;
								line-height: 0.84rem;
								padding-left: 0.02rem;
								font-size: 0.44rem;
								color: #585858;
								font-weight: bold;

								span:nth-of-type(1) {
									margin-right: 0.38rem;
								}
							}

							p:nth-of-type(3) {
								height: 2rem;
								padding-top: 0.4rem;

								.unit-price {
									margin-top: 0.1rem;
									font-size: 0.56rem;
									font-weight: blod;
									color: #fe6701;
									float: left;

									i {
										font-style: normal;
										font-size: 0.38rem;
									}
								}

								.add-shopping {
									float: right;
									width: 0.76rem;
									height: 0.76rem;
									text-align: center;
									line-height: 0.76rem;
									background: #3190e8;
									color: #fff;
									font-size: 0.36rem;
									font-weight: bold;
									border-radius: 100%;
								}

								.shopping-num {
									float: right;
									padding: 0 0.4rem;
									height: 0.76rem;
									text-align: center;
									line-height: 0.76rem;
									font-size: 0.36rem;
									font-weight: bold;
								}

								.del-shopping {
									float: right;
									width: 0.75rem;
									height: 0.75rem;
									text-align: center;
									line-height: 0.75rem;
									background:#fff;
									color: #3190e8;
									font-size: 0.36rem;
									font-weight: bold;
									border-radius: 100%;
									border: 1px solid #3190e8;
								}
							}
						}
					}
				}
			}

			.evaluate {
				background: #f5f5f5;

				.comprehensive-score {
					width: 100%;
					height: 4.3rem;
					background: #fff;
					padding-left: 0.34rem;
					box-sizing: border-box;
					margin-bottom: 0.48rem;

					.left {
						width: 6.16rem;
						height: 100%;
						float: left;
						padding-top: 0.86rem;
						box-sizing: border-box;

						p:nth-of-type(1) {
							height: 1.18rem;
							line-height: 1.18rem;
							font-size: 0.8rem;
							color: #ff6400;
							text-align: center;
							font-weight: bold;
						}

						p:nth-of-type(2) {
							height: 0.98rem;
							line-height: 0.98rem;
							font-size: 0.5rem;
							color: #3f3f3f;
							text-align: center;
							font-weight: bold;
						}

						p:nth-of-type(3) {
							height: 0.56rem;
							line-height: 0.56rem;
							font-size: 0.36rem;
							color: 777676;
							text-align: center;
						}
					}

					.right {
						width: 8.5rem;
						height: 100%;
						float: right;
						padding-top: 0.74rem;
						box-sizing: border-box;

						div {
							height: 0.98rem;
							line-height: 0.98rem;
							font-size: 0.58rem;
							color: #3f3f3f;

							.title {
								float: left;
								margin-right: 0.56rem;
								font-weight: bold;
							}

							.service-time {
								font-size: 0.32rem;
								color: #777676;
							}

							#pf {
								width: 5rem;
								float: left;

								span {
									margin-top: 0.26rem;

									i {
										font-size: 0.3rem;
										margin-right: 0.02rem;
									}
								}

								.el-rate__text {
									margin-top: 0;
									margin-left: 0.52rem;
									font-size: 0.36rem;
									font-weight: bold;
									margin-bottom: 0.5rem;
									display: inline-block;
								}

							}
						}
					}
				}

				.user-rating {
					background: #fff;
					margin-top: 0.48rem;

					.label {
						width: 100%;
						padding: 0.46rem 0.42rem;
						overflow: hidden;
						box-sizing: border-box;
						font-size: 0.56rem;

						li {
							float: left;
							padding: 0.4rem 0.28rem;
							margin-bottom: 0.16rem;
							background: #ebf5ff;
							color: #5a5b5c;
							list-style: none;
							margin-left: 0.16rem;
							border-radius: 0.2rem;
						}

						.active {
							background: #3191e8!important;
							color: white!important;
						}

						.nolabel {
							background: #f5f5f5;
							color: #5a5b5c;
						}
					}
				}

				.appraise {
					width: 100%;
					height: 7.2rem;
					padding: 0.46rem 0.42rem;
					box-sizing: border-box;

					.appraise_box {
						width: 100%;
						height: 100%;

						.left {
							width: 1.44rem;
							height: 1.44rem;
							float: left;
							background: #B1DFBB;
						}

						.right {
							width: 12.62rem;
							height: auto;
							padding-left: 0.7rem;
							box-sizing: border-box;
							float: right;

							h5 {
								line-height: 0.7rem;
								font-size: 0.46rem;
								color: #6d6c6c;

								span {
									float: right;
								}
							}

							p {
								color: #6d6c6c;

								

								span {
									display: inline-block;
									font-size: 0.5rem;
									line-height: 0.96rem;
								}
								#pf {
									width: 3rem;
									float: left;
									position: relative;
									span {
										margin-top: 0.07rem;
								
										i {
											font-size: 0.3rem;
											margin-right: 0.02rem;
										}
									}
								
									.el-rate__text {
										margin-top: 0;
										margin-left: 0.52rem;
										font-size: 0.36rem;
										font-weight: bold;
										margin-bottom: 0.5rem;
										display: inline-block;
									}
								
								}
							}

							.img_dra {
								width: 100%;
								height: 3.14rem;
								line-height: 3.14rem;

								img {
									width: 2.8rem;
									height: 2.8rem;
									background: red;
									float: left;
									margin-right: 0.36rem;
								}

								img:last-of-type {
									margin-right: none;
								}
							}

							.com_label {
								width: 100%;
								height: 1.48rem;
								padding: 0.22rem 0rem;
								box-sizing: border-box;

								span {
									height: 1.04rem;
									text-align: center;
									float: left;
									border: 1px solid #d2d2d2;
									line-height: 1.04rem;
									margin-right: 0.76rem;
									font-size: 0.42rem;
									color: #6d6c6c;
									border-radius: 0.16rem;
									padding: 0.1rem;
								}

								span:last-of-type {
									margin-right: none;
								}
							}
						}
					}
				}

			}


		}

		.bot {
			position: fixed;
			bottom: 0;
			z-index: 10;
			left: 0;
			width: 100%;
			height: 1.9rem;
			background: #3d3d3f;

			img {
				position: absolute;
				width: 2.26rem;
				height: 2.26rem;
				top: -0.7rem;
				left: 0.44rem;
			}

			div {
				padding-left: 3.26rem;
				float: left;
				width: 7.06rem;
				height: 100%;
				color: #fff;

				span:nth-of-type(1) {
					float: left;
					width: 100%;
					font-size: 0.54rem;

				}

				span:nth-of-type(2) {
					float: left;
					width: 100%;
					font-size: 0.36rem;
				}
			}

			&>span {
				float: right;
				background: #535257;
				height: 100%;
				width: 4.68rem;
				line-height: 1.9rem;
				text-align: center;
				color: #fff;
				font-size: 0.62rem;
			}

			.js {
				background: #4cda64;
			}

			i {
				position: absolute;
				top: -0.9rem;
				left: 1.88rem;
				width: 0.9rem;
				height: 0.9rem;
				font-size: 0.58rem;
				color: #fff;
				background: #ff461d;
				line-height: 0.9rem;
				text-align: center;
				border-radius: 100%;
				font-style: normal;
			}
		}
	}
</style>
