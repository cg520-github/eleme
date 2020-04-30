<template>
	<div class="position-search">
		<Header fixed :title="add.name">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
			<span slot="right">切换城市</span>
		</Header>
		<div class="search">
			<div class="tijiao">
				<input type="text" placeholder="输入学校,商务楼,地址" v-model.trim="text">
				<button @click="submit">提交</button>
			</div>
			<div class="history" v-if="onoff">
				<h3 v-if="historyData.length">历史搜索</h3>
				<ul v-if="historyData.length">
					<li v-for="item in historyData"  @click="btnBack2(item)">
						<h4>{{item.name}}</h4>
						<p>
							{{item.address}}
						</p>
					</li>
				</ul>
				<button v-if="historyData.length" @click="crear">清空所有</button>
			</div>
			<div class="searchData" v-else>
				<ul>
					<li v-for="item in searchData" @click="btnBack(item)">
						<h4>{{item.name}}</h4>
						<p>
							{{item.address}}
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Header
	} from 'mint-ui'
	
	import storge from '../api/tool'
	
	import request from '../api/request'
	export default{
		name:'positionSearch',
		data(){
			return{
				add:{},
				onoff:true,
				historyData:[],
				searchData:[],
				text:''
			}
		},
		components:{
			Header
		},
		created(){
			//拿到地址的数据
			this.add=this.$store.state.locationInfo;
			
			this.historyData=storge.getPosition();
		},
		methods:{
			back(){
				this.$router.back()
			},
			submit(){
				if(this.text){
					request.getSearchPosition({
						city_id:this.add.id,
						keyword:this.text
					}).then((res)=>{
						console.log(res)
						this.onoff=false;
						this.searchData=res;
					})
				}
			},
			btnBack(item){
				this.historyData.push(item)
				storge.setPosition(this.historyData);
				this.$store.commit('changeLocationInfo2',item)
				this.$router.push('/take-out-food')
			},
			btnBack2(item){
				storge.setPosition(this.historyData);
				this.$store.commit('changeLocationInfo2',item)
				this.$router.push('/take-out-food')
			},
			crear(){
				storge.clearPosition();
				this.historyData=[]
			}
		}
	}
</script>

<style lang="less">
	.position-search{
		padding-top: 2.2rem;
		background: #f5f5f5;
		min-height: 100vh;
		.mint-header-title{
			color: #fff;
			font-size: 0.82rem;
			font-weight: bold;
		}
		.search{
			
			background: #fff;
			.tijiao{
				box-sizing: border-box;
				padding: 0 0.76rem 0 0.78rem;
				input{
					height: 1.3rem;
					width: 100%;
					border: 1px solid #f1f1f1;
					box-sizing: border-box;
					border-radius: 0.1rem;
					font-size: 0.6rem;
					color: #696969;
					padding-left: 0.22rem;
					margin-bottom: 0.5rem;
				}
				button{
					width: 100%;
					height: 1.32rem;
					color: #fff;
					background: #3191e8;
					border-radius: 0.1rem;
					font-size: 0.6rem;
					margin-bottom: 0.38rem;
				}
			}
			.history{
				background: #fff;
				h3{
					height:0.66rem;
					line-height: 0.66rem;
					font-size: 0.58rem;
					color: #2E2E2E;
					padding-left: 0.46rem;
					background: #F5F5F5;
				}
				ul{
					li{
						padding-top: 0.42rem;
						padding-bottom: 0.42rem;
						border-bottom: 1px solid #F9F9F9;
						h4{
							height: 1.34rem;
							line-height: 1.34rem;
							padding-left: 0.74rem;
							font-size: 0.58rem;
							color: #222222;
							font-weight: bold;
						}
						p{
							height: 0.62rem;
							line-height: 0.62rem;
							padding-left: 0.78rem;
							font-size: 0.38rem;
							color: #8f8f8f;
						}
					}
				}
				button{
					height: 1.9rem;
					width: 100%;
					background: #fff;
					font-size: 0.58rem;
					color: #5A5A5A;
				}
			}
			.searchData{
				background: #fff;
				ul{
					li{
						padding-top: 0.42rem;
						padding-bottom: 0.42rem;
						border-bottom: 1px solid #F9F9F9;
						h4{
							height: 1.34rem;
							line-height: 1.34rem;
							padding-left: 0.74rem;
							font-size: 0.58rem;
							color: #222222;
							font-weight: bold;
						}
						p{
							height: 0.62rem;
							line-height: 0.62rem;
							padding-left: 0.78rem;
							font-size: 0.38rem;
							color: #8f8f8f;
						}
					}
				}
			}
		}
	}
</style>
