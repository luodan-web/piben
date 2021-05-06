<template>
	<view class="">
		<view class="link">
			<view class="zhanwei">

			</view>
			<view class="img">
				<view class="zhanwei2">
					
				</view>
				<view class="qrimg">
					<tki-qrcode ref="qrcode" :val="val" :size="size" :background="background" :foreground="foreground" :pdground="pdground"
					 :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" @result="qrR" />
				</view>
			</view>
			<view class="linkBox2">
				<view class="copy links" @click="shareWeChat">
					复制链接
				</view>
				<view class="share copy" @click="share">
					请长按二维码保存
				</view>
			</view>


		</view>


	</view>

</template>

<script>
	import copy from '@/components/copy.js'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {
			copy,
			tkiQrcode
		},
		data() {
			return {
				val: 'http://ltkqian.chaojiniu.top',
				size: 200,
				background: '#ffffff',
				foreground: '#000000',
				pdground: '#000000',
				// icon: '/static/missing-face.png',
				iconsize: 45,
				lv: 3,
				onval: true,
				loadMake: true,
				src: '',
			}
		},
		onLoad() {

		},
		methods: {
			qrR() {
				console.log(1)
			},
			shareWeChat() {
				let user = uni.getStorageSync('userinfo');
				console.log(user.userinfo.id)
				let shareText = '【' + `http://ltkqian.chaojiniu.top/#/pages/public/register?useid=${user.userinfo.id}` + '】' +
					'##长按复制此条消息，打开花呗分期权益卡注册即可跳转##'
				uni.setClipboardData({
					data: shareText,
					success: function() {
						uni.showToast({
							title: "复制成功",
							icon: "none",
							position: 'center'
						})
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.link {
		width: 100%;
		height: 100%;
		background-image: url(../../static/circle.png);
		position: fixed;
		bottom: var(--window-bottom);
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: 50% 100%;

		.zhanwei {
			width: 120%;
			height: 100upx;
			background-color: #FFFFFF;
		}

		.img {
			margin-top: 50upx;
			width: 75%;
			height: 80%;
			margin: 0 auto;
			background: url(../../static/yaoqing.png) no-repeat;
			background-size: 100% 100%;
			.zhanwei2{
				width: 100%;
				height: 600upx;
			}
			.qrimg {
				padding-top: 30%;
				padding-left: 35%;
			}
		}

		

		.linkBox2 {
			width: 100%;
			position: relative;
			display: flex;
			justify-content: space-around;
			font-size: 24upx;
			margin-top: 60upx;

			.copy {
				width: 30%;
				background-color: #FFFFFF;
				text-align: center;
				padding: 10upx 0;
				border-radius: 25upx;
			}
		}
	}
</style>
