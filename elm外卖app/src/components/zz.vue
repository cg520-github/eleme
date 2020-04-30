<template>
   <div class="bg">
	   <div class="guige">
	       <h2>{{foods.name}}<span style="float: right;padding-right: 0.4rem;" @touchstart="del">X</span></h2>
	       <p>
	           {{foods.specifications}}
	       </p>
	       <div class="guige_btn">
	           <button class="btn_active" v-for="item in foods.values" @touchstart="sel1(item)">默认</button>
	          <!-- <button>255ml</button>
	           <button>500ml</button> -->
	       </div>
	       <div class="add_btn">
	           <span>
	               ￥{{foods.price}}
	           </span>
	           <button @touchstart="sure">
	               加入购物车
	           </button>
	       </div>
	   </div>
   </div>
</template>
<script>
export default {
    name:"Zz",
	data(){
		return{
			specifications:0
		}
	},
	methods:{
		sure(){
			this.$emit('fn',{
				mian:this.foods,
				content:{
					price:this.foods.price,
					specifications:this.specifications,
				},
				target:this.foods.tagert
			})
		},
		del(){
			this.$emit('del')
		},
		sel1(item){
			this.specifications=item.id
		}
	},
	props:{
		foods:{
			type:Object,
			default:{}
		}
	}
}
</script>
<style lang="less">
	.bg{
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.5);
		height: 100%;
		width: 100%;
		z-index: 20;
		.guige{
		    width: 10rem;
		    height: 8rem;
		    background: #dfdbdb;
		    border-radius: 0.2rem;
		    position: fixed;
		    top: 50%;
		    left: 50%;
		    margin-left: -5rem;
		    margin-top: -5rem;
		    h2{
		        line-height: 1.9rem;
		        text-align: center;
		        font-size: 0.8rem;
		        font-weight: bold;
		    }
		    p{
		        padding-left: 1.2rem;
		        box-sizing: border-box;
		        -webkit-box-sizing: border-box;
		        font-size: 0.6rem;
		    }
		    .guige_btn{
		        line-height: 1.84rem;
		        padding-bottom: 0.7rem;
		        .btn_active{
		            color: blue;
		            border: 1px blue solid;
		        }
		        button{
		            width: 1.8rem;
		            height: 1.2rem;
		            border: 1px whitesmoke solid;
		            border-radius: 0.1rem;
		        }
		    }
		    .add_btn{
		        padding-left: 0.4rem;
		        overflow: hidden;
		        line-height: 2.2rem;
		
		        span{
		            color: tomato;
		            font-size: 0.6rem;
		            font-weight: bold;
		        }
		        button{
		            width: 3.7rem;
		            height: 1.2rem;
		            background: #00a0e9;
		            border-radius: 0.1rem;
		            float: right;
		            margin-top: 0.56rem ;
		        }
		    }
		}
	}
    

</style>