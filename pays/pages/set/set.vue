<template>
	<view class="">
		<view class="phoneRowFonts">参与活动绑定手机号</view>
		<view class="phoneRowFont">{{phoned}}</view>
		<view class="phoneRowFonts">注册手机号</view>
		<view class="phoneRowFont">{{user.userinfo.mobile}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoned: ''
			}
		},
		onLoad() {
			this.phone(),
				this.user()
		},
		methods: {
			phone() {
				this.phoned = uni.getStorageSync('phoneid');
				console.log(this.phoned)
			},
			user() {
				this.user = uni.getStorageSync('userinfo');
				console.log(this.user)
			}
		}
	}
</script>

<style>
	.phoneRowFont {
		font-size: 28upx;
		color: #000;
		padding: 20upx 0;
		margin-left: 20upx;
	}

	.phoneRowFonts {
		font-size: 28upx;
		color: #000;
		margin-left: 20upx;
		font-weight: 700;
	}
</style>
