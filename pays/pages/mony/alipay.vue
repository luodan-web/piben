<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>

		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign"></view>
			<view class="welcome">	
			</view>
			<view class="input-content">
				<view class="input-item">
					<input type="text" :value="username" placeholder="请输入用户名" data-key="username"/>
				</view>
				<view class="input-item">
					<input type="text" :value="mobile" placeholder="请输入账号" data-key="mobile"  />
				</view>
				<view class="input-item">
					<input type="number" :value="this.userinfo.userinfo.mobile" placeholder="请输入手机号码" data-key="mobile"  />
				</view>
				<view class="input-item">
					<input type="text" :value="captcha" placeholder="请输入验证码" data-key="captcha" />
					<button class="get_captcha" @click="getCaptcha">{{get_captcha}}</button>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin">
				确定添加
			</button>
			<view class="forget-section">

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {
		computed: {
			...mapState(['hasLogin', 'userinfo'])
		},
		data() {
			return {
				username: '',
				mobile: '',
				captcha: '',
				get_captcha: '获取验证码',
				
			}
		},
		methods: {
			// inputChange(e){
			// 	const key = e.currentTarget.dataset.key;
			// 	this[key] = e.detail.value;
			// },
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: "/pages/mony/xiugai"
				})
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		padding-top: 80rpx;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		position: relative;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}

		.get_captcha {
			position: absolute;
			right: 0;
			display: block;
			width: 40%;
			background: $base-color;
			color: #fff;
			text-align: center;
			line-height: 76upx;
			border-radius: 50upx;
			z-index: 100;
			font-size: 28upx;
		}
	}

	.confirm-btn {
		width: 630upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $base-color;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+10upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 100upx;

		label {
			margin: 10upx 60upx;
		}
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
