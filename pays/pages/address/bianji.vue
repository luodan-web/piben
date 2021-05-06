<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地区</text>
			<pickerAddress @change="change" class="diqu" v-on:click="showCityPicker()">
				{{value}}
			</pickerAddress>
		</view>
		<view class="row b-b">
			<text class="tit">详细</text>
			<input class="input" type="text" v-model="addressData.address" placeholder="详细地址,楼号" placeholder-class="placeholder" />
		</view>

		<!-- <view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.is_default" color=" #f75a32" @change="switchChange" />
		</view> -->
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import pickerAddress from '@/components/pickerAddress.vue'
	export default {
		components: {
			pickerAddress
		},
		data() {
			return {
				value: "请选择地区",
				addressData: {
					name: '',
					mobile: '',
					address: '',
					province:'',
					city_id: 0,
					area_id: 0,
					is_default: false,
				},
				pickerValueDefault: [0, 0, 0], //城市选择器默认值 省市区id
			}
		},
		onLoad(option) {
			this.id=option.id;
			this.getArr();
		},
		methods: {
			// 得到地址
			getArr(){
				let addressData=uni.getStorageSync('bianji');
					if (addressData) {
						console.log(addressData);	
						this.addressData = addressData;
						this.pickerValueDefault = addressData.province+addressData.city+addressData.area;
					}
			},
			
			// 选择地址
			change(data) {
				this.value = data.data.join('-');
				let ared = {
					province: data.data[0],
					city: data.data[1],
					area: data.data[2],
				}
				uni.setStorage({
					key: 'ared',
					data: ared
				})
			},
			
			//提交
			async confirm() {
				let data = JSON.parse(JSON.stringify(this.addressData));
				// console.log(data);
				if (!data.name || this.addressData.name.length < 2) {
					this.$api.msg('联系人格式有误');
					return;
				}

				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if (!data.address) {
					this.$api.msg('请填详细地址信息');
					return;
				}
				let ared = uni.getStorageSync('ared');
				console.log(ared.province)
				let result = await this.$api.request('/addressEdit' , 'POST', {
					addressId:this.id,
					province: ared.province,
					city: ared.city,
					area: ared.area,
					address: data.address,
					name: data.name,
					mobile: data.mobile
				});
				setTimeout(() => {
						uni.navigateBack(`/pages/addAddress/addAddress`)
					}, 800),
				uni.removeStorage({
					key: 'bianji',
				}),
				uni.removeStorage({
					key: 'ared',
				})
			},


		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.diqu {
		font-size: 30upx;
		color: $font-color-dark;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(212, 70, 0, 0.4);
	}
</style>
