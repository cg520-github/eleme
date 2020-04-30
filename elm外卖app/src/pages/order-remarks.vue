<template>
	<div class="remark">
		<Header fixed title="订单备注">
			<i slot="left" class="el-icon-arrow-left" @click="back"></i>
		</Header>
		<div class="content">
			<div class="fast-remask">
				<h3>快速备注</h3>
				<div class="remask-info">
					<div>
						<div v-for="(item,index) in remarkList">
							<button v-for="(sonItem,sonIndex) in item" @click="selLa(index,sonItem)" :class="sonItem.onoff?'active':''">{{sonItem.title}}</button>
						</div>
					</div>
				</div>
			</div>
			<div class="other-remask">
				<h3>其他备注</h3>
				<div>
					<textarea placeholder="请输入备注内容（可不填）" v-model="text"></textarea>
					<button @click="suerOrderRemark">确定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Header
	} from 'mint-ui'
	import request from '../api/request.js'
	export default {
		name: 'orderRemarks',
		components: {
			Header
		},
		data() {
			return {
				remarkList: [],
				dataLa: '',
				text: '',
			}
		},
		methods: {
			back() {
				this.$router.back()
			},
			selLa(index, item) {
				let a = this.remarkList[index];
				let b = a.map((obj) => {
					if (obj == item) {
						return {
							title: obj.title,
							onoff: true
						}
					} else {
						return {
							title: obj.title,
							onoff: false
						}
					}
				})
				this.remarkList.splice(index, 1, b);
			},
			suerOrderRemark() {
				let arr = [];
				this.remarkList.forEach((item) => {
					item.forEach((sonItem) => {
						if (sonItem.onoff) {
							arr.push(sonItem.title)
						}
					})
				})
				arr.push(this.text);
				this.$store.commit('changeRemarksInformation', arr);
				this.$router.back();
			}

		},
		created() {
			request.getCartsRemarks().then((res) => {
				let arr = [];
				res.forEach((item, index) => {
					arr.push([])
					item.forEach((sonItem) => {
						arr[index].push({
							title: sonItem,
							onoff: false
						})
					})
				})
				this.remarkList = arr;
			})

		}
	}
</script>
<style lang="less">
	.remark {
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
		
			.is-right {
				span {
					font-size: 0.76rem;
				}
		
				div {
					font-size: 0.6rem;
				}
			}
		}

		width: 100vw;
		background: #f5f5f5;
		margin-top: 2.22rem;
		padding-bottom: 0px !important;

		.content {
			>div {
				margin-top: 10px;
				background: #fff;
				padding: 0 10px;

				h3 {
					height: 50px;
					line-height: 50px;
					color: #171717;
					font-size: 15px;
				}

			}

			.fast-remask {
				padding-bottom: 10px;

				.remask-info {
					overflow: hidden;

					div div {
						float: left;
						border: 0.04rem solid #98c8f3;
						border-radius: 0.24rem;
						margin: 0 0.52rem 0.46rem 0;

						// padding: 0 0.3rem;
						button {
							padding: 0.36rem 0.58rem;
							background: #ffffff;
							float: left;
							// border-radius: 0.24rem;
							border-right: 1px solid #459bea;
						}

						.active {
							background: #3191e8;
							color: #fff;
						}

						button:last-child {
							border-right: none;
							border-radius: 0.24rem;
						}

						button:first-of-type {
							border-bottom-left-radius: 0.24rem;
							border-top-left-radius: 0.24rem;
						}
					}

				}
			}

			.other-remask {
				font-size: 15px;

				textarea {
					width: 100%;
					height: 120px;
					resize: none;
					border-radius: 5px;
					padding: 15px;
					box-sizing: border-box;
					font-family: "微软雅黑";
					background: #f9f9f9;
					color: #555555;
					margin-bottom: 15px;

					&::placeholder {
						color: #555555;
					}
				}

				button {
					width: 100%;
					height: 45px;
					line-height: 45px;
					background: #4cda64;
					color: #fff;
					border-radius: 5px;
					margin-bottom: 10px;
					font-size: 16px;
					letter-spacing: 2px;
				}
			}
		}


	}
</style>
