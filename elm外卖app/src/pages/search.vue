<template>
	<div class="search">
		<Header fixed title="搜索"></Header>
		<div class="content">
			<div class="searchInput">
				<input type="text" v-model.trim="searchContent">
				<button @click="btnSuer">提交</button>
			</div>
			<div class="historical" v-if="onoff">
					<h3 v-if="searched.length">搜索历史</h3>
					<ul v-if="searched.length">
						<li v-for="item in searched" @click="btn(item)">{{item}}</li>
					</ul>
					<button @click="btnClear" v-if="searched.length">清空搜索历史</button>
			</div>
			<div class="show-search" v-else>
				<h3>商家</h3>
				<div>
					<showShop :dataList="reulst"></showShop>
				</div>
			</div>
		</div>
		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import BottomNav from '../components/bottom-nav'
	import {
		Header
	} from 'mint-ui'
	import storge from '../api/tool.js'
	import request from '../api/request'
	import showShop from '../components/show-shop'
	export default{
		name:'Search',
		components:{
			BottomNav,
			Header,
			showShop
		},
		data(){
			return{
				onoff:true,
				searched:[],
				searchContent:'',
				reulst:[]
			}
		},
		created(){
			//从本地获取用户查找记录，并显示出来
			this.searched=storge.get('searched');
		},
		methods:{
			btnSuer(){
				if(this.searchContent){
					this.onoff=false;
					//把输入的内容存储在本地
					this.searched.push(this.searchContent)
					storge.set('searched',this.searched)
					
					request.restaurants({
						keywords:this.searchContent
					}).then((res)=>{
						console.log(res)
						this.reulst=res;
						this.searchContent='';
						console.log(this.reulst)
					})
				}
				
			},
			btnClear(){
				//清空本地存储曾经搜索的内容
				storge.clear('searched');
				this.searched=[];
			},
			btn(item){
				
				request.restaurants({
					keywords:item
				}).then((res)=>{
					this.reulst=res;
					this.searchContent='';
					this.onoff=false;
				})
			}
		}
	}
</script>

<style lang="less">
	.search{
		min-height: 100vh;
		.mint-header{
			height: 1.86rem;
			line-height: 1.86rem;
			.mint-header-title{
				color: #fff;
				font-size: 0.8rem;
				font-weight: blod;
			}
			
		}
		.content{
			padding-top: 1.86rem;
			.searchInput{
				padding: 0.4rem 0.52rem;
				height:1.44rem ;
				background: #fff;
				input{
					width: 10.78rem;
					float: left;
					height: 1.4rem;
					border: 1px solid #ebebeb;
					border-radius: 0.1rem;
					margin-right: 0.2rem;
					background: #F5F5F5;
				}
				button{
					float: left;
					width: 2.8rem;
					height: 100%;
					background: #3191e8;
					color: #fff;
					font-size: 0.64rem;
					border-radius: 0.1rem;
				}
			}
			.historical{
				
				h3{
					padding: 0 0.52rem;
					height: 1.4rem;
					line-height: 1.4rem;
					color: #747474;
					font-size:0.62rem;
				}
				ul{
					background: #fff;
					li{
						height: 1.84rem;
						border-bottom:1px solid #ececec;
						line-height: 1.84rem;
						color: #000;
						font-size: 0.6rem;
						padding: 0 0.52rem;
					}
				}
				button{
					width: 100%;
					background: #fff;
					height: 1.82rem;
					color: #2c8ce5;
					font-size: 0.66rem;
					font-weight: bold;
					text-align: center;
				}
			}
			.show-search{
				&>h3{
					padding: 0 0.52rem;
					height: 1.82rem;
					line-height: 1.82rem;
					color: #747474;
					font-size:0.62rem;
				}
				
			}
		}
	}
</style>
