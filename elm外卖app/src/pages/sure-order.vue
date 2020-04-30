<template>
	<div class="sure-order">
		<Header fixed title="确认订单">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
			<div slot="right">
				<span class="el-icon-user" v-if="userInfo.id"></span>
				<div v-else @click="login">登录/注册</div>
			</div>
		</Header>
		<div class="addAddress" @click="addAddress">
			<div class="content" v-if="address.address_detail==undefined||address.address_detail==''">
				<span><i class="el-icon-location-outline"></i>请添加一个收货地址</span>
				<span class="el-icon-arrow-right"></span>
			</div>
			<div class="receivingAddress" v-else>
				<div class="left">
					<p>
						<span>{{address.name}}</span>
						<span>{{address.sex==1?'男':'女'}}</span>
						<span>{{address.phone}}</span>
					</p>
					<p>
						<i>{{address.tag}}</i>
						<i>{{address.address}}{{address.address_detail}}</i>
					</p>
				</div>
				<div class="right">
					<span class="el-icon-arrow-right"></span>
				</div>
			</div>
		</div>
		<div class="serviceTime">
			<div class="title">送达时间</div>
			<div class="content">
				<p>
					<span>尽快送达</span>|预计<span>{{fnTime}}</span>
				</p>
				<p>
					<span>蜂鸟专送</span>
				</p>
			</div>
		</div>
		<div class="paymentMethod">
			<div class="title">
				<span>支付方式</span>
				<span @click="paymentMethod">在线支付<i class="el-icon-arrow-right"></i></span>
			</div>
			<div class="redEnvelopes">
				<span>红包</span>
				<span>暂时只在饿了么APP中支持</span>
			</div>
		</div>
		<div class="purchaseGoods">

			<div class="businessBox">
				<img>
				<span>效果演示</span>
			</div>
			<div class="content">
				<ul>
					<li v-for="item in priceAll">
						<div class="left">
							<span>{{item.name}}</span>
						</div>
						<div class="right">
							<span class="num">×{{item.num}}</span>
							<span class="price">￥{{item.price}}</span>
						</div>
					</li>
					<li>
						<div class="left">
							<span>包装</span>
						</div>
						<div class="right">
							<span class="price">￥{{shopInfo.packing_fee}}</span>
						</div>
					</li>
					<li>
						<div class="left">
							<span>配送费</span>
						</div>
						<div class="right">
							<span class="price">￥{{shopInfo.float_delivery_fee}}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="Calculation">
				<div class="left">
					订单<span>￥{{allPrice}}</span>
				</div>
				<div class="right">
					<span>待支付</span>
					<span>￥{{allPrice}}</span>
				</div>
			</div>
		</div>

		<div class="Other">
			<ul>
				<li>
					<span>订单备注</span>
					<span @click="selRemarks">{{fnRemarksInformation}}<i class="el-icon-arrow-right"></i></span>
				</li>
				<li>
					<span>发票抬头</span>
					<span @click="invoice">{{this.$store.state.invoiceRise}}<i class="el-icon-arrow-right"></i></span>
				</li>
			</ul>
		</div>

		<div class="bot">
			<div class="left">
				待支付<span>￥{{allPrice}}</span>
			</div>
			<div class="right" @click="paymentMethod">
				<span>确认下单</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Header
	} from 'mint-ui'
	import request from '../api/request.js'
	export default {
		name: 'sureOrder',
		components: {
			Header
		},
		data() {
			return {
				priceAll: [],
				shopInfo: {},
				userInfo: {},
				address: {},
				remarksInformation:''
			}
		},
		methods: {
			back() {
				this.$router.back();
			},
			addAddress() {
				if (this.userInfo.id) {
					this.$router.push('/address-selection')
				} else {
					this.$message({
						duration: 1000,
						center: true,
						message: '亲，请登录APP',
						type: 'warning',
						showClose: true
					});
				}
			},
			login() {
				this.$router.push('/login')
			},
			selRemarks(){
				this.$router.push('/order-remarks')
			},
			invoice(){
				this.$router.push('/invoice')
			},
			paymentMethod(){
				request.order({
					user_id:this.$store.state.userInfo.id,
					restaurant_id:this.$store.state.settlement.shopInfo.id,
					address_id:this.$store.state.receivingAddress.id,
					description:this.$store.state.remarksInformation.join('')
				}).then((res)=>{
					this.$router.push('/payment-method')
				})
			}
		},
		created() {
			console.log(this.$store.state.settlement.shopInfo)
			let arr = [];
			this.$store.state.settlement.goods.forEach((item) => {
				item.foods.forEach((sonItem) => {
					if (sonItem.onoff) {
						arr.push(sonItem)
					}
				})
			})
			console.log(arr)
			this.priceAll = arr;
			this.shopInfo = this.$store.state.settlement.shopInfo;

			//从状态管理中获取用户信息
			let user = this.$store.state.userInfo;
			this.userInfo = user;
			console.log(this.$store.state.receivingAddress)
			this.address = this.$store.state.receivingAddress;
		},
		computed: {
			allPrice() {
				let p = 0;
				this.priceAll.forEach((item) => {
					p += item.num * item.price;
				})
				p = p + this.shopInfo.float_delivery_fee + this.shopInfo.packing_fee;
				return p;
			},
			fnTime() {
				let n = parseFloat(this.shopInfo.order_lead_time)
				let date = new Date();
				date.setMinutes(date.getMinutes() + n);
				let h = date.getHours();
				let min = date.getMinutes();
				return '' + h + ':' + min;
			},
			fnRemarksInformation(){
				return this.$store.state.remarksInformation.join(' , ');
			}
		}
	}
