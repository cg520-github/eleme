<template>
	<div class="invoice">
		<Header fixed title="选择发票抬头">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
		</Header>
		<div class="content">
			<div class="invoiceItem">
				<input type="text" v-model="text" disabled="disabled">
				<span class="el-icon-check" @click="suer" :class="onoff"></span>
			</div>
			<div class="btn" @click="btn">
				<button>确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {Header} from 'mint-ui';
	export default{
		name:'invoice',
		components:{
			Header
		},
		data(){
			return{
				text:'不需要开发票',
				onoff:{
					'active':false
				}
			}
		},
		methods:{
			back(){
				this.$router.back();
				
			},
			suer(ev){
				this.onoff.active=!this.onoff.active;
				
				if(this.onoff.active==true){
					ev.target.parentNode.childNodes[0].disabled=false;
					this.text='';
				}else{
					ev.target.parentNode.childNodes[0].disabled=true;
					this.text='不需要开发票';
				}
			},
			btn(){
				if(this.onoff.active==true){
					this.$store.commit('changeInvoiceRise',this.text);
				}else{
					this.$store.commit('changeInvoiceRise','不需要开发票');
				}
				this.$router.back();
			}
		}
	}
</script>

<style lang="less">
	.invoice{
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
		.content{
			padding-top: 2.28rem;
			.invoiceItem{
				height: 2.3rem;
				background: #fff;
				padding: 0 0.64rem;
				span:nth-of-type(1).active{
					background: #4cda64;
				}
				input{
					float: left;
					line-height: 2.3rem;
					background: #fff;
				}
				span:nth-of-type(1){
					float: right;
					width: 0.76rem;
					height: 0.76rem;
					line-height:0.76rem;
					text-align: center;
					background: #999999;
					color: #fff;
					font-weight: bold;
					border-radius: 100%;
					margin-top: 0.76rem;
				}
			}
			.btn{
				height: 2.74rem;
				padding: 0.52rem 0.64rem;
				box-sizing: border-box;
				button{
					width: 100%;
					height: 1.7rem;
					background: #4cda64;
					color: #fff;
					font-size:0.6rem ;
					border-radius: 0.1rem;
				}
			}
		}
	}
</style>
