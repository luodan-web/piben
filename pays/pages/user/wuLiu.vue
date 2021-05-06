<template>
	<view class="ali">
		<view class="ali_top borders" v-for="(item, index) in wuliu" :key="index">
			<view class="a13">
				<view class="a15">
					<text >{{item.time}}</text>
				</view>
				<text class="a14">{{item.step}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wuliu:[]
			}
		},
		onLoad() {
			this.sure()
		},
		methods: {
			// 查询物流
			async sure() {
				this.wuliu = await this.$api.request("/wuliu");
				console.log(this.wuliu);
			},
		},
	}
</script>

<style>
	.isOk {
		background-color: #F0AD4E !important;
	}
	.order{
		padding: 30upx 30upx;
	}
	.confirm-btn {
		height: 76upx;
		line-height: 76upx;
		/* border-radius: 50px; */
		margin: 20upx 30upx;
		background-color: #f75a32;
		color: #FFFFFF;
		font-size: $font-lg;
	}
	.a14{
		font-size: 24upx;
	}
	.a13{
		margin: 30upx 30upx;
	}
	.a15{
		font-size: 28upx;
		color:  #f75a32;
	}
</style>
