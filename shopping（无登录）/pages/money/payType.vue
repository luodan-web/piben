<template>
	<view>
		<view class="payType">
			<view class="payTypeRow" @click="navToPay('1')">
				<image class="payType-image" :src="require('../../static/chongzhi.png')" mode=""></image>
				<!-- <view class="submit-btn">慢充</view> -->
			</view>
			<!-- <view class="payTypeRow" @click="navToPay('3')">
				<image class="payType-image" :src="require('../../image/class1.jpg')" mode=""></image>
				<view>团队</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {

		},
		methods: {
			// 跳转到支付页面
			async navToPay(paytype) {
				let payType = await this.$api.request(`/product/mobile?paytype=${paytype}`);
				uni.navigateTo({
					url: `/pages/money/phone?paytype=${paytype}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.payTypeRow {
		font-size: $font-lg;
		width: 95%;
		height: 280upx;
		margin: 20upx auto;
		background-color: #fff;
		border-radius: 25upx;
		.payType-image {
			width: 100%;
			height: 280upx;
			border-radius: 25upx;
		}
	}

	.submit-btn {
		margin: 0 auto;
		width: 80%;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		font-size: 32upx;
		color: #FFFFFF;
		background-color: #fa436a;
		border-radius: 50upx;
		margin-top: 100upx;
	}
</style>
