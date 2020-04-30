<template>
	<div class="paymentMethodOnLine">
		<Header title="在线支付">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
		</Header>
		<div class="remainingTime">
			<p>支付剩余时间</p>
			<p>
				<span>00:{{str}}</span>
			</p>
		</div>
		<div class="content">
			<div class="title">选择支付方式</div>
			<ul class="itemList">
				<li>
					<img src="../assets/images/zfb.png">
					<span>支付宝</span>
					<span class="el-icon-check active"></span>
				</li>
				<li>
					<img src="../assets/images/wx.png">
					<span>微信</span>
					<span class="el-icon-check"></span>
				</li>
			</ul>
			<div class="btn">
				<button @click="btnSuer">确认支付</button>
			</div>
		</div>
		<interfaceNotOpen v-if="onoff" @parentFn="parentFn"></interfaceNotOpen>
	</div>
</template>

<script>
	import {Header} from 'mint-ui';
	import interfaceNotOpen from '../components/Interface-not-open'
	export default{
		name:'paymentMethod',
		components:{
			Header,
			interfaceNotOpen
		},
		data(){
			return{
				str:'',
				onoff:false
			}
		},
		methods:{
			back(){
				this.$router.back();
			},
			btnSuer(){
				this.onoff=true;
			},
			parentFn(){
				this.onoff=false;
				this.$router.push('/order')
			}
		},
		created(){
			let date=new Date();
			date.setMinutes(date.getMinutes()+15);
			let dis1=date.getTime();
			let date1=new Date();
			let dis2=date1.getTime();
			let dis=parseInt((dis1-dis2)/1000);
			
			let min=parseInt(dis/60);
			let s=dis%60;
			this.str=''+toTime(min)+':'+toTime(s);
			setInterval(()=>{
				let date1=new Date();
				let dis2=date1.getTime();
				let dis=parseInt((dis1-dis2)/1000);
				
				let min=parseInt(dis/60);
				let s=dis%60;
				this.str=''+toTime(min)+':'+toTime(s);
			},1000)
			
			function toTime(n){
				return n>9?n:'0'+n;
			}
		}
	}
</script>

<style lang="less">
	.paymentMethodOnLine{
		background: #f5f5f5;
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
		
			.is-left span {
				font-size: 0.78rem;
			}
		
		
		}
		.remainingTime{
			height: 5.96rem;
			width: 100%;
			background: #fff;
			
			p{
				text-align: center;
			}
			p:nth-of-type(1){
				line-height:0.56rem;
				padding: 1.72rem 0 0.68rem 0;
				font-size: 0.56rem;
				color: #525252;
			}
			p:nth-of-type(2){
				color:#525252;
				line-height: 1.14rem;
				font-size:1.14rem;
				letter-spacing:0.2rem;
			}
		}
		.content{
			.title{
				height:1.62rem ;
				line-height: 1.62rem;
				padding-left: 0.72rem;
				font-size: 0.62rem;
				color: #525252;
			}
			.itemList{
				background: #fff;
				border: none;
				li{
					height: 3.22rem;
					line-height: 3.22rem;
					padding: 0 0.64rem 0 0.68rem;
					img{
						
						width: 1.84rem;
						height: 1.84rem;
						vertical-align: middle;
					}
					span:nth-of-type(1){
						font-size: 0.62rem;
						color: #525252;
					}
					span:nth-of-type(2){
						float: right;
						margin-top: 1.16rem;
						width: 0.94rem;
						height: 0.94rem;
						color: #fff;
						background: #cccccc;
						line-height: 0.94rem;
						text-align: center;
						border-radius: 100%;
					}
					span:nth-of-type(2).active{
						background: #4bd963;
					}
				}
			}
			.btn{
				height:2.66rem;
				padding: 0.48rem 0.64rem;
				button{
					width: 100%;
					height:1.7rem;
					background: #4cda64;
					color: #fff;
					font-size:0.68rem;
					border-radius: 0.1rem;
				}
			}
		}
	}
</style>
