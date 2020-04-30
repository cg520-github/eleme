<template>
	<div class="login">
		<Header fixed title="密码登录">
			<span slot="left" class="el-icon-arrow-left" @click="back"></span>
		</Header>
		<div class="form">
			<p>
				账号<input type="text" v-model.trim="info.name">
			</p>
			<p>
				密码<input type="password" v-model.trim="info.pass">
				<el-switch v-model="value" active-color="#13ce66" inactive-color="#cccccc"></el-switch>
			</p>
			<p>
				验证码<input type="text" v-model.trim="info.code">
				<span></span>
				<span>
					<i>看不清</i>
					<a>换一张</a>
				</span>
			</p>
		</div>
		<button type="button" @click="loginSure">登录</button>
		<p>
			<a>重置密码？</a>
		</p>
	</div>
</template>

<script>
	import {
		Header
	} from 'mint-ui'
	import request from '../api/request'
	import storge from '../api/tool'
	export default {
		name: 'Login',
		components: {
			Header
		},
		data() {
			return {
				value: false,
				info: {
					name: '',
					pass: '',
					code: ''
				}
			}
		},
		methods: {
			back() {
				this.$router.back();
			},
			loginSure() {
				if (this.info.name && this.info.pass && this.info.code) {
					request.getLoginUser({
						username: this.info.name,
						password: this.info.pass,
						captcha_code: this.info.code
					}).then((res) => {
						this.$store.commit('changeUserInfo', res)
						//把个人信息存储在本地：sessionStore存储
						storge.setPerInfo(res);
						this.$router.back();
					})
				} else {
					this.$message({
						duration: 1000,
						center: true,
						message: '亲，填写信息有误',
						type: 'warning',
						showClose: true
					});
				}
			}
		}
	}
</script>

<style lang="less">
	.el-message {
		top: 10vh !important;
		min-width: 100vw !important;
		min-height: 0.2rem;
	}

	body {
		background: #f5f5f5;
	}

	.login {
		float: left;
		padding-top: 1.76rem;

		.mint-header {
			background: #3191e8;
			height: 1.76rem;

			.mint-button-text i {
				font-size: 0.8rem;
			}

			.mint-header-title {
				font-size: 0.72rem;
				color: #fff;
				font-weight: 500;
			}
		}

		.form {
			float: left;
			width: 100%;
			margin-top: 0.6rem;

			p {
				padding-left: 0.72rem !important;
				float: left;
				height: 1.94rem;
				width: 100%;
				border-bottom: 1px solid #f5f5f5;
				background: #ffffff;
				color: #525252;

				>input {
					padding-left: 0.2rem !important;
					width: 12.9rem;
					border: none;
					color: #2e2e2e;
					font-size: 0.7rem;
					height: 1.94rem;
					line-height: 1.94rem;
					;
				}
			}

			p:nth-of-type(2)>input {
				width: 10.08rem;
			}

			p:nth-of-type(3) {
				>input {
					width: 6.28rem;
				}

				>span:nth-of-type(1) {
					display: inline-block;
					width: 3.16rem;
					height: 1.94rem;
					vertical-align: top;
					text-align: center;
					line-height: 1.94rem;
					font-size: 0.96rem;
				}

				>span:nth-of-type(2) {
					display: inline-block;
					width: 2.4rem;
					height: 1.94rem;
					vertical-align: top;
					text-align: center;
					font-size: 0.44rem;

					>i {
						float: left;
						font-style: normal;
						width: 100%;
						height: 1.08rem;
						line-height: 1.08rem;
						color: #525252;
					}

					>a {
						float: left;
						width: 100%;
						line-height: 0.42rem;
						color: #0d7ce4;
					}
				}
			}
		}

		>button {
			height: 1.8rem;
			width: 14.08rem;
			background: #4cda64;
			color: #ffffff;
			margin-top: 2.44rem;
			margin-left: 0.48rem;
		}

		>p {
			height: 1rem;
			line-height: 1rem;
			text-align: right;
			margin-top: 0.8rem !important;

			>a {
				color: #438ee6;
				font-size: 0.5rem;
			}
		}
	}
</style>
