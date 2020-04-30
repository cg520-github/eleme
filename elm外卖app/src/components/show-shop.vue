<template>
	<div>
		<div class="item" v-for="item in dataList" @touchstart="infoShop(item.id)">
			<div class="left">
				<img :src="item.image_path" alt="">
			</div>
			<div class="right">
				<div class="top">
					<h3>{{item.name}}</h3>
					<p>月销售{{item.recent_order_num}}</p>
					<p>{{item.float_minimum_order_amount}}元起送/距离{{item.distance}}</p>
				</div>
				<div class="bottom">
					<p><span></span>满减优惠<i>手机客户端专享</i></p>
					<p><span></span>新用户立减<i>手机客户端专享</i></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'showShop',
		props: {
			dataList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		methods: {
			infoShop(id) {
				this.$router.push('/shops/' + id)
			}
		}
	}
</script>

<style lang="less">
	.item {
		height: 5.44rem;
		display: flex;
		display: -webkit-flex;
		padding: 0.52rem 0.4rem 0 0.48rem;
		box-sizing: border-box;
		border-bottom: 1px solid #e7e7e7;

		.left {
			width: 2.28rem;
			height: 100%;

			img {
				width: 1.62rem;
				height: 1.58rem;
				float: left;
			}
		}

		.right {
			height: 100%;
			width: 12.3rem;

			.top {
				width: 12.3rem;
				padding-bottom: 0.34rem;
				border-bottom: 1px solid #e7e7e7;

				h3 {
					height: 0.76rem;
					line-height: 0.76rem;
					font-size: 0.52rem;
					color: #000;
				}

				p:nth-of-type(1) {
					line-height: 0.88rem;
					height: 0.88rem;
					color: #000;
				}

				p:nth-of-type(2) {
					line-height: 0.74rem;
					height: 0.74rem;
					color: #000;
				}
			}

			.bottom {
				padding-top: 0.16rem;

				p {
					height: 0.72rem;
					line-height: 0.72rem;
					color: #000;
					text-indent: 0.76rem;

					i {
						font-style: normal;
						color: #fe7329;
						padding-left: 0.2rem;
					}
				}
			}
		}
	}
</style>
