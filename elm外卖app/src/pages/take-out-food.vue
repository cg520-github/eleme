<template>
	<div class="index">
		<div class="position" @click="turnPosition"></div>
		<Header fixed :title="address">
			<span slot="left" class="el-icon-search" @click="turnSearch"></span>
			<div slot="right">
				<span class="el-icon-user" @click="Jump" v-if="userInfo.id"></span>
				<div v-else  @click="login">登录/注册</div>
			</div>
		</Header>
		<div class="banner">
			<swiper :options="swiperOption">
				<swiper-slide v-for="(item,index) in navList" :key="'pages'+index">
					<div v-for="(itemSon,index) in item" :key="'sp'+index" @click="trunBusiness(itemSon)">
						<img :src="itemSon.image_url">
						<h3>{{itemSon.title}}</h3>
					</div>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>

		<div class="shops">
			<h3><span class="el-icon-s-shop"></span>附近商家</h3>
			<div class="content" v-loading.fullscreen="!onoffData" element-loading-text="加载中" element-loading-spinner="el-icon-loading"
			 style="width: 100%;">
				<div class="item" v-for="item in shopsList" @click="trunShops(item)">
					<div class="left">
						<img :src="item.image_path">
					</div>

					<div class="right">
						<h4>
							<i>品牌</i>
							<b @click="trunShops(item)">{{item.name}}</b>
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
			</div>
			<div style="height: 2rem;line-height: 2rem;text-align: center;font-size: 0.46rem;" @click="start" @touchend="end">
				上拉刷新数据
			</div>
		</div>
		<BottomNav></BottomNav>
	</div>

</template>

<script>
	import {
		swiper,
		swiperSlide
	} from 'vue-awesome-swiper'
	import request from '../api/request'
	//引进底部导航组件
	import BottomNav from '../components/bottom-nav'

	import {
		Header
	} from 'mint-ui'




	export default {
		name: 'TakeOutFood',
		components: {
			BottomNav,
			Header,
			swiper,
			swiperSlide
		},
		data() {
			return {
				isLogin: false,
				address: '',
				navList: [],
				swiperOption: {
					//显示分页
					pagination: {
						el: '.swiper-pagination'
					}
				},
				pages: 1,
				shopsList: [],
				up: 0,
				onoffData: true,
				userInfo:{}
				
			}
		},
		methods: {
			Jump() {
				this.$router.push('/personal-center')
			},
			trunBusiness(item) {
				//点击分类跳转到商铺
				// console.log(id)
				this.$router.push({
					path: '/business',
					query: {
						id: item.id,
						title: item.title
					}
				})
			},
			turnSearch() {
				//跳转到搜索页面
				this.$router.push('/search')
			},
			turnPosition() {
				this.$router.push('/positioning')
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
						//获取附近商家的数据
						request.getShopping({
							latitude: this.$store.state.locationInfo.latitude,
							longitude: this.$store.state.locationInfo.longitude,
							offset: (this.pages - 1) * 20
						}).then((res) => {
							this.shopsList = this.shopsList.concat(res)
							this.onoffData = true;
						})
					}, 1000)
				}
			},
			trunShops(item) {
				this.$router.push('/shops/' + item.id)
			},
			login(){
				this.$router.push('/login')
			}
		},
		created() {

			//先从状态管理里获取地址
			let location = this.$store.state.locationInfo
			if (!location.name) {
				//通过百度地图api获取地址
				//获取当前经纬度
				let that = this;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					// console.log(r)
					//逆解析成地址
					var geoc = new BMap.Geocoder();
					geoc.getLocation(r.point, function(s) {
						// console.log(s, that)
						// console.log(s)
						that.address = s.addressComponents.city;
						that.$store.commit('changeLocationInfo', s)
					})
				});

			} else {
				this.address = location.name;
			}

			request.index_entry().then((res) => {
				let pages = Math.ceil(res.length / 8);

				for (var i = 0; i < pages; i++) {
					this.navList[i] = []
				}

				res.forEach((item, index) => {
					let num = Math.floor(index / 8);
					this.navList[num].push(item)
				})

			})


			//获取附近商家的数据
			request.getShopping({
				latitude: this.$store.state.locationInfo.latitude,
				longitude: this.$store.state.locationInfo.longitude,
				offset: (this.pages - 1) * 20
			}).then((res) => {
				this.shopsList = res
			})
			
			//从状态管理中获取用户信息
			let user=this.$store.state.userInfo;
			this.userInfo=user;
		}
	}
</script>


<style lang="less">
	.index {
		padding-bottom: 1.82rem;
		min-height: 100vh;
		background: #F5F5F5;

		.position {
			position: fixed;
			top: 0;
			left: 50%;
			width: 7.3rem;
			height: 1.78rem;
			margin: 0 0 0 -3.65rem;
			z-index: 9999999999;
		}

		.mint-header {
			font-size: 0.28rem;
			height: 1.78rem;
			padding: 0 0.2rem;
			z-index: 99999999 !important;


			.mint-header-title {
				line-height: 1.78rem;
				color: #fff;
				font-size: 0.78rem;
				font-weight: bold;
			}

			.is-left span {
				font-size: 0.78rem;
			}

			.is-right {
				span {
					font-size: 0.76rem;
				}

				div {
					font-size: 0.6rem;
				}
			}
		}

		.banner {
			padding-top: 1.78rem;
			width: 100%;
			height: 8.16rem;
			background: #fff;

			.swiper-container {
				width: 100%;
				height: 8.16rem;
				background: #fff;

				.swiper-wrapper {
					.swiper-slide {
						display: flex;
						display: -webkit-flex;
						flex-wrap: wrap;

						div {
							width: 25%;
							height: 4.08rem;

							img {
								width: auto;
								height: 1.38rem;
								display: block;
								margin: 0.58rem auto 0.74rem auto;
							}

							h3 {
								height: 0.84rem;
								line-height: 0.84rem;
								color: #5d5c5c;
								text-align: center;
								font-size: 0.44rem;
							}
						}
					}

				}

			}

			.swiper-container-horizontal>.swiper-pagination-bullets {
				bottom: 0;
			}
		}

		.shops {
			background: #fff;
			margin-top: 0.46rem;

			h3 {
				height: 1.26rem;
				line-height: 1.26rem;
				padding-left: 0.58rem;
				font-size: 0.44rem;
				color: #5d5c5c;
				padding-bottom: 0.2rem;

				span {
					font-size: 0.58rem;
					padding-right: 0.3rem;
				}
			}

			.content {

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

	}
</style>
