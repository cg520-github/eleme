<template>
	<div class="bottom-nav">
		<ul>
			<router-link to="/take-out-food" tag="li">
				<i></i>
				<span>外卖</span>
			</router-link>
			<router-link to="/search" tag="li">
				<i></i>
				<span>搜索</span>
			</router-link>
			<router-link to="/order" tag="li">
				<i></i>
				<span>订单</span>
			</router-link>
			<router-link to="/personal-center" tag="li">
				<i></i>
				<span>我的</span>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'BottomNav'
	}
</script>

<style lang="less">
	.bottom-nav{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1.82rem;
		border: 1px solid #ebebeb;
		background: #fff;
		z-index: 99999999;
		ul{
			width: 100%;
			height: 100%;
			display: flex;
			display: -webkit-flex;
			li{
				width: 0;
				flex: 1;
				height: 100%;
				text-align: center;
				line-height: 2.76rem;
				position: relative;
				i{
					position: absolute;
					width: 0.7rem;
					height: 0.72rem;
					top: 0.3rem;
					left:50%;
					margin-left: -0.35rem;
					background-size: 100% 100%;
				}
				
			}
			li:nth-of-type(1) i{
				background-image: url(../assets/images/nav1.png);
			}
			li:nth-of-type(2) i{
				background-image: url(../assets/images/nav2.png);
			}
			li:nth-of-type(3) i{
				background-image: url(../assets/images/nav3.png);
			}
			li:nth-of-type(4) i{
				background-image: url(../assets/images/nav4.png);
			}
			
			
			li:nth-of-type(1).router-link-active i{
				background-image: url(../assets/images/nav1_actived.png);
			}
			li:nth-of-type(2).router-link-active i{
				background-image: url(../assets/images/nav2_actived.png);
			}
			li:nth-of-type(3).router-link-active i{
				background-image: url(../assets/images/nav3_actived.png);
			}
			li:nth-of-type(4).router-link-active i{
				background-image: url(../assets/images/nav4_actived.png);
			}
		}
		
	}
</style>
