<template>
	<view>
		<view class="guess-section">
			<view class="guess-item" v-for="(item, index) in historyList" :key="index" @click="navToDetailPage(item)">

				<view class="image-wrapper">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{ item.title }}</text>
				<text class="price"><text class="symbol">￥</text> {{ item.sales_price }} <text class="sales"> {{' '+item.sales}}人付款</text></text>
			</view>
		</view>
		<view class="clear" @tap="clearKey">
			<span class="iconfont">&#xe63c;</span>
			<text>清空</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				historyList: []
			}
		},
		onLoad() {
			var history = uni.getStorageSync('ids');
			this.historyList = history;
			console.log(this.historyList);
			// this.clearKey();
		},
		methods: {
			// 商品详情页
			navToDetailPage(item, flash_id = 0) {
				let id = item.product_id;
				if (id < 10000) {
					return;
				}
				console.log(id);
				uni.navigateTo({
					url: `/pages/product/product?id=${id}&flash=${flash_id}`
				});
			},
			// 清除
			clearKey(){
				this.historyList = [];
				uni.removeStorage({key: 'ids',})
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	// 清空
	.clear {
		position: fixed;
		z-index: 9999;
		top: 0;
		margin: 160% 0 30% 86%;
		display: flex;
		flex-direction: column;
		width: 11%;
		// height: 80upx;
		background-color: #FFFFFF;
		;
		border: 1upx solid #cecece;
		border-radius: 50%;
		text-align: center;

		span {
			color: $font-color-base;
			padding: 10upx 10upx 0 10upx;
		}

		text {
			color: $font-color-base;
			font-size: 22upx;
			text-align: center;
			padding-bottom: 5upx;
		}
	}

	// 商品的列表
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;

		.guess-item {
			background: #fff;
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
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			.sales {
				color: #999999;
				font-size: 24upx;
			}

			.symbol {
				font-size: 24upx;
			}
		}
	}
</style>
