<template>
	<view class="content">
		<ali :state="alidata2.state" :datas="alidata2.data" :ways="alidata2.information"></ali>
	</view>
</template>

<script>
import ali from '../../components/WuLiu-step.vue';
export default {
	components: {
		ali
	},
	data() {
		return {
			alidata2: {
				state: 3,
				uptime: '2019-05-24 10:58:24',
				data: [],
				information: {
					no: '70939995911523',
					sName: 'HTKY',
					expName: '百世快递(原汇通)',
					url: 'http:www.htky365.com',
					tel: '021-62963636',
					//img: 'https:oss-cn2.apistore.cnexpHTKY.png'
				}
			}
		};
	},
	onLoad(options) {
		this.init(options);
	},
	methods: {
		async init(options) {
			//console.log(options);
			let data = await this.$api.request('/order/kd?order='+options.order);
			this.alidata2={
				state: 3,
				uptime: '2019-05-24 10:58:24',
				data: data,
				information: {
					no: '70939995911523',
					sName: 'HTKY',
					expName: '百世快递(原汇通)',
					url: 'http:www.6.com',
					tel: '021-62963636',
					//img: 'https:oss-cn2.apistore.cnexpHTKY.png'
				}
			
			}
			//console.log(data);
		}
	}
};
</script>

<style>
.content {
}
</style>
