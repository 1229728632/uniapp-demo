<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="activeIndex==index?'activeList':''"  v-for="(item,index) in list" :key="item.id" @click="menuClick(index)">
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="(item,index) in list[activeIndex].children" :key="item.id">
						<!-- 每个最多显示6个 -->
						<view >
							<image :src="item.img">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {getCates} from "../../utils/api.js";
	import {baseUrl} from "../../utils/request.js" 
	export default{
		data(){
			return{
				list:[],   //左边导航
				activeIndex:0 ,//动态样式
			}
		},
		methods:{
			menuClick(index){
				this.activeIndex = index;
			}
		},
		async onLoad(){
			var result =await getCates();
			console.log(result)
			var list = result.data.list;
			list.forEach(item=>{
				if(item.children != undefined){
					item.children.forEach(item1=>{
						item1.img = baseUrl + item1.img
					})
				}
			})
			this.list = list
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
