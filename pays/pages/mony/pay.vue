<template>
	<view class="pay">
		<view class="price-box">
			<text>可以提现总金额</text>
			<text class="price">{{total||'0.00'}}</text>
		</view>
		<view class="list">
			<view class="service" @click="$api.navTo('/pages/mony/alipay')">
						<span class="iconfont iconSize">&#xe61c;</span>
						<text>前去绑定支付宝</text>
						<span class="iconfont arrows iconSize">&#xe64b;</span>
			</view>
		</view>
			
		<view class="withdraw">
			<text>提现金额</text>
			<view class="recharge-money">
				<text>￥</text>
				<input  class="recharge-input" type="text" value="" v-model="mony"/>
			</view>
		</view>
		<button  class="recharge-btn"  @click="tixian(total)">提现</button>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				total:'',
				mony:''
			}
		},
		onLoad(options) {
			this.total=options.tixian;
		},
		methods:{
			onNavigationBarButtonTap(e){
				uni.navigateTo({
					url:"/pages/mony/tixian"
				})
			},
			async tixian(total){
				if(this.mony>total){
					this.$api.msg("总金额不足")
				}else{
					let tixian=await this.$api.request('/tixian','POST',{
						money:this.mony
					})
				}
			}
		}
	}
</script>

<style lang="scss">

.price-box {
		background-color: $base-color;
		margin: 0 30upx;
		height: 265upx;
		border-radius:25upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #FFFFFF;

		.price {
			font-size: 50upx;
			color: #fff;
			margin-top: 12upx;

			&:before {
				content: '￥';
				color: #FFFFFF;
				font-size: 40upx;
			}
		}
	}
	.withdraw{
		margin: 0 30upx;
		text{
			font-size: 24upx;
		}
		.recharge-money{
			display: flex;
			padding: 10upx 24upx;
			text{
			font-size: 50upx;
			padding-top: 20upx;
			}
			input{
			 font-size: 70upx;
			 height: 20%;
			}
		}
	}
	.recharge-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #FFFFFF;
		background-color:$base-color;
		border-radius: 10upx;
	}
		.list {
			margin: 10upx 30upx;
			background: #fff;
			border-radius: 10upx;
			/* padding: ; */
			.service {
				height: 60upx;
				background-color: #FFFFFF;
				line-height: 60upx;
				color:#8d9096;
				font-size: 24upx;
				 .iconSize {
					// color: #fa8455;
					float: left;
					margin-right: 15upx;
					font-size: 42upx;
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
