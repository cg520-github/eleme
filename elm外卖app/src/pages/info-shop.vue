<template>
	<div class="detail">
		<Header fixed title="商家详情">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
		</Header>
		<div class="activity">
			<h4>活动与属性</h4>
			<p><span>保</span>已加入“外卖保”计划，食品安全有保障(APP专享)</p>
			<p><span>准</span>准时必达，超时秒赔(APP专享)</p>
			<p><span>票</span>该商家支持开发票，请在下单时填写好发票抬头(APP专享)</p>
		</div>
		<div class="foodcheck">
			<h4><span>食品监督安全公示</span><span>企业认证详情</span></h4>
			<div class="check">
				<div>
					<img  alt="">
				</div>
				<div>
					<p>监督检查结果:<span>良 好</span></p>
					<p>检查日期:</p>
				</div>
			</div>
		</div>
		<div class="infos">
			<h4>商家信息</h4>
			<p>效果演示</p>
			<p>地址:广东省广州市越秀区中山五路219号华联购物中F1心</p>
			<p>营业时间: [8: 30/20: 30]</p>
			<p>营业执照</p>
			<p>餐饮服务许可证</p>
		</div>
	</div>
</template>

<script>
	import {Header} from 'mint-ui';
	export  default{
		name:'info-shop',
		components:{
			Header
		},
		methods:{
			back() {
				this.$router.back();
			}
		}
	}
</script>

<style lang="less">
	.mint-header{
		height: 1.82rem;
	}
	.mint-header-title{
		color: #fff;
		font-size: 0.74rem;
		font-weight: bold;
	}
	.detail{
		background:#ebebeb;
		padding-top:1.82rem;
		.activity{
			width: 15rem;
			height: 8.14rem;
			background:#fff;
			margin-top: 0.32rem;
			padding-left:0.52rem;
			box-sizing:border-box;
			h4{
				font-size: 0.66rem;
				font-weight: bold;
				height: 1.84rem;
				line-height: 1.84rem;
			}
			p{
				font-size: 0.46rem;
				height: 1.44rem;
				line-height: 1.44rem;
				margin-top: 0.28rem;
				color:#5c5b5b;
				span{
					width: 0.58rem;
					height: 0.72rem;
					line-height: 0.72rem;
					display: inline-block;
					background: #999999;
					color: #fff;
					border-radius: 0.08rem;
					font-size: 0.44rem;
					text-align: center;
					margin-right: 0.54rem;
				}
			}
			p:nth-of-type(2){
				span{
					background: #57a9ff;
				}
			}
		}
		.foodcheck{
			width: 100%;
			height: 5.52rem;
			background: #fff;
			margin-top: 0.32rem;
			
			box-sizing:border-box;
			h4{
				height: 1.8rem;
				line-height: 1.8rem;
				padding-left:0.52rem;
				border-bottom:0.02rem solid #e5e5e5 ;
				span{
					font-size: 0.68rem;
					
				}
				span:nth-of-type(1){
					float: left;
					height: 1.8rem;
					line-height: 1.8rem;
				}
				span:nth-of-type(2){
					float: right;
					height: 1.8rem;
					line-height: 1.8rem;
					color: #afaeae;
					padding-right: 1.1rem;
				}
			}
			.check{
				margin-top: 0.64rem;
				
				div:nth-of-type(1){
					width:1.9rem;
					height:1.9rem;
					padding-left:0.52rem;
					float:left;
					img{
						width: 100%;
						height: 100%;
					}
				}
				div:nth-of-type(2){
					float: left;
					width: 12.58rem;
					p{
						height: 1.26rem;
						line-height: 1.26rem;
						color: #4b4b4b;
						padding-left:2.14rem;
						span{
							color: #88d63a;
						}
					}
				}
			}
		}
		.infos{
			width: 100%;
			height:12.92rem;
			background: #fff;
			margin-top: 0.32rem;
			h4{
				height: 1.7rem;
				line-height: 1.7rem;
				padding-left:0.52rem;
				border-bottom: 0.02rem solid #e5e5e5;
				font-size: 0.68rem;
			}
			p{
				padding-left:0.52rem;
				height: 2.06rem;
				line-height: 2.06rem;
				border-bottom: 0.02rem solid #e5e5e5;
				color: #747474;
				font-size: 0.48rem;
			}
			p:nth-of-type(2){
				height: 2.82rem;
				line-height: 2.82rem;
			}
			
		}
	}
</style>
