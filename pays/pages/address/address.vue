<template>
	<view class="content b-t">
		<view class="list b-b" v-for="(item, index) in addressList" :key="item.id">
			<view class="wrapper">
				<view class="address-box">
					<text class="address">{{item.province+item.city+item.area+' '+item.address}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.name}}</text>
					<text class="mobile">{{item.mobile}}</text>
				</view>
			</view>
			<!-- <text class="bianji" @click.stop="addAddress('edit',item.name,item.province+item.city+item.area,item.mobile,item.address,)">编辑</text> -->
			<view class="wrapper2">
			<text class="bianji" @click.stop="bianjiaddAddress(item.id,addressList[index])">编辑</text>
			<text class="bianji juli" @click.stop="deleteAddress(item.id,index)">删除</text>
			<view class="submit">
				<text class="" :disabled="submited" @click.stop="checkAddress(item.id,item.province+item.city+item.area+' '+item.address)">
					<text v-if="phoned==0">提交地址</text>
					<text v-if="phoned==1">已经提交地址</text>	
				</text>
			</view>
			</view>
		</view>
		<button class="add-btn" @click="addAddress()">新增地址</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [],
				submited:false,
				phoned:0
			}
		},
		onLoad() {
			this.getList();
		},
		onShow() {
			 this.getList();
		},
		methods: {
			//获取我的收货地址
			async getList() {
				this.addressList = await this.$api.request('/addressList');
				console.log(this.addressList);
			},
			// //选择地址
			checkAddress(are, arsDre) {
				uni.setStorage({
					key: 'areid',
					data: are
				});
				uni.showModal({
					title: '提示',
					content: `你确定要提交${arsDre}吗?`,
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: `/pages/index/index`
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
						this.phoned=1;
						this.submited=true
					}
				});
				
			},
			// 增加
			addAddress() {
				uni.navigateTo({
					url: `/pages/address/addressManage`
				})
			},
			// 编辑
			bianjiaddAddress(id,addressList) {
				console.log(addressList);
				uni.setStorage({
					key: 'bianji',
					data: addressList
				});
				uni.navigateTo({
					url: `/pages/address/bianji?id=${id}`
				})
				
			},
			async deleteAddress(id, index) {
				let [error, res] = await uni.showModal({
					title: '确定删除地址？',
					content: this.addressList[index].city,
				});
				if (res.confirm) {
					let data = await this.$api.request('/addressDelete', "POST", {
						addressId: id
					});
					this.getList();
				}

			}

		}
	}
</script>

<style lang='scss'>
	page {
		background: #f5f5f5;
	}

	.content {
		position: relative;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 30upx 30upx;
		background: #fff;
		position: relative;
		margin: 20upx 30upx 0 30upx;
		border-radius: 20upx;
		.bianji {
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.juli {
			margin-left: 30upx;
		}
	}
	.submit{
		background-color:$base-color ;
		text-align: center;
		color: #FFFFFF;
		margin-top: 10upx;
		font-size: 28upx;
		padding: 10upx 10upx;
		border-radius: 10upx;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-box {
		display: flex;
		align-items: center;

		.tag {
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.address {
			font-size: 28upx;
			color: $font-color-dark;
		}
	}

	.u-box {
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;

		.name {
			margin-right: 30upx;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}

	.icon-lajitong {
		color: $font-color-light;
		padding-left: 25rpx;
	}


	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
