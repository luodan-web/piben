<template>
	<view class="">
		<view class="first comment" @click="$api.navTo('/pages/index/first')">
		</view>
		<view class="sconed comment" @click="$api.navTo('/pages/index/sconed')">
		</view>
		<view class="thrid comment" @click="$api.navTo('/pages/index/thrid')">
		</view>
		<view class="main xuanzhe">
			<ld-select :list="options" label-key="label" value-key="value" placeholder="请再次确定选择套餐" clearable v-model="value"
			 @change="selectChange"></ld-select>
		</view>
		<view class="yt-list-cell">
			<button class="confirm-btn" @click.stop="submit" :disabled="submited">
				<!-- 用户未办理 ，需要办理-->
				<view class="" v-if="!extendData.status">
					<view class="" v-if="btnFont==0">
						<text>提交</text>
					</view>
					<view class="" v-if="btnFont==1">
						<text v-if="taocanStatus.status==0">审核中</text>
						<text v-if="taocanStatus.status==1">办理成功</text>
						<text v-if="taocanStatus.status==2">审核失败，请核对后重新提交</text>
					</view>
				</view>
				<!-- 用户已办理 ，显示状态即可-->
				<view class="" v-if="extendData.status"> -->
					<view class=""  v-if="btnFont==2">
						<text v-if="extendData.status==0">审核中</text>
						<text v-if="extendData.status==1">办理成功</text>
						<text v-if="extendData.status==2">审核失败，请核对后重新提交</text>
					</view>
				</view>

			</button>
		</view>
		<view class="notice-content" v-if="gonggaoFalse">
			<span class="iconfont icon">&#xe611;</span>
			<text class="icons">{{gonggaolan.title}}</text>
			<span class="iconfont icon" @click="gonggaolanFalse()">&#xe60f;</span>
		</view>
	</view>
</template>

<script>
	import ldSelect from '@/components/ld-select/ld-select.vue'
	export default {
		components: {
			ldSelect
		},
		data() {
			return {
				btnFont: 0,
				gonggaoFalse: true,
				submited: false,
				gonggaolan: {},
				taocanStatus: {},
				value: '',
				options: [{
					value: 1,
					label: '129套餐'
				}, {
					value: 2,
					label: '159套餐'
				}, {
					value: 3,
					label: '199套餐'
				}, {
					value: 4,
					label: '299套餐'
				}],
				extendData:{}
			}
		},
		onLoad() {
			this.gonggao();
			let BtnZhuangtai = uni.getStorageSync("zhuangtai");
			if (BtnZhuangtai == 1) {
				this.submit()
			};
			this.listAddress();
			// this.statused();
		},
		methods: {
			listAddress() {
				this.$href(`/pages/public/login`)
			},
			// 隐藏公告栏
			gonggaolanFalse() {
				this.gonggaoFalse = false
			},
			// 选择优惠券
			selectChange(val) {
				this.value = val;
				uni.setStorage({
					key: 'juanid',
					data: this.value
				});
				console.log(this.value)
			},
			async gonggao() {
				this.gonggaolan = await this.$api.request('/gonggao');
			},
			// 状态
			async statused() {
				this.extendData = await this.$api.request('/userTaocanStatus');
				this.btnFont =2;
				this.submited = true;
				console.log(this.extendData);
			},
			// 提交
			async submit() {
				let pid = uni.getStorageSync('pid');
				let areid = uni.getStorageSync('areid');
				let juanid = uni.getStorageSync('juanid');
				let phoneid = uni.getStorageSync('phoneid');
				let phoneNum = await this.$api.request('/taocanSubmit', 'POST', {
					lipinId: pid,
					addressId: areid,
					taocanId: juanid,
					mobile: phoneid,
				});
				this.btnFont = 1,
					uni.setStorage({
						key: 'zhuangtai',
						data: this.btnFont
					});
				this.submited = true;

				this.taocanStatus = await this.$api.request('/userTaocanStatus');
				console.log(this.taocanStatus);
				if (this.taocanStatus.status == 0) {
					this.submited = true
				} else if (this.taocanStatus.status == 1) {
					this.submited = true
				} else {
					this.submited = false
				}

			},
		}
	}
</script>

<style>
	page {
		background: #f5f5f5;
	}

	.xuanzhe {
		width: 80%;
		margin: 0 auto;
	}

	.comment {
		background-color: #FFFFFF;
		height: 300upx;
		margin: 30upx 30upx;
		border-radius: 25upx;
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.first {

		background-image: url(../../static/first.png);

	}

	.sconed {
		background-image: url(../../static/third.png);
	}

	.thrid {
		background-image: url(../../static/sconed.png);
	}

	.confirm-btn {
		height: 76upx;
		line-height: 76upx;
		/* border-radius: 50px; */
		margin: 70upx 70upx 30upx 70upx;
		background-color: #f75a32;
		color: #FFFFFF;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.notice-content {
		position: fixed;
		/* 固定在底部 */
		display: flex;
		justify-content: space-between;
		bottom: var(--window-bottom);
		width: 94%;
		height: 40upx;
		line-height: 40upx;
		margin-left: 2%;
		font-size: 32upx;
		border-radius: 50upx;
		text-align: center;
		padding: 8upx 10upx;
		background: rgba(176, 176, 176, 0.5);
		color: #FFFFFF;
	}
</style>
