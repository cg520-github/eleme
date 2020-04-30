<template>
	<div class="orderDetails">
		<Header fixed title="订单详情">
			<i slot="left" class="el-icon-arrow-left" @click="back"></i>
		</Header>
		<div class="waitingForPayment">
			<p>
				<img>
			</p>
			<p>
				<span>等待支付</span>
			</p>
			<p>
				<button>再来一单</button>
			</p>
		</div>
		<div class="purchaseDetails">
			<ul>
				<li class="title">
					<img>
					<span>效果演示</span>
					<span class="el-icon-arrow-right"></span>
				</li>
				<li>
					<div class="left">
						<span>牛奶</span>
					</div>
					<div class="right">
						<span class="num">×3</span>
						<span class="price">￥51</span>
					</div>
				</li>
				<li class="actualPayment">
					<span>实付￥1736.00</span>
				</li>
			</ul>
		</div>
		<div class="distributionInformation">
			<p>配送信息</p>
			<p>送达时间：尽快送达</p>
			<p><span>送货地址：123</span><span>13487049588</span></p>
			<p>配送方式：蜂鸟专送</p>
		</div>
		<div class="orderInformation">
			<p>订单信息</p>
			<p>订单号：3456</p>
			<p>支付方式：在线支付</p>
			<p><span>下单时间：2018-09-28</span><span>15:34</span></p>
		</div>
	</div>
</template>

<script>
	import {
		Header
	} from 'mint-ui';
	export default {
		name: 'orderDetails',
		components: {
			Header
		},
		data() {
			return {

			}
		},
		methods: {
			back() {
				this.$router.back();
			}
		}
	}
</script>

<style lang="less">
	.orderDetails {
		width: 100%;
		height: 100vh;
		background: #f1f1f1;

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

		}

		.waitingForPayment {
			margin-top: 1.78rem;
			background: #fff;
			text-align: center;
			margin-bottom: 0.46rem;

			p:nth-of-type(1) {
				padding-top: 0.66rem;

				img {
					width: 2.9rem;
					height: 2.9rem;
					border: 0.06rem solid #3191e8;
					background: red;
					border-radius: 100%;
				}
			}

			p:nth-of-type(2) {
				height: 1.9rem;
				line-height: 1.9rem;
				font-size: 0.82rem;
				color: #2b2b2b;
				font-weight: bold;
			}

			p:nth-of-type(3) {
				height: 2.06rem;

				button {
					padding: 0.26rem 0.28rem;
					border: 0.04rem solid #98c8f3;
					color: #3191e8;
					border-radius: 0.16rem;
					font-size: 0.56rem;
					background: #fff;
				}
			}
		}

		.purchaseDetails {
			margin-bottom: 0.46rem;
			li {
				padding: 0 0.62rem;
				height: 2.24rem;
				border-bottom: 1px solid #ededed;
				background: #fff;
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

					.num {
						color: #c8c8c8;
						float: left;
					}

					.price {
						color: #545454;
						float: right;
					}
				}
			}
			.actualPayment{
				line-height: 2.24rem;
				text-align: right;
				span{
					font-size: 0.62rem;
					color:#fa6419;
					font-weight: bold;
				}
			}
			.title {
				height: 1.68rem;
				line-height: 1.68rem;

				img {
					width: 1.12rem;
					height: 1.18rem;
					background: red;
					vertical-align: middle;
				}

				span:nth-of-type(1) {
					display: inline-block;
					height: 100%;
					line-height: 1.68rem;
				}

				span:nth-of-type(2) {
					float: right;
					display: inline-block;
					height: 100%;
					line-height: 1.68rem;
				}
			}
		}
		.distributionInformation{
			padding-left: 0.46rem;
			background: #fff;
			margin-bottom: 0.46rem;
			p:nth-of-type(1){
				height: 1.82rem;
				line-height: 1.82rem;
				font-size: 0.68rem;
				color: #000000;
				font-weight: bold;
			}
			p:nth-of-type(2){
				height: 1.92rem;
				line-height: 1.92rem;
				font-size: 0.6rem;
				color: #545454;
			}
			p:nth-of-type(3){
				height: 2.9rem;
				font-size: 0.58rem;
				color: #545454;
				span{
					display: block;
				}
				span:nth-of-type(1){
					margin: 0.62rem 0 0.48rem 0;
				}
				span:nth-of-type(2){
					margin-left: 2.94rem;
				}
			}
			p:nth-of-type(4){
				height: 1.7rem;
				line-height: 1.7rem;
				font-size: 0.58rem;
				color: #545454;
			}
		}
		.orderInformation{
			padding-left: 0.46rem;
			background: #fff;
			p:nth-of-type(1){
				height: 1.82rem;
				line-height: 1.82rem;
				font-size: 0.68rem;
				color: #000000;
				font-weight: bold;
			}
			p:nth-of-type(2){
				height: 1.96rem;
				line-height: 1.96rem;
				font-size: 0.6rem;
				color: #545454;
			}
			p:nth-of-type(3){
				height: 1.76rem;
				line-height: 1.76rem;
				font-size: 0.6rem;
				color: #545454;
			}
			p:nth-of-type(4){
				height: 1.98rem;
				line-height: 1.98rem;
				font-size: 0.58rem;
				color: #545454;
				span:nth-of-type(1){
					margin-right: 0.26rem;
				}
			}
		}
	}
</style>
