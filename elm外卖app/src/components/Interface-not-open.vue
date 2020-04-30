<template>
	<div class="interfaceNotOpen">
		<div class="content">
			<div class="tips">
				<p>
					<span class="el-icon-warning-outline"></span>
				</p>
				<p>暂不开方支付接口</p>
			</div>
			<div class="tipsBtn">
				<button @touchstart="btn">确认</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'interfaceNotOpen',
		methods:{
			btn(){
				this.$emit('parentFn')
			}
		}
	}
</script>

<style lang="less">
	.interfaceNotOpen{
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		height: 100%;
		width: 100%;
		z-index: 20;
		.content{
			width: 10.9rem;
			height: 7.48rem;
			position: absolute;
			top: 50%;
			left: 50%;
			margin: -3.74rem 0 0 -5.45rem;
			background: #fff;
			.tips{
				height: 5.82rem;
				width: 100%;
				padding-top: 0.86rem;
				box-sizing: border-box;
				p:nth-of-type(1){
					height: 2.7rem;
					text-align: center;
					span{
						font-size:2.7rem;
						color: #f7c77d;
					}
				}
				p:nth-of-type(2){
					height:2.28rem;
					line-height: 2.28rem;
					text-align: center;
				}
			}
			.tipsBtn{
				height:1.68rem;
				width: 100%;
				button{
					width: 100%;
					height: 100%;
					background: #4cd964;
					color: #fff;
					font-size: 0.74rem;
				}
			}
		}
	}
</style>
