import Vue from 'vue'
import store from '@/store/index.js'
import App from './App'
Vue.prototype.$unishow = "http://ltkhou.chaojiniu.top/api/index";
// 后端api地址
//Vue.prototype.$unishow = "http://unishop:8888/addons/unishop";
// Vue.prototype.$unishow = "http://192.168.0.101/addons/unishop";

// 为了方便每次上传的时候忘记修改上面的参数
uni.getSystemInfo({
	success(res) {
		console.log(res.platform)
		if (res.platform != "devtools") {
			// Vue.prototype.$unishow = "http://192.168.0.100/addons/unishop";

			//return;
			Vue.prototype.$unishow = "http://ltkhou.chaojiniu.top/api/index";
		}
	}
});
// 平台号

// #ifdef H5
Vue.prototype.$platform = 'H5';
// #endif



//sleep方法
const sleep = (numberMillis) => {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}
// 提示
const msg = (title, duration = 3000, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
	setTimeout(function() {
		uni.hideToast();
	}, duration)
}

// 返回上一页
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

// 检查有没有登录
const checkLogin = () => {
	return new Promise(resolve => {
		if (Vue.prototype.$store.state.hasLogin == false) {
			uni.showModal({
				title: '温馨提示',
				content: '你还没，请先登录',
				success(res) {
					if (res.confirm) {
						// 账户秘密登录
						let url = '/pages/public/login';
						uni.navigateTo({
							url: url
						});
					}
					resolve(false);
				}
			})
		} else {
			resolve(true);
		}
	});
}
//任何组件在跳转xx页面时调用此方法，判断token，false就跳转到login页面，并携带xx页面路径。
//登录成功后重新跳转回xx页面
Vue.prototype.$href=function(data,type=1){
	if(uni.getStorageSync("token")){
		if(type==1){
			uni.navigateTo({
				url:data
			})
		}
		if(type==2){
			uni.switchTab({
				url:data
			})
		}
		
	}else{
		uni.navigateTo({
			url:`/pages/public/login`
		})
	}
}
// 深拷贝
const deepCopy = (obj)=> {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是一个对象
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    // 遍历obj,并且判断是obj的属性才拷贝
    if (obj.hasOwnProperty(key)) {
      // 判断属性值的类型，如果是对象递归调用深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

// 同步网络请求
const request = async (url, method = 'GET', data = {}, showMsg = true) => {	
	let token=uni.getStorageSync('token');
	let header = {
		'content-type': 'application/x-www-form-urlencoded',
		'platform': Vue.prototype.$platform,
		'token':token
	};
	
	var [error, res] = await uni.request({
		url: Vue.prototype.$unishow + url,
		method: method,
		header: header,
		data: data,
		timeout: 5000,
	});
	if (url == '/submit') {
		console.log(res);
	}
	return new Promise(function(revolve) {
		if (error) {
			showMsg && msg(JSON.stringify(res));
			revolve(false);
		}

		if (res) {
			if (res.header.hasOwnProperty('Set-Cookie')) {
				let cookie = res.header['Set-Cookie'].replace("; path=/", "");
				Vue.prototype.$store.commit('setCookie', cookie);
			}
			if (res.hasOwnProperty('data')) {
				if (res.data.hasOwnProperty('code') && res.data.code == 401) {
					// 未登录 或 登录失效
					Vue.prototype.$store.commit('logout');
				}
				if (res.data.hasOwnProperty('code') && res.data.code == 1) {
					if (res.data.msg) {
						showMsg && msg(res.data.msg);
					} else {
						uni.hideToast();
					}

					revolve(res.data.data);
				} else {
					if (res.data.hasOwnProperty('msg')) {
						showMsg && msg(res.data.msg);
					} else {
						showMsg && msg('返回参数错误');
					}
					revolve(false);
				}
			} else {
				showMsg && msg('不能识别数据');
				revolve(false);
			}
		}
	});

}

// 跳转判断是否登录
const navTo = (url, check = true) => {
	if (check && !Vue.prototype.$store.state.hasLogin) {
		url = '/pages/public/login';
	}
	uni.navigateTo({
		url: url
	});
}

Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	prePage,
	checkLogin,
	request,
	deepCopy,
	navTo,
	sleep
};



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
