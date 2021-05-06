<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<view class="mp-search">
			<!-- #ifdef H5 -->
			<view class="prohibition topJuli" @ready="registerEd(1)">
				<view class="demo" @tap="registerEd(1)">
					<image src="/static/logo.png" mode=""></image>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP -->
			<view class="prohibition">
				<view class="demo" :style="'height:' +  demo.height + 'upx;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
					<image src="/static/logo.png" mode=""></image>
				</view>
			</view>
			<!-- #endif -->
			<view class="mp-search-box">
				<input class="ser-input" type="text" disabled @click="navToSearchPage()" placeholder="搜索商品" />
				<view class="icons">
					<!-- #ifdef MP -->
					<view class="serviced" @click="$api.navTo('/pages/index/newHistory')">
						<span class="iconfont icon">&#xe6b2;</span>
						<text class="message">消息</text>
					</view>
					<view class="serviced">
						<button open-type="contact" class="service iconfont icon ">
							&#xe665;
						</button>
						<text class="serFont">客服</text>
					</view>
					<!-- #endif -->

					<!-- #ifdef H5 -->
					<view class="serviced" @click="classify()">
						<span class="iconfont icon iconFenlei">&#xe6ce;</span>
						<text class="message">分类</text>
					</view>
					<view class="serviced" @click="me()">
						<button open-type="contact" class="service iconfont icon ">
							&#xe61a;
						</button>
						<text class="serFont">我的</text>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<!-- #ifdef H5-->
		<view class="zhanwei2">
		</view>

		<!-- #endif -->
		<view class="zhanwei" :style="'height:' +  demo.height + 'upx;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'"></view>
		<view class="zhanwei1"></view>
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<!-- <view class="titleNview-placing"></view> -->
			<!-- 背景色区域 -->
			<view class="titleNview-background"></view>
			<swiper class="carousel" circular @change="swiperChange">
				<!-- #ifdef MP -->
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({ product_id: item.product_id })">
					<image :src="item.image" />
					<!-- <image :src="require('../../image/class4.png')" mode=""></image> -->
				</swiper-item>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToH5({url:item.url})">
					<image :src="item.image" />
				</swiper-item>
				<!-- #endif -->
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{ swiperCurrent + 1 }}</text>
				<text class="sign">/</text>
				<text class="num">{{ swiperLength }}</text>
			</view>
		</view>
		<!-- 分类 -->
		<!--
		<view class="cate-section">
			<view class="cate-item" v-for="(item, index) in menu" :key="index" @click="navToList(item.id)">
				<image :src="item.image" ></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		-->
		<!-- <view class="picture">
			<image src="/static/tupian.png" mode=""></image>
		</view> -->
		<view class="cate-section">

			<view class="cate-item" @click="navToClassify('礼包')">
				<view class="img">
					<image src="../../static/member.png" class="images"></image>
				</view>
				<text>会员免单</text>
			</view>
			<view class="cate-item" @click="navToPay('充值')">
				<view class="img">
					<image src="../../static/pay.png" class="images"></image>
				</view>
				<text>话费充值</text>
			</view>
			<view class="cate-item" @click="navToList('general_index')">
				<image src="https://img.alicdn.com/imgextra/i1/2053469401/O1CN01ejbIF22JJhyGrH6Q0_!!2053469401.png" class="img"></image>
				<text>京东手机</text>
			</view>
			<view class="cate-item" @click="navToList('女装')">

				<image src="https://img.alicdn.com/imgextra/i1/2053469401/O1CN01bsYnIW2JJi3JfJuu1_!!2053469401.png" class="img"></image>
				<text>女装</text>
			</view>
			<view class="cate-item" @click="navToList('男装')">
				<image src="https://img.alicdn.com/imgextra/i2/2053469401/O1CN01pxV5wf2JJi3HNGPTd_!!2053469401.png" class="img"></image>
				<text>男装</text>
			</view>
			<view class="cate-item" @click="navToList('鞋')">
				<image src="https://img.alicdn.com/imgextra/i1/2053469401/O1CN017pZ1OF2JJhz3aYStC_!!2053469401.png" class="img"></image>
				<text>鞋品</text>
			</view>
		</view>
		<!-- 秒杀楼层 -->
		<view class="seckill-section m-t" v-if="flashSale && flashSale.product.length > 0">
			<view class="s-header" @click="navTo('/pages/flash/list')">
				<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
				<!-- <text class="tip">{{(new Date(flashSale.starttime*1000)).getHours()}}点场</text> -->
				<text class="tip" v-if="flashSale.countdown">下一场倒计时</text>
				<text class="tip" v-else>{{flashSale.title}}</text>
				<uni-countdown ref="countd" v-if="flashSale.countdown" @timeup="timeup" :show-day="flashSale.countdown.day ? true : false"
				 :day="day" :hour="hour" :minute="minute" :second="second" color="#FFFFFF" background-color="#00B26A" border-color="#00B26A"></uni-countdown>
				<text class="yticon icon-you"></text>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in flashSale.product" :key="index" class="floor-item" @click="navToDetailPage({ product_id: item.flash_product_id }, flashSale.flash_id)">
						<image :src="item.image" mode="aspectFill"></image>
						<text class="title clamp">{{item.title }}</text>
						<text class="price">￥{{item.sales_price }}</text>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 团购楼层 -->
		<!-- <view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">精品团购</text>
				<text class="tit2">Boutique Group Buying</text>
			</view>
			<text class="yticon icon-you"></text>
		</view> -->
		<!-- <view class="group-section">
			<swiper class="g-swiper" :duration="500">
				<swiper-item class="g-swiper-item" v-for="(item, index) in goodsList" :key="index" v-if="index % 2 === 0" @click="navToDetailPage(item)">
					<view class="g-item left">
						<image :src="item.image" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp">{{ item.title }}</text>
							<view class="price-box">
								<text class="price">￥{{ item.price }}</text>
								<text class="m-price">￥188</text>
							</view>

							<view class="pro-box">
								<view class="progress-box"><progress percent="72" activeColor="#fa436a" active stroke-width="6" /></view>
								<text>6人成团</text>
							</view>
						</view>
					</view>
					<view class="g-item right">
						<image :src="goodsList[index + 1].image" mode="aspectFill"></image>
						<view class="t-box">
							<text class="title clamp">{{ goodsList[index + 1].title }}</text>
							<view class="price-box">
								<text class="price">￥{{ goodsList[index + 1].price }}</text>
								<text class="m-price">￥188</text>
							</view>
							<view class="pro-box">
								<view class="progress-box"><progress percent="72" activeColor="#fa436a" active stroke-width="6" /></view>
								<text>10人成团</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view> -->

		<!-- 分类推荐楼层 -->
		<!-- <view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">分类精选</text>
				<text class="tit2">Competitive Products For You</text>
			</view>
			<text class="yticon icon-you"></text>
		</view> -->
		<!-- <view class="hot-floor">
			<view class="floor-img-box">
				<image
					class="floor-img"
					src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409398864&di=4a12763adccf229133fb85193b7cc08f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F19%2F20170319150032_MNwmn.jpeg"
					mode="scaleToFill"
				></image>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item" @click="navToDetailPage(item)">
						<image :src="item.image" mode="aspectFill"></image>
						<text class="title clamp">{{ item.title }}</text>
						<text class="price">￥{{ item.price }}</text>
					</view>
					<view class="more"> 
						<text>查看全部</text>
						<text>More+</text>
					</view>
				</view>
			</scroll-view>
		</view> -->
		<!-- <view class="hot-floor">
			<view class="floor-img-box">
				<image
					class="floor-img"
					src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409984228&di=dee176242038c2d545b7690b303d65ea&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5ef4da9f17faaf4612f0d5046f4161e556e9bbcfdb5b-rHjf00_fw658"
					mode="scaleToFill"
				></image>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item" @click="navToDetailPage(item)">
						<image :src="item.image3" mode="aspectFill"></image>
						<text class="title clamp">{{ item.title }}</text>
						<text class="price">￥{{ item.price }}</text>
					</view>
					<view class="more">
						<text>查看全部</text>
						<text>More+</text>
					</view>
				</view>
			</scroll-view>
		</view> -->
		<!-- <view class="hot-floor">
			<view class="floor-img-box">
				<image
					class="floor-img"
					src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409794730&di=12b840ec4f5748ef06880b85ff63e34e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dc03589ed568a8012060c82ac03c.jpg%40900w_1l_2o_100sh.jpg"
					mode="scaleToFill"
				></image>
			</view>
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item" @click="navToDetailPage(item)">
						<image :src="item.image2" mode="aspectFill"></image>
						<text class="title clamp">{{ item.title }}</text>
						<text class="price">￥{{ item.price }}</text>
					</view>
					<view class="more">
						<text>查看全部</text>
						<text>More+</text>
					</view>
				</view>
			</scroll-view>
		</view> -->

		<!-- 猜你喜欢 -->

		<view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">商品列表</text>
				<text class="tit2">Guess You Like It</text>
			</view>
			<text class="yticon icon-you"></text>
		</view>

		<view class="guess-section">
			<view v-for="(item, index) in goodsList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{ item.title }}</text>
				<text class="price"><text class="symbol">￥</text> {{ item.sales_price }} <text class="sales"> {{' '+item.sales}}人付款</text></text>
			</view>
		</view>
	</view>
