<template>
	<div class="personalCenter">
		<Header title="我的"></Header>
		<div class="information">
			<div class="left">
				<div class="userHeadPortrait">
					<img>
				</div>
				<div class="item">
					<p>
						<span>登录</span>/
						<span>注册</span>
					</p>
					<p>
						<span class="el-icon-mobile-phone"></span>
						<span>暂无绑定手机号</span>
					</p>
				</div>
			</div>
			<div class="right">
				<span class="el-icon-arrow-right"></span>
			</div>
		</div>
		<div class="assets">
			<div class="item">
				<p>
					<span>0.00</span>元
				</p>
				<p>我的余额</p>
			</div>
			<div class="item">
				<p>
					<span>3</span>个
				</p>
				<p>我的优惠</p>
			</div>
			<div class="item">
				<p>
					<span>0</span>分
				</p>
				<p>我的积分</p>
			</div>
		</div>
		<div class="service">
			<ul>
				<li>
					<div class="icon">
						<img src="../assets/images/icon-me-order.png">
					</div>
					<div class="content">
						<span>我的订单</span>
						<span class="el-icon-arrow-right"></span>
					</div>
				</li>
				<li>
					<div class="icon">
						<img src="../assets/images/icon-me-jf.png">
					</div>
					<div class="content">
						<span>积分商城</span>
						<span class="el-icon-arrow-right"></span>
					</div>
				</li>
				<li>
					<div class="icon">
						<img src="../assets/images/icon-me-hyk.png">
					</div>
					<div class="content">
						<span>会员卡</span>
						<span class="el-icon-arrow-right"></span>
					</div>
				</li>
			</ul>
		</div>
		<div class="service">
			<ul>
				<li>
					<div class="icon">
						<img src="../assets/images/icon-me-service.png">
					</div>
					<div class="content">
						<span>服务中心</span>
						<span class="el-icon-arrow-right"></span>
					</div>
				</li>
			</ul>
		</div>
		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import {
		Header
	} from 'mint-ui'
	import BottomNav from '../components/bottom-nav';
	export default{
		name:'PersonalCenter',
		components:{
			BottomNav,
			Header
		},
		data(){
			return{
			}
		},
		created(){
			
		}
		
	}
</script>

<style lang="less">
	.personalCenter{
		background: #f5f5f5;
		height: 100vh;
		.mint-header{
			height: 2.2rem;
			border: none;
			.mint-header-title{
				color: #fff;
				font-size: 0.8rem;
				font-weight: blod;
			}
		}
		.information{
			height: 3.38rem;
			padding:0.4rem 0.52rem 0.62rem 0.52rem;
			box-sizing: border-box;
			background: #26a2ff;
			.left{
				float: left;
				width: 13.46rem;
				height: 100%;
				.userHeadPortrait{
					width: 2.4rem;
					float: left;
					height: 100%;
					line-height:2.36rem;
					img{
						width: 2.4rem;
						height: 2.4rem;
						background: red;
						border-radius: 100%;
					}
				}
				.item{
					float: left;
					width: 11.06rem;
					height: 100%;
					padding-top: 0.3rem;
					box-sizing: border-box;
					p:nth-of-type(1){
						height: 0.98rem;
						line-height: 0.98rem;
						padding-left: 0.42rem;
						color: #fff;
						font-size: 0.76rem;
						font-weight: bold;
					}
					p:nth-of-type(2){
						height: 0.92rem;
						line-height: 0.92rem;
						padding-left: 0.44rem;
						color: #fff;
						font-size:0.52rem;
						
						span:nth-of-type(1){
							margin-bottom:0.1rem;
							font-size:0.72rem;
							vertical-align: middle;
						}
					}
				}
			}
			.right{
				float: right;
				width: 0.5rem;
				height: 100%;
				line-height:2.36rem;
				span{
					color: #fff;
					font-size: 0.46rem;
				}
			}
		}
		.assets{
			height: 3.44rem;
			display: flex;
			display: -webkit-flex;
			width: 100%;
			background: #fff;
			.item{
				flex: 1;
				height: 100%;
				p:nth-of-type(1){
					height: 2.22rem;
					line-height: 2.22rem;
					font-size: 0.46rem;
					text-align: center;
					span{
						font-size: 1.06rem;
						margin-right: 0.08rem;
						font-weight: bold;
					}
				}
				p:nth-of-type(2){
					height: 0.52rem;
					line-height: 0.52rem;
					font-size: 0.52rem;
					text-align: center;
				}
			}
			.item:nth-of-type(1){
				p:nth-of-type(1){
					span{
						color: #ff9900;
					}
				}
			}
			.item:nth-of-type(2){
				p:nth-of-type(1){
					span{
						color: #ff5f3f;
					}
				}
			}
			.item:nth-of-type(3){
				p:nth-of-type(1){
					span{
						color: #69c20c;
					}
				}
			}
		}
		.service{
			margin-top:0.36rem;
			ul{
				background: #fff;
				li{
					height:1.7rem;
					width: 100%;
					box-sizing: border-box;
					.icon{
						float: left;
						width: 1.64rem;
						height: 100%;
						line-height:1.7rem;
						img{
							width:0.52rem;
							height: 0.54rem;
							margin:  0.6rem;
						}
					}
					.content{
						float: right;
						width:13.36rem;
						height: 100%;
						line-height:1.7rem;
						border-bottom: 1px solid #f5f5f5;
						span:nth-of-type(1){
							font-size: 0.62rem;
						}
						span:nth-of-type(2){
							float: right;
							padding-right: 0.36rem;
							margin-top: 0.62rem;
							font-size:0.42rem;
						}
					}
				}
			}
		}
	}
</style>
