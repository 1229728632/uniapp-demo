<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" style="center" v-model="keywords" type="text" placeholder="寻找商品" confirm-type="search" @confirm="search()"/>
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" data-current="0" v-for="(item,index) in cateTitle" :key="index">
					<text class="uni-tab-item-title" :class="{'uni-tab-item-title-active':index==num}" @click="changeCatList(item.id,index)">
						{{item.catename}}
					</text>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="Swiper2">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<!-- <swiper-item>
					<view class="swiper-item">
						<image src="../../static/index/swiper.jpg" mode=""></image>
					</view>
				</swiper-item> -->
				<swiper-item v-for="(item,index) in banner" :key="item.id">
					<view class="swiper-item">
						<image :src="item.img" mode="aspectFill"></image>
					</view>
				</swiper-item>
				<!-- <swiper-item>
					<view class="swiper-item">
						<image src="../../static/index/swiper.jpg" mode=""></image>
					</view> 
				</swiper-item>
 -->
			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="toClassify()">
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">02</label>
					<view class="maohao">:</view>
					<label class="LimitTime">16</label>
					<view class="maohao">:</view>
					<label class="LimitTime">45</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" :class="activeIndex==0?'active_tag_list':''" @click="changeGoods(0)">
					<label for="">热门推荐</label>
				</view>
				<view class="tag_list" :class="activeIndex==1?'active_tag_list':''" @click="changeGoods(1)">
					<label for="">最新好货</label>
				</view>
				<view class="tag_list" :class="activeIndex==2?'active_tag_list':''" @click="changeGoods(2)">
					<label for="">综合排序</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="(item,index) in indexgoods[activeIndex].content" :key="item.id" @click="toDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售{{item.market_price}}件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCate,
		getBanner,
		getIndexGoods,
	} from "../../utils/api.js";
	
	import {
		baseUrl
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				cateTitle: [], //首页快速分类导航
				num: 0,
				banner: [], //轮播图列表
				indexgoods:[] ,//获取商品信息
				activeIndex:0,
				keywords:""
			}
		},
		methods: {
			//点击切换
			changeCatList(id,index) {
				this.num = index;
				uni.navigateTo({
					url:"/pages/product/product?fid="+id
				})
			},
			changeGoods(index){
				this.activeIndex = index
			},
			//去详情
			toDetail(id){
				console.log(id)
				uni.navigateTo({
					url:"/pages/details/details?id="+id
				})
			},
			//去全部分类信息
			toClassify(){
				uni.navigateTo({
					url:"/pages/classify/classify"
				})			
			},
			//搜索
			search(){
				let keywords = this.keywords;
				// console.log(keywords)
				uni.navigateTo({
					url:"/pages/search/search?keywords="+keywords
				})
			}
		},
		async onLoad() {
			//首页快速分类导航
			console.log(baseUrl)
			var resultCatList = await getCate();
			this.cateTitle = resultCatList.data.list;
			console.log(this.cateTitle)

			//获取轮播图
			var resultBannerList = await getBanner();
			// console.log(resultBannerList)
			var banners = resultBannerList.data.list;
			banners.forEach(item => {
				item.img = baseUrl + item.img
				console.log(item.img)
			})
			this.banner = banners;
			
			//获取商品信息
			var resultIndexGoods = await getIndexGoods();
			console.log(resultIndexGoods);
			var lists = resultIndexGoods.data.list;
			console.log(lists)
			//给图片添加域名地址
			lists.forEach(item=>{
				item.content.forEach(item1=>{
					item1.img = baseUrl+item1.img
				})
			})
			this.indexgoods = lists
			
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
