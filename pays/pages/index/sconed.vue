<template>
	<view class="">
		<view class="phoneColum">
			<view class="phoneRow">
				<text class="phoneRowFont">绑定新的手机号</text>
				<view class="">
					<input type="text" value="" v-model="phone" placeholder="请输入绑定的手机号" />
				</view>
				<button class="add-btn" @click="find()">
					<text v-if="phoned==0">绑定手机号</text>
					<text v-if="phoned==1">已经绑定手机号</text>
				</button>
				<view class="phoneRowed">
					<text class="phoneRowFont">已经绑定新的手机号</text>
					<text class="phoneRow">{{phoneNum}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {

		data() {
			return {
				phone: "",
				phoned:0,
				finded:false,
				phoneNum:''
			}
		},
		onLoad() {
			this.bangdingPhone()
		},
		methods: {
			find() {
				let rge = /^1[3456789]\d{9}$/;
				if (!rge.test(this.phone)) {
					this.$api.msg('手机号的格式不正确');
					return false;
				} else {
					uni.setStorage({
							key: 'phoneid',
							data: this.phone
						});
						this.$api.msg("已经绑定了新的手机号",2000);
						
			}
			this.phoned=1;
			this.finded=true;
		},
		bangdingPhone(){
			this.phoneNum=uni.getStorageSync('phoneid')
			
		}
	},
	}
</script>

<style lang="scss">
	.phoneColum {
		width: 90%;
		margin: 0 auto;

		text {
			display: block;
			color: $font-color-dark;
			font-size: $font-base;
			// margin: 0 0 20upx 0;
		}
		
		.phoneRow {
			margin-bottom: 20upx;

			.phoneRowFont {
				font-size: 28upx;
				color: #000;
				font-weight: 700;
				padding: 20upx 0;
			}
	
				.add-btn {
					// position: fixed;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 30upx;
					width: 690upx;
					height: 80upx;
					background-color: $base-color;
					border-radius: 10upx;
					box-shadow: 1px 2px 5px rgba(219, 113, 60, 0.4);
					text{
						// margin-top: 10upx;
						font-size: 32upx;
						color: #fff;
					}
				}
			
		}
	}
</style>
