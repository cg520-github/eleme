<template>
	<div class="receivingAddress">
		<Header fixed title="添加地址">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
		</Header>
		<div class="address1">
			<p>
				<label for="">
					<span>联系人</span>
					<input type="text" placeholder="你的名字" v-model.trim="addInfo.name">
				</label>
			</p>
			<p>
				<label for="">
					<span></span>
					<b>
						<i class="el-icon-check"  :class="addInfo.sex==1?'active':''" @touchstart="suerSel(1)"></i>先生
						<i class="el-icon-check" :class="addInfo.sex==2?'active':''" @touchstart="suerSel(2)"></i>女士
					</b>
				</label>
			</p>
			<p>
				<label for="">
					<span>联系电话</span>
					<input type="text"  placeholder="你的手机" v-model.trim="addInfo.phone">
				</label>
			</p>
			<p>
				<label for="">
					<span>送餐地址</span>
					<input type="text"  placeholder="小区/写字楼/学校等" v-model.trim="addInfo.address">
				</label>
			</p>
			<p>
				<label for="">
					<span></span>
					<input type="text" placeholder="详细地址(如门牌号)" v-model.trim="addInfo.address_detail">
				</label>
			</p>
			<p>
				<label for="">
					<span>标签</span>
					<input type="text" placeholder="无/家/学校/公司" v-model.trim="addInfo.tag">
				</label>
			</p>
			
		</div>
		<div class="btn">
			<button @touchstart="btnSubmit">确定</button>
		</div>
	</div>
</template>

<script>
	import {Header} from 'mint-ui';
	import request from '../api/request'
	export default{
		name:'addReceivingAddress',
		components:{
			Header
		},
		data(){
			return {
				
				addInfo:{
					address:'',
					address_detail:'',
					name:'',
					phone:null,
					tag:'',
					sex:1
				}
			}
		},
		methods:{
			back(){
				this.$router.back();
			},
			suerSel(index){
				this.addInfo.sex=index;
			},
			btnSubmit(){
				let id=this.$store.state.userInfo.id;
				if(this.addInfo.address&&this.addInfo.address_detail&&this.addInfo.name&&this.addInfo.phone&&this.addInfo.tag&&this.addInfo.sex){
					//ajax请求
					request.getReceivingAddress({
						...this.addInfo,
						id:id
					}).then((res)=>{
						console.log(res)
						if(res.status){
							this.$router.back();
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.receivingAddress{
		width: 100%;
		height: 100vh;
		background: #F5F5F5;
		padding-top: 2.42rem;
		box-sizing: border-box;
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
		.address1{
			padding-left: 0.7rem;
			background: #fff;
			padding-right: 0.72rem;
			span{
				float: left;
				width: 3.84rem;
				height: 100%;
				font-size: 0.64rem;
				color: #303030;
			}
			input{
				font-size: 0.64rem;
				color: #525252;
			}
			p:nth-of-type(1){
				height: 1.76rem;
				border-bottom: 1px solid #f3f3f3;
				span:nth-of-type(1){
					line-height: 1.76rem;
				}
				input{
					float: left;
					width: 8rem;
					height: 100%;
				}
			}
			p:nth-of-type(2){
				height: 2.44rem;
				border-bottom: 1px solid #f3f3f3;
				b{
					float: left;
					height: 100%;
					line-height: 2.44rem;
					font-size: 0.64rem;
					color: #525252;
					font-weight: normal;
					i{
						margin-right: 0.36rem;
						background: #cccccc;
						border-radius: 100%;
						color: #fff;
						border: 0.02rem solid #ccc;
					}
					i:nth-of-type(1){
						
					}
					i:nth-of-type(2){
						margin-left: 0.56rem;
					}
					.active{
						background: #4bd963;
					}
				}
			}
			p:nth-of-type(3){
				height: 2.36rem;
				border-bottom: 1px solid #f3f3f3;
				span{
					line-height: 2.36rem;
				}
				input{
					float: left;
					width: 8rem;
					height: 100%;
				}
			}
			p:nth-of-type(4){
				height: 2.36rem;
				border-bottom: 1px solid #f3f3f3;
				span{
					line-height: 2.36rem;
				}
				input{
					float: left;
					width: 8rem;
					height: 100%;
				}
			}
			p:nth-of-type(5){
				height: 2.4rem;
				border-bottom: 1px solid #f3f3f3;
				input{
					float: left;
					width: 8rem;
					height: 100%;
				}
			}
			p:nth-of-type(6){
				height: 2.44rem;
				border-bottom: 1px solid #f3f3f3;
				span{
					line-height: 2.44rem;
				}
				input{
					float: left;
					width: 8rem;
					height: 100%;
				}
			}
		}
		.btn{
			padding: 0.58rem 0.68rem;
			box-sizing: border-box;
			button{
				width: 100%;
				height: 1.68rem;
				background: #4CDA64;
				color: #fff;
				font-size: 0.66rem;
				border-radius: 0.1rem;
			}
		}
	}
</style>
