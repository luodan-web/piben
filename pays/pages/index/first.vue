<template>
	<view class="container">
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item.id,item.image)">
				<view class="qr">
					<view class="image-wrapper">
						<image :src="getImgUrl(item.image)" mode="aspectFill"></image>
					</view>
					<text class="title ">扫一扫上方二维码，分享商品</text>
					<button class="submit-btn" >请长按图片保存</button>
					<view class="titled">打开支付宝扫描图片处理</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	var _self = this;
	export default {
		data() {
			return {
				goodsList: [],
			}
		},
		onLoad() {
			this.getProduct();
		},
		methods: {
			// 得到图片
			getImgUrl(image) {
				return "http://ltkhou.chaojiniu.top/" + image;
			},
			// 获取产品列表
			async getProduct() {
				this.$api.msg('加载中..', 20000);
				this.goodsList = await this.$api.request('/taocanList');
				console.log(this.goodsList);
			},
			// 跳转到商品列表
			navToDetailPage(id, image) {
				
				this.$api.msg(`恭喜您选择第${id}号套餐，图片已经保存`, 20000);
			}
		},
	};
</script>

<style lang="scss">
	/* 猜你喜欢 */
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n + 1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: 26upx;
			color: $font-color-dark;
		}

		.titled {
			font-size: 24upx;
			color: $font-color-dark;
			line-height: 30upx;
			width: 80%;
			margin: 20upx auto;
		}

		.submit-btn {
			margin-top: 20upx;
			width: 100%;
			font-size: 32upx;
			color: #FFFFFF;
			background-color: $base-color;
			border: none;
			// box-shadow: 1px 2px 5px rgba(219, 113, 60, 0.4);
		}
	}
</style>
style>
