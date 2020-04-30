<template>
	<div class="address">
		<Header fixed title="选择地址">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
		</Header>
		
		<div class="selection">
			<div v-for="item in addAdressList" @click="selSuerAddress(item)">
				<span class="isGou el-icon-check" v-if="item.is_default"></span>
				<p>
					<span>{{item.name}}</span>
					<span>{{item.sex==1?'男':'女'}}</span>
					<span>{{item.phone}}</span>
				</p>
				<p>
					<i>{{item.tag}}</i>
					<i>{{item.address}}{{item.address_detail}}</i>
				</p>	
			</div>
		</div>
		<div class="addAdress" @click="addAdress">
			<span class="el-icon-plus"></span>
			新增收货地址
		</div>
	</div>
</template>

<script>
	import {Header} from 'mint-ui';
	import request from '../api/request'
	export default{
		name:'AddressSelection',
		components: {
			Header
		},
		data(){
			return{
				isChecked:false,
				addAdressList:[]
			}
		},
		methods: {
			back() {
				let obj={};
				this.addAdressList.forEach((item)=>{
					if(item.is_default){
						obj=item
					}
				})
				this.$store.commit('changeReceivingAddress',obj)
				this.$router.back();
			},
			success(){
				
			},
			addAdress(){
				this.$router.push('/add-receiving-address');
			},
			selSuerAddress(item){
				//先把选择过的清空
				let arr=this.addAdressList.map((item1)=>{
					
					if(item1==item){
						return{
							...item1,
							is_default:true
						}
					}else{
						return{
							...item1,
							is_default:false
						}
					}
				})
				this.addAdressList=arr;
				
			}
		},
		created(){
			let id=this.$store.state.userInfo.id;
			request.getUsersAddresses(id).then((res)=>{
				this.addAdressList=res;
			})
		}
	}
</script>

<style lang="less">
	.address{
		min-height: 100vh;
		background: #fff;
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
		.selection{
			padding-top: 1.72rem;
			.active{
				
			}
			div{
				position: relative;
				height: 3.24rem;
				padding-left: 1.78rem;
				padding-top: 0.68rem;
				.isGou{
					position: absolute;
					top:1.28rem;
					left: 0.64rem;
					width: 0.78rem;
					height: 0.78rem;
					background: #4bd963;
					color: #fff;
					border-radius: 100%;
					line-height: 0.78rem;
					text-align: center;
				}
				p:nth-of-type(1){
					height: 1rem;
					line-height: 0.84rem;
					span:nth-of-type(1){
						float: left;
						color: #000000;
						font-size: 0.74rem;
					}
					span:nth-of-type(2){
						float: left;
						color: #000000;
						font-size: 0.6rem;
						padding-left: 0.22rem;
					}
					span:nth-of-type(3){
						float: left;
						color: #000000;
						font-size: 0.6rem;
						padding-left: 0.22rem;
					}
				}
				p:nth-of-type(2){
					height: 0.88rem;
					line-height: 0.7rem;
					margin-bottom: 0.48rem;
					font-size: 0.44rem;
					color: #13111b;
					i:nth-of-type(1){
						color: #fff;
						background: #4bd962;
						font-size: 0.48rem;
						border-radius: 0.1rem;
						float: left;
						font-style: normal;
						padding: 0.06rem 0.14rem;
						margin-top: 0.16rem;
					}
					i:nth-of-type(2){
						color: #848484;
						font-size: 0.6rem;
						float: left;
						font-style: normal;
						margin-top: 0.18rem;
						margin-left: 0.28rem;
					}
				}
			}
		
		}
		.addAdress{
			height: 2.08rem;
			line-height: 2.08rem;
			background: #fff;
			width: 100%;
			position: relative;
			font-size: 0.68rem;
			position: fixed;
			left:0;
			bottom: 0;
			color: #268ae6;
			text-align: center;
			span{
				border: 1px solid #268ae6;
				border-radius: 100%;
				font-size: 0.5rem;
			}
		}
	}
</style>
