<template>
	<div class="order">
		<Header fixed title="订单列表"></Header>
		<div class="content">
			<ul>
				<li v-for="item in listOrder">
					<div class="details" @click="orderDetails">
						<div class="left">
							<img :src="item.status_bar.image_type">
						</div>
						<div class="right">
							<div class="title">
								<div class="contentLeft">
									<p>
										<span>{{item.consignee}}</span>
										<span class="el-icon-arrow-right"></span>
									</p>
									<p>
										<span>2018-09-28</span>
										<span>14:30</span>
									</p>
								</div>
								<div class="contentRight">
									<span>{{item.status_bar.title}}</span>
								</div>
							</div>
							<div class="shoping" v-for="sonItem in item.group">
								<div class="contentLeft">
									<span>{{sonItem.name}}</span>
									<span>等{{item.group.length}}件商品</span>
								</div>
								<div class="contentRight">
									<span>￥{{sonItem.price}}</span>
								</div>
							</div>
							
						</div>
					</div>
					
					<div class="btn">
						<button class="payment" v-if="!(item.status_bar.title=='支付超时')">
							去支付（{{item.order_time|fnTime}}）
						</button>
						<button class="Again" v-else>再来一单</button>
					</div>
				</li>
				
			</ul>
		</div>
		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import {Header} from 'mint-ui';
	import BottomNav from '../components/bottom-nav';
	import request from '../api/request'
	export default{
		name:'Order',
		components:{
			BottomNav,
			Header
		},
		data(){
			return{
				listOrder:[]
			}
		},
		methods:{
			orderDetails(){
				this.$router.push('/order-details')
			}
		},
		created(){
			request.getBosOrders(this.$store.state.userInfo.id).then((res)=>{
				this.listOrder=res;
			})
			let b=null;
			b=setInterval(()=>{
				let c=0;
				this.listOrder.forEach((item)=>{
					item.order_time=item.order_time-1;
					let dis=parseInt((new Date().getTime()-item.order_time)/1000);
					if(dis>=15*60){
						//作废的订单处理
						item.status_bar.title='支付超时';
						c++;
					}
					
				})
				if(c==this.listOrder.length){
					clearInterval(b);
				}
				
			},1000)
		},
		filters:{
			fnTime:function(value){
				let dis=parseInt((new Date().getTime()-value)/1000);
				
				if(dis<=15*60){
					let b=15*60-dis;
					let min=parseInt(b/60);
					let s=b%60;
					return '还剩'+min+'分'+s+'秒';
				}else{
					return '支付超时'
				}
				
				
			}
		}
	}
</script>

<style lang="less">
	.order{
		background: #F5F5F5;
		width: 100%;
		height: 100vh;
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
		
		
		}
		.content{
			margin-top:1.78rem;
			margin-bottom: 1.82rem;
			ul{
				
				li{
					background: #fff;
					margin-bottom: 0.52rem;
					overflow: hidden;
					.details{
						overflow: hidden;
						.left{
							float: left;
							width: 1.94rem;
							height: 100%;
							img{
								width: 1.14rem;
								height: 1.18rem;
								background: red;
								margin: 0.54rem 0 0 0.44rem;
							}
						}
						.right{
							float: right;
							width:13.06rem;
							height: 100%;
							
							.title{
								height: 2.54rem;
								border-bottom: 1px solid #ededed;
								.contentLeft{
									float: left;
									width:9.94rem;
									height: 100%;
									padding-top: 0.56rem;
									box-sizing: border-box;
									p:nth-of-type(1){
										height:1.02rem;
										line-height: 1.02rem;
										span:nth-of-type(1){
											font-size: 0.68rem;
											color: #272727;
											font-weight: bold;
										}
										span:nth-of-type(2){
											font-size:0.34rem;
											color: #c8c8c8;
										}
									}
									p:nth-of-type(2){
										height: 0.7rem;
										line-height: 0.7rem;
										padding-left:0.02rem;
										font-size: 0.4rem;
										color: #a4a4a4;
										span:nth-of-type(1){
											margin-right: 0.2rem;
										}
									}
								}
								.contentRight{
									float: right;
									width:3.12rem;
									height: 100%;
									text-align: center;
									span{
										display: inline-block;
										margin-top: 0.56rem;
										font-size: 0.56rem;
										color: #313131;
									}
								}
							}
							.shoping{
								height: 1.92rem;
								border-bottom: 1px solid #ededed;
								.contentLeft{
									float: left;
									width: 9.56rem;
									height: 100%;
									color: #545454;
									line-height: 1.92rem;
									font-size: 0.58rem;
								}
								.contentRight{
									float: right;
									width: 3.5rem;
									height: 100%;
									line-height: 1.92rem;
									span{
										font-size: 0.5rem;
										color: #fe6500;
										font-weight: bold;
										letter-spacing:0.04rem;
									}
								}
							}
							
							
						}
					}
					
					.btn{
						height: 1.68rem;
						padding:0.25rem 0.5rem 0 0;
						box-sizing: border-box;
						text-align: right;
						.payment{
							padding: 0.16rem 0.24rem 0.16rem 0.24rem;
							border: 0.04rem solid #fed07f;
							border-radius: 0.14rem;
							background: #fff;
							color: #fe9a00;
							font-weight: bold;
							font-size:0.46rem;
						}
						.Again{
							padding: 0.16rem 0.24rem 0.16rem 0.24rem;
							border: 0.04rem solid #80bbf1;
							border-radius: 0.14rem;
							background: #fff;
							color: #3190e7;
							font-weight: bold;
							font-size:0.46rem;
						}
					}
				}
			}
		}
	}
</style>
