<template>
	<view class="">
		<view class="phoneColum">
			<view class="phoneRow">
				<view class="find">
					<view class="findLists" v-for="(item,index) in findList" :key="index">
						<view class="findList">
							<view class="findBox">
								姓名:{{item.alipayname}}
							</view>
							<view class="findBox">
								账号:{{item.alipayaccount}}
							</view>
							<view class="findBox">
								金额:￥{{item.money}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	
	export default {
	
		data() {
			return {
				findList: {},
			}
		},
		onLoad() {
			this.find();
		},
		methods: {
			async find() {
				this.findList = await this.$api.request('/tixianList');
				console.log(this.findList);
				// if (this.findList == "") {
				// 	this.$api.msg('没有查询到')
				// }
			}
		}
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

		.phoneRow {
			margin-bottom: 20upx;

			.phoneRowFont {
				font-size: 28upx;
				color: #000;
				font-weight: 700;
				padding: 20upx 0;
			}
		}
	}
	.findLists{
		margin-top: 30upx;
		.findList {
			display: flex;
			justify-content: space-between;
			font-size: 26upx;
		}
	}
	
</style>
