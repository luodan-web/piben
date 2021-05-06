<template>
	<view class="container">
		<view class="user-section">
			<view class="titleNview-background"></view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userinfo.userinfo.avatar ? userinfo.userinfo.avatar : '/static/missing-face.png'"></image>
					<!-- <image class="portrait" src='/static/missing-face.png'></image> -->
				</view>
				<view class="info">
					<view class="info-box">
						<text class="username">{{userinfo.userinfo.nickname||'游客'}}</text>
						<view class="grade" v-if="userinfo.userinfo.level===1">
							<image src="../../static/chuji.png" mode=""></image>
						</view>
						<view class="grade" v-if="userinfo.userinfo.level===2">
							<image src="../../static/qingtong.png" mode=""></image>
						</view>
						<view class="grade" v-if="userinfo.userinfo.level===3">
							<image src="../../static/baiying.png" mode=""></image>
						</view>
						<view class="grade" v-if="userinfo.userinfo.level===4">
							<image src="../../static/wangzhe.png" mode=""></image>
						</view>
					</view>
					<view class="invite">
						<view class="invite-box1">
							推荐码：{{userinfo.userinfo.invitecode}}
						</view>
						<view class="invite-box2">
							推荐人：{{userinfo.userinfo.s_code}}
						</view>
					</view>
				</view>
			</view>
			<view class="upgrade">
				<text>前往升级获取最高特权</text>
				<view class="upgradeBox" @click="$api.navTo('/pages/user/garde')">立即升级</view>
			</view>
			<view class="vip-card">
				<view class="vip-card-box1">
					<view class="balance">
						<view class="balanceBig">
							当前可提现余额￥{{UserInfo.money||'0.00'}}
						</view>
						<view class="balanceSmall">
							结算规则：新办收益在办理成功7天后可提现；管道收益在次月25号可提现
						</view>
					</view>
					<view class="withdraw" @click="pay(UserInfo.money)">
						提现
					</view>
				</view>
				<hr>
				<view class="vip-card-box2">
					<view class="earnings">
						<text class="money">{{List.today}}</text>
						<text>今日收益</text>
					</view>
					<view class="earnings">
						<text class="money">{{List.month}}</text>
						<text>本月收益</text>
					</view>
					<view class="earnings">
						<text class="money">{{List.all}}</text>
						<text>累计收益</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-section">
			<view class="order-item" @click="shouyi(UserInfo.money)" hover-class="common-hover" :hover-stay-time="50">
				<span class="iconfont icons iconEarnings">&#xe7ce;</span>
				<text>收益报表</text>
			</view>
			<view class="order-item" @click="$api.navTo('/pages/team/team')" hover-class="common-hover" :hover-stay-time="50">
				<span class="iconfont icons">&#xe650;</span>
				<text>粉丝团队</text>
			</view>
			<view class="order-item" @click="$api.navTo('/pages/order/order')" hover-class="common-hover" :hover-stay-time="50">
				<span class="iconfont icons">&#xe63a;</span>
				<text>订单列表</text>
			</view>
		</view>
		<view class="list">
			<view class="service" @click="$api.navTo('/pages/user/invite')">
				<span class="iconfont icon">&#xe65e;</span>
				<text class="relation">邀请分享</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
			<view class="service" @click="$api.navTo('/pages/user/garde')">
				<span class="iconfont icon">&#xe601;</span>
				<text class="relation">等级提升</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
			<view class="service" @click="service">
				<span class="iconfont icon">&#xe85a;</span>
				<text class="relation">联系客服</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
			<view class="service" @click="$api.navTo('/pages/user/history')">
				<span class="iconfont icon">&#xe608;</span>
				<text class="relation">历史公告</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
			<view class="service" @click="toLogout">
				<span class="iconfont icon">&#xe60e;</span>
				<text class="relation">退出登录</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
			<view class="service" @click="$api.navTo('/pages/user/set')">
				<span class="iconfont icon">&#xe696;</span>
				<text class="relation">设置</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
			<!-- <view class="service" @click="$api.navTo('/pages/user/wuLiu')">
				<span class="iconfont icon">&#xe638;</span>
				<text class="relation">物流</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view> -->
		</view>

	</view>
</template>
<script>
	import {
		mapState,mapMutations 
	} from 'vuex';
	export default {
		data() {
			return {
				UserInfo: '',
				List:''
			}
		},
		onLoad() {
			this.getUserinfo(),
			this.getList()
		},
		onShow() {

		},
		computed: {
			...mapState(['hasLogin', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout']),
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
				    		setTimeout(()=>{
				    			uni.navigateBack();
				    		}, 200)
				    	}
				    }
				});
			},
			// h5的客服
			 service(){
				let phone=uni.getStorageSync('phoneid');
				// this.userInfo().then((res)=>{
					// console.log(this.orderNum.level)
					var c = "&id="+this.userinfo.userinfo.id+"&c1="+this.userinfo.userinfo.nickname+"&c2="+this.userinfo.userinfo.mobile+"&c3="+phone+"&c4="+this.userinfo.userinfo.invitecode+"&c5="+this.userinfo.userinfo.s_code;
					window.location="https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b9780720594714d9cb81ce2b03618fcf2eeff651d29f61a24bc64fac61d388d698cba7d8fd10149eec7087b29636286894b"+c
				// })
			},
			// 获取产品列表
			async getUserinfo() {
				this.UserInfo = await this.$api.request('/userInfo');
			},
			// 获取收益
			async getList(){
				this.List=await this.$api.request("/moneyCount");
				console.log(this.List);
			},
			async order() {
				this.orderList = await this.$api.request('/orderList');
				console.log(this.orderList);
			},
			pay(pay) {
				uni.navigateTo({
					url: `/pages/mony/pay?tixian=${pay}`
				})
			},
			shouyi(pay) {
				uni.navigateTo({
					url: `/pages/earnings/earnings?tixian=${pay}`
				})
			},
		}
	};
