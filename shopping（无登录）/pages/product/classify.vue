<template>
	<view>
		<view class="classify">
			<view class="classify-item" @click="navToClassifyList('30')">
				<image class="classify-image" :src="require('../../image/class1.jpg')" mode=""></image>
			</view>
			<view class="classify-item" @click="navToClassifyList('31')">
				<image class="classify-image" :src="require('../../image/class2.jpg')" mode=""></image>
			</view>
			<view class="classify-item" @click="navToClassifyList('32')">
				<image  class="classify-image" :src="require('../../image/class3.jpg')" mode=""></image>
			</view>
		</view>
		<view class="explain">
			<view class="epBox">
			<view class="epf">
				会员免单商品说明：
			</view>
			<text>
				(1).LV1会员每月可领取LV1商品1件，LV2会员每月可领取LV1、LV2商品各一件(共2件)，LV3会员每月可领取LV1、LV2、LV3各一件(共3件)。
				(2).部分免单商品会因为地区不同而产生额外邮费，您可以继续支付邮费下单，也可以更换其他免单商品下单。
				(3).挑选好免单商品后，确认下单即消耗当月免单次数，免单商品不支持退换。
			</text>
			</view>
			<view class="epBox">
			<view class="epf">
				会员等级说明：
			</view>
			<text>
				(1).本月充值10元-200元：升级LV1会员3个月，如果已经是LV1及以上会员，则LV1会员权益延长3个月。
				(2).本月充值200元-600元：升级LV2会员3个月，如果已经是LV2及以上会员，则LV2会员权益延长3个月。
				(3).本月充值10元-200元：升级LV1会员3个月，如果已经是LV3会员，则LV3会员权益延长3个月。
			</text>
			</view>
		</view>
	</view>
	
	
</template>
<script>
	export default{
		data() {
			return {
				
			};
		},
		methods:{
		   // 跳转到商品列表
			navToClassifyList(sid){
				uni.navigateTo({
					url: `/pages/product/list?sid=`+sid
				})
			}
		}
		
	}
</script>
<style lang="scss">
	page{
		background: #f5f5f5;
	}
	.explain{
		width: 85%;
		margin: 10% auto;
		.epBox{
			margin-bottom:5%;
			.epf{
				color: $font-color-base;
				font-size: $font-base;
			}
			text{
				color:$font-color-light;
				font-size:$font-sm;
			}
		}
		
	}
	.classify-item{
		width: 750upx;
		height: 280upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		margin-top:30upx;
		border-radius: 16upx 16upx 16upx 16upx;
		background-color: #FFFFFF;
		/* box-shadow: 5upx 5upx 5upx 5upx #e8e8e8; */
		.classify-image{
			height: 100%;
			width: 100%;
		}
	}
	
</style>
