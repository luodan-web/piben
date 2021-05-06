<template>
	<view class="">
		<view class="orderBox">
			<view class="zhanwei">
				<text>你的推荐人:</text>
				<view class="vip-card-box2">
					<view class="earnings">
						<text>{{userinfo.userinfo.s_code}}</text>
					</view>
					<view class="earnings">
						<text>{{userinfo.userinfo.invitecode}}</text>
					</view>
				</view>
				<view class="navbar">
					<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
						<view>{{userList.num_today}}</view>
						今日新增
					</view>
					<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
						<view>{{userList.num_yesterday}}</view>
						昨日新增
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view class="navbar">
				<view class="nav-item" :class="{current:current === 1}" @click="onClickItem(1)">
					<view>{{userList.num_all_z}}</view>
					直属粉丝
				</view>
				<view class="nav-item" :class="{current: current === 2}" @click="onClickItem(2)">
					<view>{{userList.num_2}}</view>
					二代粉丝
				</view>
				<view class="nav-item" :class="{current: current === 3}" @click="onClickItem(3)">
					<view>{{userList.num_2_after}}</view>
					二代以后
				</view>
			</view>
			<view class="order">
				<view class="phoneColum">
					<view class="phoneRow">
						<view class="find">
							<view class="findLists" v-for="(item,index) in fenSi" :key="index">
								<view class="findList">
									<view class="findBox">
										姓名:{{item.nickname}}
									</view>
									<view class="findBox2">
					                         <image :src="getImgUrl(item.levelimage)"  mode=""></image>
									</view>
									<view class="findBox">
										时间:{{item.jointime}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				current: 2,
				filterIndex: 1,
				userList: '',
				fenSi: '',
				page: 1,
				size: 10
			}
		},
		computed: {
			...mapState(['hasLogin', 'userinfo'])
		},
		// onPullDownRefresh() {
		// 	if (this.$refs && this.$refs.countd) {
		// 		this.$refs.countd.syncFlag = false;
		// 	}
		// 	this.goodsList = [];
		// 	this.page = 1;
		// 	this.loadData();
		// },
		onLoad() {
			this.user();
			this.onClickItem(1);
			this.tabClick(0);
		},
		methods: {
			// 得到图片
			getImgUrl(image) {
				return "http://ltkhou.chaojiniu.top/" + image;
			},
			//筛选点击
			tabClick(index) {
				if (this.filterIndex !== index) {
					this.filterIndex = index;
				}
				console.log(this.BigfenSi);
			},
			async onClickItem(e) {
				this.fenSi = await this.$api.request('/userList', "POST", {
					type: e,
					page:this.page,
					sisz:this.size
				});
				if (this.current !== e) {
					this.current = e;
				}
				console.log(this.fenSi);
			},
			async user() {
				this.userList = await this.$api.request('/userCount');
				console.log(this.userList);
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: #f5f5f5;
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
		.findBox2{
			width:90upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}

	.findLists {
		margin-top: 30upx;

		.findList {
			display: flex;
			justify-content: space-between;
			font-size: 26upx;
		}
	}

	.orderBox {

		.zhanwei {
			padding: 30upx 30upx 0upx;
			/* height: 200upx; */
			background-color: $base-color;

			text {
				color: #FFFFFF;
				font-size: $font-sm;
			}

			.vip-card-box2 {
				display: flex;
				justify-content: space-around;
			}

			.navbar {
				display: flex;
				justify-content: space-around;
				width: 92%;
				/* height: 100upx; */
				padding: 30upx 0 0 0;
				z-index: 10;
				margin: 0 auto;

				.nav-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-radius: 25upx 25upx 0 0;
					padding-bottom: 20upx;
					font-size: 28upx;
					color: #FFFFFF;
					background-color: rgba($color: #ffffff, $alpha:0.2);

					&.current {
						opacity: 1;
						color: $font-color-dark;
						background-color: #FFFFFF;

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
		}
	}

	.order {
		.navbar {
			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 100upx;
			z-index: 10;

			.nav-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 28upx;

				&.current {
					color: $base-color;

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
	}
</style>
