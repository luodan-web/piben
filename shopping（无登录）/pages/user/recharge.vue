<template>
	<view>
		<view class="recharge-box">
			<text class="recharge-title">充值金额</text>
			<view class="recharge-money">
				<text>￥</text>
				<input class="recharge-input" type="text" value="" v-model="money" />
			</view>
		</view>
		<!-- #ifdef H5 -->
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType('wechat')">
				<text class="icon yticon icon-wxpay"></text>
				<view class="con">
					<text class="tit">微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == "wechat"' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType('alipay')">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == "alipay"' />
					</radio>
				</label>
			</view>
		</view>
		<button class="recharge-btn" @click="rechargeH5()">充值</button>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<button class="recharge-btn" @click="recharge()">充值</button>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef H5
	var jweixin = require('jweixin-module');
	// #endif
	export default {
		data() {
			return {
				money: '',
				payType: ''
			}
		},
		onLoad() {
			//#ifdef MP
			this.code();
			// #endif
		},
		methods: {		
			// #ifdef MP
			// 微信需要传递的code,而H5需要跳过
			async code() {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let codeed = loginRes.code;
						uni.setStorage({
							key: 'codeed',
							data: codeed
						});
					}
				})
				let codeed = uni.getStorageSync('codeed');
				console.log(codeed)
				this.openid = await this.$api.request('/user/authSession', 'POST', {
					code: codeed
				});
				// 清掉缓存
				uni.removeStorage({
					key: 'codeed',
				})
			},
			// 微信的微信支付
			async recharge() {
				this.payed = await this.$api.request('/recharge/submit', 'POST', {
					money: this.money,
					paytype: 'wechat',
				})
				console.log(this.payed);
				
				if (this.payed) {
					uni.requestPayment({
						provider: 'wxpay',
						appid: this.payed.appId,
						nonceStr: this.payed.nonceStr,
						package: this.payed.package,
						signType: this.payed.signType,
						paySign: this.payed.paySign,
						timeStamp: this.payed.timeStamp,
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					})
				}
				
			},
			// #endif
			// H5的微信支付
			// #ifdef H5
			//选择支付方式
			changePayType(type) {
				if (this.payType != type)
					this.payType = type;
				uni.setStorage({
					key: 'payType',
					data: this.payType
				});
			},
			async rechargeH5() {
				// let payType=uni.getStorageSync('payType');
				// console.log(payType)
				// this.payed = await this.$api.request('/recharge/submit', 'POST', {
				// 	money: this.money,
				// 	paytype:payType,
				// })
				// console.log(this.payed);
				// #ifdef APP-PLUS
				// app 使用h5支付
				var wv; //计划创建的webview 
				wv = plus.webview.create("", "custom-webview", {
					'uni-app': 'none', //不加载uni-app渲染层框架，避免样式冲突
				})
				wv.loadURL(data.mweb_url, {
					Referer: data.referer
				});
				
				setTimeout(function() {
					uni.showModal({
						title: '提示',
						content: '是否已支付?',
						cancelText: '否',
						confirmText: '是',
						success: function(res) {
							console.log(res)
						},
						fail: function(res) {
							console.log(res)
						}
					});
				}, 3000);
				// #endif
			},
			// #endif
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.recharge-box {
		width: 90%;
		margin: 30upx auto;
		background: #FFFFFF;
		border-radius: 10upx;

		.recharge-title {
			display: block;
			padding: 20upx 24upx;
			font-size: $font-lg;
			color: $font-color-dark;
		}

		.recharge-money {
			display: flex;
			padding: 10upx 24upx;

			text {
				padding-top: 2%;
				font-size: 50upx;
			}

			input {
				font-size: 70upx;
				height: 20%;
			}
		}

	}

	.recharge-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		height: 80upx;
		font-size: 32upx;
		color: #FFFFFF;
		background-color: #fa436a;
		border-radius: 10upx;
	}


	.pay-type-list {
		width: 90%;
		background-color: #fff;
		margin: 30upx auto;
		padding-left: 20upx;
		border-radius: 10upx;

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
</style>