</script>
<style lang='scss'>
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

	.user-section {
		/* background-color: #FFFFFF; */
		height: 460upx;
		padding: 100upx 30upx 0;
		position: relative;

		/* position: relative; */
		/* z-index: -1; */
		.titleNview-background {
			background-image: url(../../static/back.png);
			background-size: 100%;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 450upx;
			transition: 0.4s;
			/* background: #ff972f; */
			/* border-radius: 0 0 15% 15%; */
			/* z-index: -1; */
		}

		.user-info-box {
			height: 180upx;
			display: flex;
			align-items: center;
			position: relative;
			z-index: 1;

			.info {
				margin-left: 20upx;

				.info-box {
					display: flex;
					margin-bottom: 10upx;
					align-content: center;

					.username {
						font-size: $font-lg + 3upx;
						color: #FFFFFF;
					}

					.grade {
						width: 86upx;
						height: 44upx;
						margin-left: 10upx;
						image{
							width: 100%;
							height: 100%;
						}

					}
				}

				.invite {
					display: flex;
					color: #FFFFFF;
					font-size: 24upx;

					.invite-box1 {
						margin-right: 20upx;
					}
				}
			}

			.portrait-box {
				.portrait {
					width: 130upx;
					height: 130upx;
					border-radius: 50%;
				}
			}
		}

		.upgrade {
			position: relative;
			display: flex;
			justify-content: space-around;
			background-color: #000000;
			width: 90%;
			height: 60upx;
			line-height: 60upx;
			margin: 0 auto;
			border-radius: 20upx 20upx 0 0;

			text {
				color: #FFFFFF;
				font-size: $font-sm;
			}

			.upgradeBox {
				width: 19%;
				height: 35upx;
				margin-top: 12upx;
				border: 1upx #b06c00 solid;
				color: #b06c00;
				line-height: 35upx;
				font-size: 24upx;
				text-align: center;
				border-radius: 8upx;
				font-weight: 600;
			}
		}

		.vip-card {
			height: 200upx;
			background-color: #FFFFFF;
			border-radius: 16upx;
			overflow: hidden;
			position: relative;
			padding: 20upx 24upx;
			.vip-card-box1 {
				display: flex;
				
				.balance {
					width: 80%;

					.balanceBig {
						font-size: 28upx;
					}

					.balanceSmall {
						font-size: 24upx;
					}
				}

				
			}
			.withdraw {
				width: 100upx;
				height: 40upx;
				border: 1upx solid #666666;
				border-radius: 25upx;
				font-size: $font-sm;
				text-align: center;
				line-height: 40upx;
				font-size: 24upx;
			}

			.vip-card-box2 {
				@extend %sectionBetween;
				font-size: 24upx;

				.earnings {
					@extend %flex-center;

					.money {
						margin-bottom: 10upx;
					}
				}
			}

			hr {
				margin: 15upx 0;
				border: none;
				border-top: 1px solid #d5d9e2
			}
		}
	}

	.order-section {
		margin: 38upx 30upx 0 30upx;
		background: #fff;
		border-radius: 10upx;
		@extend %section;
		border-radius: 0 0 10upx 10upx;
		padding: 28upx 0;

		text {
			font-size: 26upx;
		}

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
			position: relative;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}

		/* .iconbox {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			background-color: #000;

		} */

		.icons {
			vertical-align: middle;
			line-height: 80upx;
			font-size: 60upx;
			color: $base-color;
		}

		.iconEarnings {
			font-size: 75upx !important;
		}
	}

	.list {
		padding: 0upx 30upx 30upx 30upx;
		margin: 20upx 30upx 20upx 30upx;
		background: #fff;
		border-radius: 10upx;

		/* padding: ; */
		.service {
			padding: 20upx 30upx;
			height: 60upx;
			background-color: #FFFFFF;
			line-height: 60upx;

			.icon {
				color: #5a4f46;
				float: left;
				margin-right: 10upx;
				font-size: 36upx;
			}



			.relation {
				float: left;
				color: #303133;
				font-size: 28upx;
			}

			.arrows {
				float: right;
				color: #606266;
			}
		}

		.wire {
			border-bottom: 1px solid #E4E7ED;
			width: 95%;
			float: right;
			transform: scaleY(0.5);
			-webkit-transform: scaleY(0.5);
		}

	}
</style>
