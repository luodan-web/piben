<template>
	<view class="">
		<view class="phoneColum">
			<view class="phoneRow"v-for="(item, index) in history" :key="index">
				<text class="phoneRowFont">{{item.title}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
	
		data() {
			return {
			history:''
			}
		},
		onLoad() {
		this.gonggao();
		},
		methods: {
			async gonggao() {
			this.history=await this.$api.request('/gonggaoList')
		},
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
			margin: 0 0 20upx 0;
		}

		
	}
</style>
