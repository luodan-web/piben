<template>
	<view>
		<!-- 搜索条 -->
		<view class="searchTopBox">
			<view class="searchBoxRadius">
				<!-- <view class="grace-search-icon searchBoxIcon"></view> -->
				<input class="searchBoxIpt" type="search" v-model="ipt" @confirm="searchNow($event)" placeholder="请输入关键字搜索">
				</input>
				<view @click="searchNow()" class="searchView">搜索</view>
			</view>
		</view>
		
		<!-- 大家都在搜索 -->
	      	<view class="searchBotBox">
			<view class="ov">
				<view class="fl">
					大家都在搜索
				</view>
				<!-- <view @tap="flush" class="fr grace-more-r grace-search-remove">
					<image src="/static/flush.png" mode="" ></image>
				</view> -->
			</view>
			<view class="searchHistoryBox">
				<view class="searchHistoryBoxItem" v-for="(item,index) in hotKey" :key='index' @click="hotHistory(index)">
					{{item.keyword}}
				</view>
			</view>
		</view>	 
		<!-- 搜索历史 -->
		<view class="searchBotBox">
			<view class="ov">
				<view class="fl">搜索历史</view>
				<view @tap="clearKey" class="fr">
					<image src="/static/delete.png" mode=""></image>
				</view>
			</view>
			<view class="searchHistoryBox">
				<view class="searchHistoryBoxItem" v-for="(item,index) in searchKey" :key='index' @click="searchHistory(index)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				searchKey: [],
				ipt: '',
				searchClose: true,
				hotKey:[]
			}
		},
		onLoad(){
			this.loadData();
		},
		onShow() {
			var vv = uni.getStorageSync('searchLocal');
			// console.log(vv)
			// var arr = vv.split("-");
			this.searchKey = vv;
			// 大家都在搜索
			var hot=uni.getStorageSync('hotLocal');
			// console.log(hot);
			this.hotKey=hot
			// this.loadData();
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.loadData();
		},
		methods: {
			//大家都在搜索
			async loadData(){
			let hotList= await this.$api.request('/product/hot');
			let hotKey=this.hoteList
			uni.setStorage({
				key: 'hotLocal',
				data: hotList
			});
			},
			// 大家都在搜索跳转
			hotHistory:function(index){
				let hotIndex=this.hotKey[index].keyword;
				uni.navigateTo({
					url: `/pages/product/list?kwd=${hotIndex}`
				})
			},
			
			// 清除搜索
			clearKey: function() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '点击确定将删除所有历史信息，确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.searchKey = [];
							uni.setStorage({
								key: 'searchLocal',
								data: that.searchKey
							});
						} else if (res.cancel) {
						}
					}
				});

			},
			// 历史搜索
			searchHistory:function(index){
				let historyIndex=this.searchKey[index];
				// console.log(historyIndex);
				uni.navigateTo({
					url: `/pages/product/list?kwd=${historyIndex}`
				})
			},
			searchNow: function(e) {
				if (this.ipt == '') {
					uni.showToast({
						title: '未输入搜索关键字',
						icon: 'none',
						duration: 1000
					});
					return false;
				}
				this.$api.msg('正在为您搜索：'+this.ipt);
				uni.navigateTo({
					url: `/pages/product/list?kwd=${this.ipt}`
				});
				var that = this;
				var newArr = that.searchKey;
				newArr.unshift(this.ipt);
				this.searchKey = newArr;
				// var newStr = newArr.join('-');
				var newArr1 = new Set(newArr);
				var newStr1 = Array.from(newArr1);
				console.log(newStr1);
				// var newStr = newStr1.join('-');
				uni.setStorage({
					key: 'searchLocal',
					data: newStr1
				});
			}
		}
	}
</script>
<style lang="scss">
	page {
		background: #FFF;
	}
	.ov {
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		image{
			width: 35upx;
			height: 35upx;
		}
	}
	.fl {
			font-size:$font-base;
			color:$font-color-dark ;
			font-weight: 600;
	}
	.fr {
		float: right;
	}

	.searchTopBox {
		width: 100%;
		background-color: #fefefe;
		height: 100upx;
		box-sizing: border-box;
		padding-top: 15upx;
	}

	.searchBoxRadius {
		width: 90%;
		height: 70upx;
		background-color: #f5f9fe;
		overflow: hidden;
		margin: 0 auto;
		border-radius: 50upx;
		.searchBoxIpt {
			height: 70upx;
			line-height: 70upx;
			margin-left: 20upx;
			float: left;
			width: 78%;
			background: url("/static/icon_search.png") no-repeat 10upx center/16px;
			font-size: $font-base;
			padding-left: 8%;
		}
		.searchView{
			float: right;
			text-align:center;
			width:127upx ;
			height: 70upx;
			line-height:70upx ;
			background-color:#fa436a;
			color: #FFFFFF;
			font-size: 35upx;
			line-height: 70upx;
			border-radius:100upx ;
		}
	}

	.searchBoxIcon {
		font-size: 40upx;
		margin-top: 20upx;
		margin-left: 20upx;
		float: left;
		
	}
	
	.searchBotBox {
		width: 100%;
		margin-top: 30upx;
		padding: 15upx 3%;
		box-sizing: border-box;
	}

	.searchHistoryBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 40upx;
	}

	.searchHistoryBoxItem {
		float: left;
		font-size: 26upx;
		color: #666;
		line-height: 46upx;
		height: 46upx;
		padding: 0 20upx;
		border-radius: 23upx;
		margin-left: 15upx;
		margin-bottom: 20upx;
		border: 1px solid #ccc;
	}
</style>
