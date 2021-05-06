import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
	plugins: [
		// 可以有多个持久化实例  
		createPersistedState({
			key: 'app_config_data', // 状态保存到本地的 key   
			paths: ['userinfo', 'hasLogin', 'cookie'], // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c   
			storage: { // 存储方式定义 
				getItem: (key) => uni.getStorageSync(key), // 获取  
				setItem: (key, value) => uni.setStorageSync(key, value), // 存储  
				removeItem: (key) => uni.removeStorageSync(key) // 删除  
			}
		})
	],
	state: {
		hasLogin: false,
		userinfo: {userinfo:{
			nickname:'游客',
			 level:'普通用户',
			 invitecode:'无',
			 s_code:'无', 
		}},
		 // submit:false,
	},
	mutations: {
		login(state, playload) {
			state.hasLogin = true;
			state.userinfo = playload;
			uni.setStorage({ //缓存用户信息
				key: 'userinfo',
				data: state.userinfo
			});
		},
		
		logout(state) {
			state.hasLogin = false;
			state.userinfo = {
				userinfo:{
					nickname:'游客',
					 level:'普通用户',
					 invitecode:'无',
					 s_code:'无',
					 }
			};
			uni.removeStorage({
				key: 'userinfo',
				data: state.userinfo
			})
		},
		// 修改用户名
		setUserInfo(state, playload) {
			state.userinfo .userinfo.nickname= playload;
		},
	},
	actions: {
		login(context, payload) {
		context.commit("context",playload)
		},
		login(context, payload) {
		context.commit("context")
		}
	}
})

export default store
