<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="detail.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{detail.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{detail.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="reduce()">-</label>
					<label class="zhi">{{num}}</label>
					<label class="jia" @click="add()">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view class="threed3i1" v-for="item in detail.specsattr" :key="item">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<!-- <image src="/static/detail/2.jpg" mode="aspectFill" /> -->
			<rich-text :nodes="detail.description"></rich-text>
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCard">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		getGoodsInfo,
		cartAdd
	} from "../../utils/api.js";
	import {
		baseUrl
	} from "../../utils/request.js";
	export default {
		data() {
			return {
				detail: [], //每一件商品的信息
				num:1
			}
		},
		methods: {
			//减少
			reduce() {
				this.num--;
				if(this.num <= 1){
					this.num = 1;
				}	
			},
			//增加
			add() {
				this.num ++;
				if(this.num > 10){
					this.num = 10;
				}
			},
			//添加购物车
			async addCard(){
				let {uid,token} = uni.getStorageSync("userInfo");
				// console.log(uid);return;
				let goodsid = this.$mp.query.id;
				let num = this.num;
				var results =await cartAdd(uid,goodsid,num,token);
				// console.log(results)
				uni.showToast({
					title:"添加成功"
				})
			}
		},
		async mounted() {
			//接受id
			var id = this.$mp.query.id;
			var result = await getGoodsInfo(id);
			console.log(result)
			// console.log(id)
			var detail = result.data.list[0];
			detail.img = baseUrl + detail.img;
			var specsattr = detail.specsattr;
			detail.specsattr = specsattr.split(",")
			this.detail = detail;
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