</script>

<style lang="less">
	.el-message {
		top: 10vh !important;
		min-width: 100vw !important;
	}

	.sure-order {
		background: #f1f1f1;
		height: 100vh;

		.mint-header {
			height: 1.8rem;

			padding: 0 0.2rem;
			z-index: 99999999 !important;

			.mint-header-title {
				color: #fff;
				line-height: 1.8rem;
				font-size: 0.74rem;
				font-weight: bold;
				height: 100%;
			}

			.is-left {
				line-height: 0;
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

		.addAddress {
			height: 3.3rem;
			margin-top: 1.8rem;
			position: relative;
			padding-bottom: 0.04rem;

			.content {
				position: absolute;
				bottom: 0.04rem;
				left: 0;
				width: 100%;
				height: 3.3rem;
				padding: 0 0.58rem;
				border-bottom: 0.1rem dashed transparent;
				box-sizing: border-box;
				background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-65deg, #fab59b 0, #fab59b 1em, #fff 0, #fff 2em, #93ade6 0, #93ade6 3em, #fff 0, #fff 4em);

				span:nth-of-type(1) {
					float: left;
					width: 13.3rem;
					height: 100%;
					line-height: 3.2rem;
					color: #2a2a2a;
					font-size: 0.62rem;

					i {
						color: #077ae3;
						margin-right: 0.28rem;
					}
				}

				span:nth-of-type(2) {
					float: right;
					width: 0.5rem;
					height: 100%;
					line-height: 3.2rem;
					text-align: center;
					color: #a2a2a2;
					font-size: 0.6rem;
				}


			}

			.receivingAddress {
				position: absolute;
				bottom: 0.04rem;
				left: 0;
				width: 100%;
				height: 3.3rem;
				padding: 0 0.58rem;
				border-bottom: 0.1rem dashed transparent;
				box-sizing: border-box;
				background: linear-gradient(white, white) padding-box, repeating-linear-gradient(-65deg, #fab59b 0, #fab59b 1em, #fff 0, #fff 2em, #93ade6 0, #93ade6 3em, #fff 0, #fff 4em);

				.left {
					float: left;
					width: 13.3rem;
					height: 100%;

					p:nth-of-type(1) {
						height: 1rem;
						line-height: 0.84rem;
						margin-top: 0.6rem;

						span:nth-of-type(1) {
							float: left;
							color: #000000;
							font-size: 0.74rem;
						}

						span:nth-of-type(2) {
							float: left;
							color: #000000;
							font-size: 0.6rem;
							padding-left: 0.22rem;
						}

						span:nth-of-type(3) {
							float: left;
							color: #000000;
							font-size: 0.6rem;
							padding-left: 0.22rem;
						}
					}

					p:nth-of-type(2) {
						height: 0.88rem;
						line-height: 0.7rem;
						margin-bottom: 0.48rem;
						font-size: 0.44rem;
						color: #13111b;

						i:nth-of-type(1) {
							color: #fff;
							background: #4bd962;
							font-size: 0.48rem;
							border-radius: 0.1rem;
							float: left;
							font-style: normal;
							padding: 0.06rem 0.14rem;
							margin-top: 0.16rem;
						}

						i:nth-of-type(2) {
							color: #848484;
							font-size: 0.6rem;
							float: left;
							font-style: normal;
							margin-top: 0.18rem;
							margin-left: 0.28rem;
						}
					}
				}

				.right {
					float: right;
					width: 0.5rem;
					height: 100%;
					line-height: 3.2rem;
					text-align: center;
					color: #a2a2a2;
					font-size: 0.6rem;
				}

			}
		}

		.serviceTime {
			height: 3.78rem;
			background-color: #fff;
			margin-top: 0.32rem;
			padding-right: 0.6rem;
			box-sizing: border-box;

			.title {
				float: left;
				width: 4.84rem;
				height: 100%;
				line-height: 3.78rem;
				border-left: 0.18rem solid #3191e8;
				text-align: center;
				font-size: 0.72rem;
				color: #2d2d2d;
				font-weight: bold;
			}

			.content {
				float: right;
				width: 9.38rem;
				height: 100%;
				padding-top: 0.48rem;

				p:nth-of-type(1) {
					height: 1.7rem;
					line-height: 1.7rem;
					text-align: right;
					padding-right: 0.14rem;
					font-size: 0.62rem;
					color: #3191e8;

					span:nth-of-type(1) {
						margin-right: 0.28rem;
					}

					span:nth-of-type(2) {
						margin-left: 0.28rem;
					}
				}

				p:nth-of-type(2) {
					height: 0.82rem;
					line-height: 0.82rem;
					padding-right: 0.06rem;
					text-align: right;
					font-size: 0.48rem;
					color: #fff;

					span {
						padding: 0.16rem 0.18rem;
						background: #3191e8;
						border-radius: 0.1rem;
					}
				}
			}

		}

		.paymentMethod {
			margin-top: 0.42rem;
			background: #fff;

			.title {
				height: 1.96rem;
				padding: 0 0.64rem;
				box-sizing: border-box;
				border-bottom: 1px solid #ededed;

				span:nth-of-type(1) {
					float: left;
					height: 1.96rem;
					line-height: 1.96rem;
					width: 10.72rem;
					font-size: 0.7rem;
					color: #545454;
				}

				span:nth-of-type(2) {
					float: right;
					height: 1.96rem;
					line-height: 1.96rem;
					width: 2.98rem;
					font-size: 0.58rem;
					color: #c8c8c8;

					i {
						font-size: 0.42rem;
					}
				}
			}

			.redEnvelopes {
				height: 1.88rem;
				padding: 0 0.64rem;
				box-sizing: border-box;

				span:nth-of-type(1) {
					float: left;
					height: 1.88rem;
					line-height: 1.88rem;
					width: 1.14rem;
					font-size: 0.52rem;
					color: #9e9e9e;
				}

				span:nth-of-type(2) {
					float: right;
					height: 1.88rem;
					line-height: 1.88rem;
					width: 12.58rem;
					font-size: 0.58rem;
					color: #c8c8c8;
					text-align: right;
				}
			}
		}

		.purchaseGoods {
			background: #fff;
			margin-top: 0.4rem;

			.businessBox {
				height: 2.6rem;
				border-bottom: 1px solid #ededed;
				line-height: 2.6rem;
				padding-left: 0.6rem;

				img {
					width: 1.14rem;
					height: 1.18rem;
					line-height: 0;
					background: red;
					vertical-align: middle;
					margin-bottom: 0.4rem;
					margin-right: 0.32rem;
				}

				span {
					color: #2d2d2d;
					font-size: 0.74rem;
					font-weight: bold;
				}
			}

			.content {

				ul {
					li {
						padding: 0 0.62rem;
						height: 2.24rem;
						border-bottom: 1px solid #ededed;

						.left {
							float: left;
							width: 10.34rem;
							height: 100%;
							line-height: 2.24rem;

							span {
								color: #545454;
								font-size: 0.6rem;
							}
						}

						.right {
							float: right;
							width: 3.42rem;
							height: 100%;
							line-height: 2.24rem;

							span {
								font-size: 0.46rem;
							}

							.num {
								color: #ff5e02;
								float: left;
							}

							.price {
								color: #545454;
								float: right;
							}
						}
					}
				}
			}

			.Calculation {
				padding-left: 0.62rem;
				overflow: hidden;
				height: 3.38rem;
				padding-top: 0.6rem;
				box-sizing: border-box;

				.left {
					float: left;
					width: 10.34rem;
					height: 100%;
					font-size: 0.58rem;

					span {
						margin-left: 0.2rem;
					}
				}

				.right {
					float: right;
					width: 2.96rem;
					height: 100%;

					span {
						color: #fe6500;
						font-size: 0.6rem;
					}

					span:nth-of-type(1) {
						margin-left: 0.08rem;
					}

					span:nth-of-type(2) {
						margin-top: 1.14rem;
					}
				}
			}

		}

		.Other {
			margin-top: 0.4rem;
			background: #fff;
			margin-bottom: 1.88rem;

			ul {
				li {
					height: 2rem;
					line-height: 2rem;
					padding: 0 0.62rem;

					span:nth-of-type(1) {
						float: left;
						font-size: 0.56rem;
					}

					span:nth-of-type(2) {
						float: right;
						font-size: 0.5rem;

						i {
							margin-left: 0.38rem;
							font-size: 0.42rem;
						}
					}
				}
			}
		}

		.bot {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 1.88rem;
			z-index: 999999;

			.left {
				float: left;
				width: 10.88rem;
				height: 100%;
				background: #3c3c3c;
				line-height: 1.88rem;
				padding-left: 0.62rem;
				box-sizing: border-box;
				font-size: 0.7rem;
				color: #fff;

				span {
					margin-left: 0.2rem;
				}
			}

			.right {
				float: right;
				width: 4.12rem;
				height: 100%;
				background: #56d176;
				line-height: 1.88rem;
				text-align: center;

				span {
					color: #fff;
					font-size: 0.7rem;
				}
			}
		}
	}
</style>
