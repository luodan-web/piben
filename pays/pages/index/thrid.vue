<template>
	<view class="container">
		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item.id,goodsList[index])">
				<view class="image-wrapper">
					<image :src="getImgUrl(item.image)" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{ item.title }}</text>
				<text class="price">￥{{item.price}}</text>
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
		onPullDownRefresh() {
			if (this.$refs && this.$refs.countd) {
				this.$refs.countd.syncFlag = false;
			}
			this.goodsList = [];
			this.page = 1;
			this.loadData();
		},
		onLoad(){
			this.getProduct();
		},
		methods: {
			// 获取图片的信息
			getImgUrl(image) {
				return "http://ltkhou.chaojiniu.top/" + image;
			},
			// 获取产品列表
			async getProduct() {
				this.$api.msg('加载中..', 20000);
				this.goodsList = await this.$api.request('/lipinList');
				if (this.goodsList) {
					if (this.goodsList.Length > 0) {
						this.goodsList.forEach(item => {
							this.goodsList.push(item);
						});
						this.page++;
					} else {
						this.$api.msg('没有更多数据');
					}
				}
				console.log(this.goodsList);
			},
			// 跳转到商品列表
			navToDetailPage(pid,product) {
				uni.setStorage({
					key: 'pid',
					data: pid
				});
				uni.setStorage({
					key: 'product',
					data: product
				});
				uni.navigateTo({
					url: `/pages/address/address`
				});
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
			font-size: 28upx;
			color: $font-color-dark;
			line-height: 60upx;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
</style>