</template>
<script>
	// #ifdef H5
	var script = document.createElement('script');
	script.src = "https://huajuanyun-statics.oss-cn-hangzhou.aliyuncs.com/api/apilink-native.min.js?v1.0";
	document.body.appendChild(script);
	console.log(document.body.appendChild(script));
	import {
		mapMutations
	} from 'vuex';
	// #endif
	// var _self = this;
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
	export default {
		components: {
			uniCountdown
		},
		data() {
			return {
				// titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				menu: [],
				flashSale: '',
				page: 1,
				pageSize: 16,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				demo: {
					top: 0,
					height: 0
				}
			};
		},
		computed: {},
		created() {
			this.registerEd();
		},
		onLoad() {
			// #ifdef MP
			//先判断是否登录用户
			let user = uni.getStorageSync('userInfo');
			let token = uni.getStorageSync('token');
			if (user) {} else {
				//用户未登录
				//找对接用户身份token
				if (!options.token) { //没有身份识别token
					if (!token) { //本地没有储存身份token
						uni.setStorage({
							key: 'token',
							data: '666666'
						});
					}
				} else { //带了token
					uni.setStorage({
						key: 'token',
						data: options.token
					});
				}
			}

			// #endif
			this.loadData();
			// #ifdef H5
			this.registerEd();
			// #endif
		},
		onReachBottom() {
			this.getProduct();
		},
		onPullDownRefresh() {
			if (this.$refs && this.$refs.countd) {
				this.$refs.countd.syncFlag = false;
			}
			this.goodsList = [];
			this.page = 1;
			this.loadData();
		},
		onShareAppMessage(e) {},
		//#ifdef MP
		// 自定义顶部
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.demo.top = demo.top
			this.demo.height = demo.height
		},
		// #endif
		methods: {
			// #ifdef H5
			...mapMutations(['login']),
			// 获取用户的电话
			mobiled() {
				getH5UserInfo().then((res) => {
					let mobiles = JSON.parse(res).mobile;
					uni.setStorage({
						key: "mobile",
						data: mobiles
					});
				});
			},
			// 登录注册	
			async registerEd() {
				this.mobiled();
				this.$api.sleep(1000);
				let phoneMobile = uni.getStorageSync("mobile");
				console.log(phoneMobile);
				if (phoneMobile !== '') {
					this.register = await this.$api.request('/user/register1', 'POST', {
						mobile: phoneMobile,
						password: '666666',
						username: phoneMobile,
					});
					if (this.register.data == null) {
						let data = await this.$api.request('/user/login', 'POST', {
							mobile: phoneMobile,
							password: '666666',
						});
						if (data) {
							this.$store.commit('login', data)
							this.logining = true;
						} else {
							this.logining = false;
						};
						uni.setStorage({
							key: "userinfo",
							data: data
						});
					};
				}
			},
			classify() {
				uni.navigateTo({
					url: "/pages/category/category"
				})
			},
			me() {
				this.registerEd();
				uni.navigateTo({
					url: "/pages/user/user"
				})

			},
			// #endif
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			loadData() {
				let that = this;
				let token = uni.getStorageSync('token');
				if (!token) {
					token = '666666';
				}
				//获取广告图
				uni.request({
					url: that.$unishow + '/ads/index?token=' + token,
					success(res) {
						let carouselList = res.data.data;
						// that.titleNViewBackground = carouselList[0].background;
						that.swiperLength = carouselList.length;
						that.carouselList = carouselList;
					}
				});
				//获取菜单栏
				uni.request({
					url: that.$unishow + '/category/menu',
					success(res) {
						that.menu = res.data.data;
					}
				});
				uni.stopPullDownRefresh();
				this.getFlash();
				this.getProduct();
			},
			// 获取产品列表
			async getProduct() {
				this.$api.msg('加载中..', 20000);
				let goodsList = await this.$api.request('/product/lists', 'GET', {
					page: this.page,
					pagesize: this.pageSize,
					index: 'index'
				});
				if (goodsList) {
					if (goodsList.length > 0) {
						goodsList.forEach(item => {
							this.goodsList.push(item);
						});
						this.page++;
					} else {
						this.$api.msg('没有更多数据');
					}
				}
			},
			// 获取限时秒杀数据
			async getFlash() {
				this.$api.msg('加载中..', 20000);
				let data = await this.$api.request('/flash/index');
				if (data) {
					this.flashSale = data;
					this.day = data.countdown.day;
					this.hour = data.countdown.hour;
					this.minute = data.countdown.minute;
					this.second = data.countdown.second;
					//this.$refs.countd.update();
				}
				//console.log(this.$refs)
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			// 商品详情页
			navToDetailPage(item, flash_id = 0) {
				let id = item.product_id;
				if (id < 10000) {
					return;
				}
				console.log(id);
				uni.navigateTo({
					url: `/pages/product/product?id=${id}&flash=${flash_id}`
				});
			},
			// h5跳转
			navToH5(item) {

				if (item.url) {
					//console.log(item.url);
					this.navTo('/pages/public/webview?type=url&url=' + item.url);
					// uni.web-view({
					// 	src:item.url
					// });
					// uni.navigateTo({
					// 	url: item.url
					// });
				}

			},

			// 商品搜索页
			navToSearchPage() {
				uni.navigateTo({
					url: `/pages/product/search`
				});
			},
			/**
			 * 秒杀倒计时为0时再请求一次接口
			 */
			timeup() {
				this.getFlash();
			},
			// 跳转页面
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			// 跳转礼包分类的页面
			navToClassify() {
				uni.navigateTo({
					url: `/pages/product/classify`
				});
			},
			// 充值页面的跳转
			navToPay() {
				uni.navigateTo({
					url: `/pages/money/payType`
				});
			},
			// 跳转到商品列表
			navToList(fid) {
				uni.navigateTo({
					url: `/pages/product/list?kwd=${fid}`
				});
			}

		},
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			//this.$api.msg('点击了ss');
			uni.navigateTo({
				url: '/pages/product/search'
			});
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			return;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				});
			}
		},


	};
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.zhanwei2 {
		height: 30upx;
		width: 100%;
		background-color: #fa436a;
	}

	.topJuli {
		margin-top: 30upx;
	}

	.demo {
		position: fixed;
		z-index: 9999;
		position: relative;
		display: flex;
		align-items: center;
		background: #fa436a;

		image {
			width: 32%;
			height: 55upx;
			margin-left: 3%;
		}
	}

	.mp-search {
		position: fixed;
		z-index: 9999;
		background-color: #fa436a;
		width: 100%;
		padding-bottom: 10upx;

		// image {
		// 	position: sticky;
		// 	position: relative;
		// 	margin-left: 3%;
		// 	margin-top: 10%;
		// 	left: 0;
		// 	top: 0;
		// 	
		// }

		.mp-search-box {
			display: flex;
			justify-content: space-around;
			padding: 15upx 10upx 0 50upx;
			background-color: #fa436a;

			.ser-input {
				width: 70%;
				height: 56upx;
				line-height: 56upx;
				font-size: 28upx;
				text-align: center;
				border-radius: 20px;
				background: url("/static/icon_search.png") no-repeat 13px center/16px #ffdbe3;
			}

			.icons {
				display: flex;

				button::after {
					border: none;
				}

				.icon {
					height: 40upx;
					color: #FFFFFF;
					line-height: 40upx;
					font-size: 35upx;
				}

				.iconFenlei {
					font-size: 45upx !important;
					font-weight: 600;
				}

				.serviced {
					display: flex;
					flex-direction: column;

					.service {
						height: 40upx;
						background-color: #fa436a;
						text-align: center;
						line-height: 40upx;
						font-size: 45upx;
					}

					text {
						color: #FFFFFF;
						font-size: 18upx;
						text-align: center;
					}
				}
			}
		}
	}

	// page {
	// 	.cate-section {
	// 		position: relative;
	// 		z-index: 5;
	// 		border-radius: 16upx 16upx 0 0;
	// 		// margin-top: -20upx;
	// 	}

	// 	.carousel-section {
	// 		padding: 0;

	// 		// padding-top: 100;
	// 		.titleNview-placing {
	// 			padding-top: 0;
	// 			height: 0;
	// 		}

	// 		.carousel {
	// 			.carousel-item {

	// 				padding: 0;
	// 			}
	// 		}
	// 		.swiper-dots {
	// 			left: 45upx;
	// 			bottom: 40upx;
	// 		}
	// 	}
	// }





	// .picture{
	// 	width: 100%;
	// 	height: 80upx;
	// 	background: #FFFFFF;
	// 	image{
	// 		width: 100%;
	// 		height: 100%;
	// 		background-size: cover;
	// 	}
	// }
	.zhanwei1 {
		height: 145upx;
		width: 100%;
		background-color: #fa436a;
	}



	.m-t {
		margin-top: 16upx;
	}

	/* 滑动*/
	.scroll {
		width: 100%;
		height: 50upx;
		// background-color: rgba(231, 231, 231,.7);
		white-space: nowrap;

		.text {
			margin: 20upx;
			margin-top: 20upx;
			color: #909399;
			font-size: 26upx;
		}
	}

	/* 头部 轮播图 */
	.carousel-section {
		background-color: #FFFFFF;
		position: relative;

		// z-index: -1;
		// overflow: hidden;
		.titleNview-placing {
			height: var(--status-bar-height);
			// padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 210upx;
			transition: 0.4s;
			background: #fa436a;
			border-radius: 0 0 50% 50%;
		}
	}

	.carousel {
		width: 100%;
		height: 300upx;

		.carousel-item {
			width: 100%;
			height: 100%;

			// overflow: hidden;
			// margin-top: 10upx;
			image {
				width: 94%;
				height: 100%;
				margin-left: 3%;
				// padding: 20upx;
				border-radius: 30upx !important;
			}
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;

		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		.img {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: 0.7;

			.images {
				width: 100%;
				height: 100%;
			}

			//box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);

		}
	}

	.ad-1 {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	/* 秒杀专区 */
	.seckill-section {
		padding: 4upx 30upx 24upx;
		background: #fff;

		.s-header {
			display: flex;
			align-items: center;
			height: 92upx;
			line-height: 1;

			.s-img {
				width: 140upx;
				height: 30upx;
			}

			.tip {
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}

			.timer {
				display: inline-block;
				width: 40upx;
				height: 36upx;
				text-align: center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm + 2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0, 0, 0, 0.8);
			}

			.icon-you {
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}

		.floor-list {
			white-space: nowrap;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}
	}

	.f-header {
		display: flex;
		align-items: center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;

		image {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg + 2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}

		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
		}

		.icon-you {
			font-size: $font-lg + 2upx;
			color: $font-color-light;
		}
	}

	/* 团购楼层 */
	.group-section {
		background: #fff;

		.g-swiper {
			height: 650upx;
			padding-bottom: 30upx;
		}

		.g-swiper-item {
			width: 100%;
			padding: 0 30upx;
			display: flex;
		}

		image {
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}

		.g-item {
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.left {
			flex: 1.2;
			margin-right: 24upx;

			.t-box {
				padding-top: 20upx;
			}
		}

		.right {
			flex: 0.8;
			flex-direction: column-reverse;

			.t-box {
				padding-bottom: 20upx;
			}
		}

		.t-box {
			height: 160upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}

		.price {
			color: $uni-color-primary;
		}

		.m-price {
			font-size: $font-sm + 2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}

		.pro-box {
			display: flex;
			align-items: center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}

		.progress-box {
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}

	/* 分类推荐楼层 */
	.hot-floor {
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;

		.floor-img-box {
			width: 100%;
			height: 320upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255, 255, 255, 0.06) 30%, #f8f8f8);
			}
		}

		.floor-img {
			width: 100%;
			height: 100%;
		}

		.floor-list {
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top: -140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
			position: relative;
			z-index: 1;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}

		.more {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;

			text:first-child {
				margin-bottom: 4upx;
			}
		}
	}

	.toptop {
		height: 100upx;
	}

	/* 猜你喜欢 */
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n + 1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			.sales {
				color: #999999;
				font-size: 24upx;
			}

			.symbol {
				font-size: 24upx;
			}
		}
	}
</style>
