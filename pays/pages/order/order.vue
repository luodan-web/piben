<template>
	<view class="">
		<view class="orderBox">
			<view class="zhanwei">
				<view class="navbar">
					<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
						直推订单
					</view>
					<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
						间推订单
					</view>
					<view class="nav-item" :class="{current: filterIndex === 3}" @click="tabClick(3)">
						赠送订单
					</view>
				</view>
			</view>
			<view class="order" v-if="filterIndex  === 1 || filterIndex  === 2">
				<view class="phoneColum">
					<view class="phoneRow">
						<view class="find">
							<view class="findLists" v-for="(item,index) in orderList" :key="index">
								<view class="findBox1">
									姓名:{{item.nickname}}
								</view>
								<view class="findList">

									<view class="findBox">
										电话:
										<view class="">
											{{item.mobile}}
										</view>
										<!-- {{item.mobile}} -->
									</view>
									<view class="findBox">
										套餐:
										<view class="">
											{{item.taocan_name}}
										</view>
										<!-- {{item.nickname}} -->
									</view>
									<view class="findBox">
										金额:
										<view class="">
											{{item.taocanmoney}}
										</view>
										<!-- {{item.taocanmoney}} -->
									</view>
									<view class="findBox">
										时间:
										<view class="">
											{{item.updatetime}}
										</view>
										<!-- {{item.updatetime}} -->
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="order" v-if="filterIndex  === 3">
				<view class="guess-section">
					<view  class="guess-item">
						<view class="image-wrapper">
							<image :src="getImgUrl(producted.image)" mode="aspectFill"></image>
						</view>
						<view class="text-wrapper">
							<view class="title clamp">
							{{producted.title}}
							</view >
							<view class="price">
								<view class="priced">原价：￥{{producted.price}}</view>
								<view class="prices">实际：￥0.00</view>
							</view>
							<view class="wuliu" @click="$api.navTo('/pages/user/wuLiu')">
								查看物流
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>
<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniSegmentedControl,
			uniLoadMore
		},

		data() {
			return {
				current: 0,
				filterIndex: 0,
				orderList: {},
				page: 1,
				size: 10,
				producted:{}
			}
		},
		onPullDownRefresh() {
			if (this.$refs && this.$refs.countd) {
				this.$refs.countd.syncFlag = false;
			}
			this.orderList = [];
			this.page = 1;
		},
		onLoad() {
			this.tabClick(1)
		},
		methods: {
			getImgUrl(image) {
				return "http://ltkhou.chaojiniu.top/" + image;
			},
			//筛选点击
			async tabClick(index) {
				// 直接和间接
				if (index == 1 || index == 2) {
					this.orderList = await this.$api.request('/orderList', 'POST', {
						type: index,
						page: this.page,
						sisz: this.size
					});

					if (this.orderList) {
						if (this.orderList > 0) {
							this.orderList.forEach(item => {
								this.orderList.push(item);
							});
							this.page++;
						}
					} else {
						this.$api.msg('没有更多数据');
					}
				}
				// 赠送订单
				if (index == 3) {
					this.producted = uni.getStorageSync('product');
					console.log(this.producted);
				}
				if (this.filterIndex !== index) {
					this.filterIndex = index;
				};
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	/* 猜你喜欢 */
	.guess-section {
		.guess-item {
			display: flex;
			justify-content: space-between;
			margin: 20upx 20upx;
		}
	
		.image-wrapper {
			width: 30%;
			height: 220upx;
			border-radius: 3px;
			overflow: hidden;
	
			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
	.text-wrapper{
		width: 70%;
		margin-left: 20upx;
		.title {
			font-size: 24upx;
			color: $font-color-dark;
			line-height: 60upx;
		}
		.priceed{
			font-size:  28upx;
			color: #C0C4CC;
			line-height: 1;
		}	
		.price {
			display:flex;
			justify-content: space-between;
			font-size: 28upx;
			.priced{
				text-decoration:line-through;
				color: #909399;
			}
			.prices{
				color:  $uni-color-primary;
			}
		}
		.wuliu{
			float: right;
			width: 30%;
			text-align: center;
			padding:2upx;
			margin-top: 5upx;
			background-color: $uni-color-primary;
			color: #FFFFFF;
			font-size: 28upx;
			border:1upx solid $uni-color-primary;
			border-radius: 25upx;
		}
	}
		
	}
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
	}

	%sectionBetween {
		display: flex;
		justify-content: space-between;
		align-content: center;
	}

	.orderBox {
		.zhanwei {
			padding: 30upx 30upx 0upx;
			height: 120upx;
			background-color: $base-color;
		}
	}

	.phoneColum {
		width: 90%;
		margin: 0 auto;

		text {
			display: block;
			color: $font-color-dark;
			font-size: $font-base;
			margin: 0 0 20upx 0;
		}

		.phoneRow {
			margin-bottom: 20upx;

			.phoneRowFont {
				font-size: 28upx;
				color: #000;
				font-weight: 700;
				padding: 20upx 0;
			}
		}
	}

	.findBox1 {
		font-size: 28upx;
		font-weight: 700;
		margin-bottom: 10upx;
	}

	.findLists {
		margin-top: 30upx;

		.findList {
			display: flex;
			justify-content: space-between;
			font-size: 26upx;
		}
	}

	.navbar {
		position: fixed;
		left: 0;
		display: flex;
		width: 100%;
		height: 80upx;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 38upx;
			position: relative;
			color: #FFFFFF;
			opacity: 0.5;

			&.current {
				color: #FFFFFF;
				opacity: 1;

				&:after {

					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
				}
			}
		}
	}

	/deep/.segmented-control__item--button[data-v-a00bd3e0] {
		border-style: none;
	}

	.orderItem {
		background-color: #FFFFFF;

		.orderI {
			margin: 0 auto;
			font-size: $font-color-dark;
		}
	}

	.content {
		padding: 30upx 30upx;
	}
</style>
