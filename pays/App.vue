<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import Vue from 'vue'
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login', 'logout', 'setUserinfo']),
			// #ifdef H5
			// 检查登录状态
			async checkLogin() {
				let user = uni.getStorageSync('userinfo')||'';
				if (user.id) {
					uni.getStorage({
						key:"userinfo",
						success:(res)=> {
							this.login(res.data);
						}
					})
				}
				// let result = await this.$api.request('/login');
				// if (!result) {
				// 	// 若没有登录则清空个人信息
				// 	this.logout();
				// }
			},
			// #endif
		},
		onLaunch: function() {
			// 检查用户登录情况
			// #ifdef H5
			// this.checkLogin();
			// #endif
			
		},
		onShow: function() {
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
@import url("./static/fonts/iconfont.css");
</style>
