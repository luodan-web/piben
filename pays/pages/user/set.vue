<template>
	<view>
		<view class="list">
			<view class="service juli">
				<view class="portrait-box relation">
					<image class="portrait" :src="avatar ? avatar : '/static/missing-face.png'"></image>
					<!-- <image class="portrait" src='/static/missing-face.png'></image> -->
					<!-- <button class="button" open-type="getUserInfo" @getuserinfo="getAvatar"></button> -->
				</view>
				<view class="arrows julili">
					<span>修改头像</span>
					<span class="iconfont ">&#xe64b;</span>
				</view>
			</view>
			<view class="wire"></view>
			<view class="service">
				<text class="relation">昵称</text>
				<view class="arrows">
					<span class="">{{this.username }}</span>
					<span class="iconfont ">&#xe64b;</span>
				</view>
			</view>
			<view class="wire"></view>
			<view class="service">
				<text class="relation">绑定的手机号</text>
				<view class="arrows">
					<span>{{this.mobile }}</span>
					<span class="iconfont ">&#xe64b;</span>
				</view>

			</view>
		</view>

		<view class="list">
			<view class="wire"></view>
			<view class="service"  @click="$api.navTo('/pages/mony/alipay')">
				<text class="relation">绑定支付宝</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
			<view class="service" @click="$api.navTo('/pages/mony/xiugai')">
				<text class="relation">修改支付宝</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
			<view class="service" @click="$api.navTo('/pages/set/set')">
				<text class="relation">显示参与活动的手机号</text>
				<span class="iconfont arrows">&#xe64b;</span>
			</view>
			<view class="wire"></view>
		</view>
		<!-- 	<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="portrait-box">
				<image class="portrait" :src="avatar ? avatar : '/static/missing-face.png'"></image>
				<button class="button" open-type="getUserInfo" @getuserinfo="getAvatar"></button>
			</view>
		</view>	
		<view class="yt-list-cell">
			<view class="cell-tit clamp">用户名
				<input class="input" type="text" v-model="username" /> -->
		<!-- <button class="input username" open-type="getUserInfo" @getuserinfo="getUserInfo">获取微信名称</button> -->
		<!-- 	</view> -->
		<!-- </view> -->
		<!-- <view class="yt-list-cell">
			<view class="cell-tit clamp">手机号码
				<input v-if="mobile" disabled="true" class="input" type="text" v-model="mobile" />
				<!-- <button v-else class="input" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权获取微信绑定的手机号码</button> -->
		<!-- </view> -->
		<!-- </view> -->
		<!-- <button @click="submit" class="add-btn">提交保存</button> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				username: '',
				mobile: '',
				avatar: ''
			};
		},
		computed: {
			...mapState(['userinfo'])
		},
		onLoad() {
			this.username = this.userinfo.userinfo.nickname;
			this.mobile = this.userinfo.userinfo.mobile;
			this.avatar = this.userinfo.userinfo.avatar;
		},
		methods: {
			...mapMutations(['login']),
			async submit() {
				if (this.username == '') {
					this.$api.msg('用户名称不能为空');
					return;
				}
				let data = await this.$api.request('/nicknameEdit', 'POST', {
					nickname: this.username,
				});
				this.$store.commit('login', data)

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
	}
	.juli{
		margin-bottom: 15upx;
	}
	.julili{
		padding-top: 15upx;
	}
	.portrait-box{
		width: 80upx;
		height: 80upx;
		
		border-radius: 50%;
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.list {
		// padding: 0upx 30upx 30upx 30upx;
		margin: 0upx 0upx 20upx 0upx;
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
				font-size: 24upx;
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
