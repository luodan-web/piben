<template>
	<view class="">
		
		<view class="shengji" v-if="userinfo.userinfo.level===1">
			<image src="../../static/shengji1.jpg" mode=""></image>
		</view>
		<view class="shengji" v-if="userinfo.userinfo.level===2">
			<image src="../../static/shengji2.jpg" mode=""></image>
		</view>
		<view class="shengji" v-if="userinfo.userinfo.level===3">
		<image src="../../static/shengji3.jpg" mode=""></image>
		</view>
		<view class="shengji" v-if="userinfo.userinfo.level===4">
			<image src="../../static/shengji3.jpg" mode=""></image>
		</view>
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapState(['hasLogin', 'userinfo'])
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">	
		image{
			 height: 100%;
			  position: fixed;
			  width: 100%;
		
	}
</style>
