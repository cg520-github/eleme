<template>
	<div>
		<Header fixed>
			<div slot="right">
				<span class="el-icon-user"  v-if="userInfo.id"></span>
				<div v-else  @click="login">登录/注册</div>
			</div>
		</Header>
		<div class="posContent">
			<div class="nowPos border">
				<span>当前定位城市：</span>
				<span>定位不准时，请在列表中选择</span>
			</div>
			<div class="name border" @click="positionSearch()">
				<span>{{newPosition}}</span><span class="el-icon-arrow-right"></span>
			</div>
			<div class="city">
				<div class="hot">
					<h4 class="border">热门城市</h4>
					<ul>
						<li v-for="item in hotCity" @click="btnCity(item.name,item)">{{item.name}}</li>
					</ul>
				</div>
				<div class="sort" v-for="(item,key) in allCity">
					<h4 class="border">{{key}}<span v-if="key == 'A'">（按字母排序）</span></h4>
					<ul>
						<li v-for="itemSon in item" @click="btnCity(itemSon.name,item)">{{itemSon.name}}</li>
					</ul>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {
		Header
	} from 'mint-ui'
	import request from '../api/request'
	export default{
		name:'Positioning',
		components:{
			Header
		},
		data() {
			return {
				isLogin: false,
				newPosition:'',
				hotCity:'',
				allCity:'',
				userInfo:{}
			}
		},
		created(){
			this.newPosition=this.$store.state.locationInfo.name;
			request.getHotCity().then((res)=>{
				this.hotCity=res;
			})
			request.getAllCity().then((res)=>{
				let arr=[];
				for(let attr in res){
					arr.push(attr);
				}
				arr.sort();
				let obj={};
				arr.forEach((item)=>{
					//item=A
					//obj[A]=res[A]
					obj[item]=res[item]
				})
				this.allCity=obj;
			})
			
			//从状态管理中获取用户信息
			let user=this.$store.state.userInfo;
			this.userInfo=user;
		},
		methods:{
			btnCity(name,item){
				this.newPosition=name;
				this.$store.commit('changeLocationInfo1',item);
				
			},
			positionSearch(){
				this.$router.push('/position-search');
			},
			login(){
				this.$router.push('/login')
			}
		}
	}
</script>

<style lang="less">
	.posContent{
		padding-top: 1.82rem;
		.border{
			border-bottom: 1px solid #e7e7e7;
		}
		.nowPos{
			height: 0.9rem;
			padding-left: 0.36rem;
			padding-right: 0.22rem;
			span{
				height: 0.9rem;
				line-height: 0.9rem;
				font-size: 0.36rem;
				color: #000;
			}
			span:nth-of-type(1){
				float: left;
			}
			span:nth-of-type(2){
				float: right;
			}
		}
		.name{
			padding-left: 0.36rem;
			padding-right: 0.22rem;
			height: 1.24rem;
			span{
				color: #184083;
				font-size:0.5rem;
				line-height: 1.24rem;
			}
			span:nth-of-type(1){
				float: left;
			}
			span:nth-of-type(2){
				float: right;
			}
		}
		.city{
			.hot{
				margin-top: 0.28rem;
				border-top: 1px solid #e8e8e8;
				h4{
					height: 1.02rem;
					line-height: 1.02rem;
					padding-left: 0.82rem;
					color: #8b8c8d;
					font-size: 0.38rem;
				}
				ul{
					width: 100%;
					display: flex;
					display: -webkit-flex;
					flex-wrap: wrap;
					li{
						width: 25%;
						height: 1.24rem;
						line-height: 1.24rem;
						text-align: center;
						border-bottom: 1px solid #e8e8e8;
						border-right: 1px solid #e8e8e8;
						box-sizing: border-box;
						color: #184083;
						overflow: hidden;
					}
					li:nth-of-type(4n){
						border-right: none;
					}
				}
			}
			.sort{
				margin-top: 0.28rem;
				border-top: 1px solid #e8e8e8;
				h4{
					height: 1.04rem;
					line-height: 1.04rem;
					padding-left: 0.36rem;
					color: #545658;
					font-size: 0.36rem;
				}
				ul{
					width: 100%;
					display: flex;
					display: -webkit-flex;
					flex-wrap: wrap;
					li{
						width: 25%;
						height: 1.24rem;
						line-height: 1.24rem;
						text-align: center;
						border-bottom: 1px solid #e8e8e8;
						border-right: 1px solid #e8e8e8;
						box-sizing: border-box;
						overflow: hidden;
					}
					li:nth-of-type(4n){
						border-right: none;
					}
				}
			}
		}
	}
</style>
