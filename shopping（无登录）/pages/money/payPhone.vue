<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{mz}}</text>
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(3)" v-if="payTypeList.offline">
				<text class="icon yticon icon-pay"></text>
				<view class="con">
					<text class="tit">余额支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view>
		</view>
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
	// #ifdef H5
	var jweixin = require('jweixin-module');
	// #endif
	export default {
		data() {
			return {
				payType: 3,
				payTypeList: {
					wxpay: false,
					alipay: false
				},
				mz: 0.00,
				pay: false,
				orderLocal: ''
			};
		},
		onLoad(options) {
			// this.total = options.total;
			this.orderLocal = options.orderLocal;
			this.mz=options.need;
			console.log(this.mz);
			this.getPayType();
		},
		methods: {
			// 获取支付方式
			async getPayType() {
				let type = await this.$api.request('/pay/getPayType');
				if (type) {
					this.payTypeList = type;
				}
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
				switch (type) {
					case 3: // 余额支付
						break;
				}
			},
			//确认支付
			async confirm() {
				console.log(this.pay);
				if (this.pay == false) {
					this.pay = true;
				} else {
					return;
				}
				console.log(this.pay);
				let data = await this.$api.request('/pay/mobileOffline', 'GET', {
					orderLocal: this.orderLocal,
				});
				this.pay = false;
				if (data) {
					uni.redirectTo({
						url: '/pages/money/paySuccess'
					});
				}
				// 清掉缓存
				uni.removeStorage({
					key: 'mz',
					success() {
						console.log(mz) //removeStorage:ok
					}
				})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-pay {
			color: #fe8e2e;
		}

		.icon-wxpay {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
