<template>
	<view>
		<!-- <view class="navbar">
			<view class="nav-item" :class="{current: paytype === 1}" @click="navToPay('1')">
				<view>慢充</view>
			</view>
			<view class="nav-item"  :class="{current: paytype === 3}" @click="navToPay('3')">
				<view>团队</view>
			</view>
		</view> -->
		<view class="phoneColum">
			<view class="phoneRow">
				<text>手机号码</text>
				<input type="text" value="" v-model="phone" placeholder="请输入手机号码" />
			</view>
			<view class="phoneRow">
				<text>手机类型</text>
				<view class="mobiile">
					<view @click="mobiletype('3')" :class="[isActive === 3 ? 'active' : 'one']" @tap="changeClass(3)">电信</view>
					<view @click="mobiletype('2')" :class="[isActive === 2 ? 'active' : 'one']" @tap="changeClass(2)">联通</view>
					<view @click="mobiletype('1')" :class="[isActive === 1 ? 'active' : 'one']" @tap="changeClass(1)">移动</view>
				</view>
			</view>
			<view class="phoneRow">
				<text>充值面值</text>
				<view class="payFace">
					<!-- <view v-for="(item,index) in mbtype" :key="index"  :class="[mzActive == index ? 'faced' : 'face']" @tap="mzChange(index)"> -->
					<view v-for="(item,index) in mbtype" :key="index" class="face">
						<view class="totalMz" @click="payFace(item)">
							<view class="bigMz">
								<view class="bigMzMony">
									{{item.mz*0.95}}
								</view>
								<view class="bigMzY">
									元
								</view>
							</view>
							<view class="smallMz">
								售价{{item.mz}}.00元
							</view>
						</view>
					</view>
				</view>
			</view>
			<button class="submit-btn" @click="submit()">提交订单</button>
			<view class="hint">
				<text class="wxhint">温馨提示</text>
				<text class="nrhint">以上充值均为话费慢充，72小时内到账，急用勿拍。请一定仔细核对号码无误之后付款。</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mbtype: [],
				phone: '',
				submitLock: false,
				isActive: "",
				mzActive: "",
			};
		},
		onLoad(options) {
			this.paytype = options.paytype;
			this.mobiletype('3');
			this.changeClass(3);
			// this.mzChange();
		},
		methods: {
			// 动态改变样式
			changeClass(n) {
				this.isActive = n;
			},
			// mzChange(index){
			// 	this.mzActive = index;
			// },
			// navToPay(paytype) {
			// 	this.paytype = paytype;
			// },
			// 获取面值
			async mobiletype(mobiletype) {
				this.mbtype = await this.$api.request('/product/mobile/paytype', 'POST', {
					paytype: this.paytype,
					mobiletype: mobiletype,
				});
				console.log(this.mbtype);
			},
			// 获取商品的id
			payFace(item) {
				let id = item.id;
				let mz = item.mz;
				uni.setStorage({
					key: 'id',
					data: id
				});
			},
			// console.log(e.target);
			// 提交
			async submit() {
				// 传递对象类型
				let a = "application/json";
				if (!this.phone) {
					this.$api.msg('请写电话号码');
					return;
				};
				if (this.submitLock) {
					return;
				};
				let id = uni.getStorageSync('id');
				this.submitLock = true; // 提交锁
				let submit = await this.$api.request('/order/mobileCreate', 'POST', {
					id: id,
					mobile: this.phone,
				}, a);
				// 清掉缓存
				uni.removeStorage({
					key: 'id',
					success() {
						console.log(id) //
					}
				})
				if (submit) {
					this.submitLock = false; // 解除锁
					this.$api.msg('提交中..', 2000);
					uni.navigateTo({
						url: `/pages/money/payPhone?orderLocal=${submit.orderLocal}&need=${submit.need}`
					})
				} else {
					this.submitLock = false; // 解除锁
				}
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;
	
	// 	.nav-item {
	// 		flex: 1;
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 		height: 100%;
	// 		font-size: 15px;
	// 		color: $font-color-dark;
	// 		position: relative;
	
	// 		&.current {
	// 			color: $base-color;
	
	// 			&:after {
	// 				content: '';
	// 				position: absolute;
	// 				left: 50%;
	// 				bottom: 0;
	// 				transform: translateX(-50%);
	// 				width: 44px;
	// 				height: 0;
	// 				border-bottom: 2px solid $base-color;
	// 			}
	// 		}
	// 	}
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
			padding-bottom: 35upx;
		}
	}

	.submit-btn {
		width: 90%;
		font-size: 32upx;
		color: #FFFFFF;
		background-color: #fa436a;
		border-radius: 50upx;
	}

	.mobiile {
		display: flex;
		justify-content: space-between;
		text-align: center;
		font-size: $font-lg;

		.one {
			width: 30%;
			height: 80upx;
			border-radius: 10upx;
			border: 1px #efeded solid;
			margin: 10upx 0 10upx 10upx;
			color: #303133;
			line-height: 80upx;
		}

		.active {
			width: 30%;
			height: 80upx;
			border-radius: 10upx;
			line-height: 80upx;
			margin: 10upx 0 10upx 10upx;
			color: #BB0033;
			background-color: #ffdbe3;
			border: 1px #fa6e70 solid;
		}
	}

	.payFace {
		display: flex;
		// margin: 0 auto;
		flex-wrap: wrap;

		.face {
			text-align: center;
			margin: 0 auto;
			width: 30%;
			height: 150upx;
			border-radius: 20upx;
			background-color: #f9f9f9;
			margin: 0upx 8upx 18upx 15upx;

			.totalMz {
				width: 100%;
			}

			.bigMz {
				margin-top: 30upx;
				display: flex;
				justify-content: center;

				.bigMzMony {
					font-size: $font-lg+10upx;
				}

				.bigMzY {
					margin: 10upx 0upx 0upx 5upx;
					font-size: $font-base;
				}
			}

			.smallMz {
				text-decoration:line-through;
				font-size: $font-sm+2upx;
				color: #909399;
			}

		}
	}

	.face:hover {
		color: #BB0033;
		background-color: #ffdbe3;

		.smallMz {
			color: #BB0033;
		}
	}

	.hint {
		width: 90%;
		height: 250upx;
		margin: 80upx auto;
		background-color: #e8e8e8;
		border-radius: 15upx;

		.wxhint {
			padding-top: 50upx;
			text-align: center;
			color: #191919;
			font-size: 34upx;
			font-weight: 600;
		}

		.nrhint {
			padding: 0 30upx;
			color: $font-color-dark;
		}
	}
</style>
