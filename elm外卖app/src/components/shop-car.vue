<template>
	<div class="shopCar">
		<div class="borer" @click="clearCarzz"></div>
		<div class="content">
			<div class="title">
				购物车
				<span  @click="clearCar"><i class="el-icon-delete"></i>清空</span>
			</div>
			<ul class="shopList">
				<li v-for="item in fnList">
					<div class="left">
						<span>{{item.name}}</span>
						<img>
					</div>
					<div class="right">
						<span class="price">￥{{item.price}}</span>
						<span class="add-shopping" @click="addNum(item.id)">+</span>
						<span class="shopping-num">{{item.num}}</span>
						<span class="del-shopping" @click="removeNum(item.id)">-</span>
					</div>
				</li>

			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:'shop-car',
		props:{
			carDatas:{
				type:Array,
				default:[]
			}
			
		},
		data(){
			return{
				listArr:[]
			}
		},
		methods:{
			clearCar(ev){
				ev.stopPropagation();
				this.$emit('parentClear');
			},
			clearCarzz(ev){
				ev.stopPropagation();
				this.$emit('hiddenCarData');
			},
			addNum(id){
				this.$emit('changeAddCarNum',id);
			},
			removeNum(id){
				this.$emit('changeRemoveCarNum',id);
			}
		},
		computed:{
			fnList(){
				let arr=[];
				this.carDatas.forEach((item)=>{
					item.foods.forEach((sonItem)=>{
						if(sonItem.onoff){
							arr.push({
								id:sonItem.id,
								num:sonItem.num,
								price:sonItem.price,
								name:sonItem.name
							})
						}
					})
				})
				
				return arr;
			}
		}
	}
</script>

<style lang="less">
	.shopCar{
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		height: 100%;
		width: 100%;
		.borer{
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
		}
		.content{
			position: absolute;
			bottom:1.9rem;
			left: 0;
			width: 100%;
			.title{
				height: 1.82rem;
				line-height: 1.82rem;
				background: #ebeff2;
				padding: 0 0.54rem;
				font-size: 0.66rem;
				color: #4f4d4d;
				font-weight: bold;
				span{
					float: right;
					margin-top: 0.78rem;
					line-height: 0.6rem;
					font-size: 0.6rem;
					font-weight: normal;
					i{
						color: #b7b6b6;
						margin-right: 0.36rem;
						
					}
				}
			}
			.shopList{
				background: #ffffff;
				li{
					padding: 0.68rem 0;
					overflow: hidden;
					.left{
						float: left;
						padding-left:0.46rem;
						width: 9.42rem;
						box-sizing: border-box;
						height: 0.74rem;
						line-height: 0.74rem;
						span{
							font-size: 0.62rem;
							color: #484848;
							font-weight: bold;
						}
						img{
							width: 0.74rem;
							height: 0.74rem;
							background: red;
							vertical-align: top;
						}
					}
					.right{
						float: right;
						width: 5.58rem;
						line-height:0.76rem;
						padding-right: 0.6rem;
						box-sizing: border-box;
						.price{
							float: left;
							font-size: 0.48rem;
							color: #ff6602;
							font-weight: bold;
						}
						.add-shopping {
							float: right;
							width: 0.76rem;
							height: 0.76rem;
							text-align: center;
							line-height: 0.76rem;
							background: #3190e8;
							color: #fff;
							font-size: 0.36rem;
							font-weight: bold;
							border-radius: 100%;
						}
						
						.shopping-num {
							float: right;
							padding: 0 0.44rem;
							height: 0.76rem;
							text-align: center;
							line-height: 0.76rem;
							font-size: 0.36rem;
							font-weight: bold;
						}
						
						.del-shopping {
							float: right;
							width: 0.75rem;
							height: 0.75rem;
							text-align: center;
							line-height: 0.76rem;
							background:#fff;
							color: #3190e8;
							font-size: 0.36rem;
							font-weight: bold;
							border-radius: 100%;
							border: 1px solid #3190e8;
						}
					}
				}
			}
		}
		
	}
</style>
