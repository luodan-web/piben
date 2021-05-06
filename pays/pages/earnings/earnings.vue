<template>
	<view class="">
		<view class="orderBox">
			<view class="zhanwei">
				<view class="vip-card-box1">
					<view class="balance">
						<view class="balanceBig">
							账户余额(元)
						</view>
						<view class="balanceSmall">
							{{total||'0.00'}}
						</view>
					</view>
					<view class="withdraw" @click="pay(total)">
						去提现
					</view>
				</view>
				<view class="vip-card-box2">
					<view class="earnings">
						<text class="money">累计收益(元)</text>
						<text>{{List.all}}</text>
					</view>
					<view class="earnings">
						<text class="money">已提现(元)</text>
						<text>0.00</text>
					</view>
					<view class="earnings">
						<text class="money">未结算(元)</text>
						<text>0.00</text>
					</view>
				</view>
			</view>
			<view class="order">
				<view class="orderItem">
					<uni-segmented-control class="orderI" :current="current" :values="items" @clickItem="onClickItem" style-type="text"
					 active-color=" #fd5837"></uni-segmented-control>
				</view>
				<view class="content">
					<view v-if="current === 0">
						<text class="contentBox">结算收入:</text>
						<view class="contentBox2">
							<view class="contentBig">
								<text>我的收益</text>
								<view class="contentSmall">
									<view class="earnings">
										<text class="mone">今日收益</text>
										<text class="juli">{{List.today}}.00</text>
									</view>
									<view class="earnings">
										<text class="mone">估计收益</text>
										<text>{{List.today}}.00</text>
									</view>
								</view>
							</view>
							<!-- <view class="contentBig">
								<text>团队收益</text>
								<view class="contentSmall">
									<view class="earnings">
										<text class="mone">付款笔数</text>
										<text>0.00</text>
									</view>
									<view class="earnings">
										<text class="mone">估计的收益</text>
										<text>0.00</text>
									</view>
								</view>
							</view> -->
						</view>
					</view>
					
					
					
					<view v-if="current === 1">
						<text class="contentBox">结算收入:</text>
						<view class="contentBox2">
							<view class="contentBig">
								<text>我的收益</text>
								<view class="contentSmall">
									<view class="earnings">
										<text class="mone">本月收益</text>
										<text class="juli">{{List.month}}.00</text>
									</view>
									<view class="earnings">
										<text class="mone">估计收益</text>
										<text>{{List.month}}.00</text>
									</view>
								</view>
							</view>
							<!-- <view class="contentBig">
								<text>团队收益</text>
								<view class="contentSmall">
									<view class="earnings">
										<text class="mone">付款笔数</text>
										<text>0.00</text>
									</view>
									<view class="earnings">
										<text class="mone">估计的收益</text>
										<text>0.00</text>
									</view>
								</view>
							</view> -->
						</view>
					</view>
					
					
					
					
					
					
				</view>

			</view>
		</view>

	</view>
</template>
<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				items: ['今日', '本月'],
				current: 0,
				List:'',
				total:'',
			}
		},
		onLoad(option) {
			this.total=option.tixian
			this.getList()
		},
		methods: {
			// 获取收益
			async getList(){
				this.List=await this.$api.request("/moneyCount");
				console.log(this.List);
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			pay(pay) {
				uni.navigateTo({
					url: `/pages/mony/pay?tixian=${pay}`
				})
			},
			
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
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
		/* background: #fff; */
		align-content: center;
		/* border-radius: 10upx; */
	}

	%sectionBetween {
		display: flex;
		justify-content: space-between;
		/* background: #fff; */
		align-content: center;
		/* border-radius: 10upx; */
	}

	.orderBox {
		.zhanwei {
			padding: 30upx 30upx 0upx;
			// height: 230upx;
			background-color:$base-color;

			.vip-card-box1 {
				display: flex;
				align-items: center;

				.balance {
					width: 80%;
					color: #FFFFFF;

					.balanceBig {
						font-size: 30upx;
						margin-bottom: 10upx;
					}

					.balanceSmall {
						font-size: 40upx;
						font-weight: 600;
					}
				}

				.withdraw {
					// font-weight: 600;
					background-color: #FFFFFF;
					width: 150upx;
					height: 50upx;
					color: #8a3b2d;
					border-radius: 50upx;
					font-size: $font-base;
					text-align: center;
					line-height: 50upx;
				}
			}

			.vip-card-box2 {
				color: #FFFFFF;
				font-weight: 600;
				@extend %sectionBetween;
				font-size: 26upx;
				padding: 30upx 30upx;
				.earnings {
					@extend %flex-center;
					.money {
						margin-bottom: 10upx;
						color:  #FFFFFF;
						opacity: 0.7;
						font-weight: 600;
					}
				}
			}
		}
	}

	/deep/.segmented-control__item--button[data-v-a00bd3e0] {
		border-style: none;
	}

	.orderItem {
		background-color: #FFFFFF;
		// padding: 0 10upx;
		.orderI {
			margin: 0 auto;
			font-size: $font-color-dark;
		}
	}

	.content {
		padding: 30upx 30upx;

		.contentBox {
			display: block;
			margin-bottom: 30upx;
			color: #606266;
			font-size: $font-lg;
		}

		.contentBox2 {
			padding: 40upx 40upx;
			background-color: #FFFFFF;
			// height: 400upx;
			border-radius: 25upx;

		}

		.contentBig {
			font-size: $font-lg;
			// height: 200upx;

			.contentSmall {
				@extend %sectionBetween;
				font-size: 28upx;
				width: 70%;
				margin: 0 auto;
				// padding-bottom: 30;
				.earnings {
					@extend %flex-center;
					margin-top: 30upx;
					.mone {
						margin-bottom: 10upx;
						color: $font-color-base;
					}
					.juli{
						margin-bottom: 20upx;
					}
				}
			}
		}

	}
</style>
