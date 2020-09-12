<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in list" :key="item.id">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @change="changeChecked($event,index)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="reduce(index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(index)">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel" id="demo2" @click="detail(index)"><label for="">删除</label></view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAllCheck" @click="doAllCheck()"/>
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{total}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3">
				<!-- 被选中的商品的个数 -->
				<label @click="toConfirm()">去结算</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cartList,
		cartEdit,
		cartDelete
	} from "../../utils/api.js";

	import {
		baseUrl
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				list: [], //购物车列表,
			}
		},
		methods: {
			//商品数量减少
			async reduce(index) {
				this.list[index].num--;
				//与数据库字段保持一致
				if (this.list[index].checked == true) {
					this.list[index].checked = 1
				} else {
					this.list[index].checked = 0
				}
				const {
					id,
					num,
					checked
				} = this.list[index];
				// console.log(checked)
				const {
					token
				} = uni.getStorageSync("userInfo");
				
				//界值判断
				if (this.list[index].num <= 1) {
					this.list[index].num = 1 ;
					uni.showToast({
						title:"亲,不能再少了...",
						icon:"none"
					});
					return;
				}
				//数据库添加
				var result = await cartEdit(id, num, checked, token);
				console.log(result)
			},
			async add(index) {
				this.list[index].num++;
				//与数据库字段保持一致
				if (this.list[index].checked == true) {
					this.list[index].checked = 1
				} else {
					this.list[index].checked = 0
				}
				const {
					id,
					num,
					checked
				} = this.list[index];
				console.log(checked)
				const {
					token
				} = uni.getStorageSync("userInfo");
				//界值判断
				if (this.list[index].num > 20) {
					this.list[index].num = 20;
					uni.showToast({
						title:"亲,已经是最大限度了!",
						icon:"none"
					});
					return;
				}
				// 修改数据库
				var result = await cartEdit(id, num, checked, token);
				console.log(result)
			},
			//删除
			async detail(index){
				//删除数据库中的值
				let {id} = this.list[index];
				const {token} = uni.getStorageSync("userInfo");
				var result = await cartDelete(id,token);
				//删除页面
				this.list.splice(index,1);
			},
			//单选
			async changeChecked(e, index) {
				var value = e.detail.value;
				this.list[index].checked = value;
				//与数据库字段保持一致
				if (this.list[index].checked == true) {
					this.list[index].checked = 1
				} else {
					this.list[index].checked = 0
				}
				const {
					id,
					num,
					checked
				} = this.list[index];
				console.log(checked)
				const {
					token
				} = uni.getStorageSync("userInfo");
				var result = await cartEdit(id, num, checked, token);
				console.log(result)
			},
			//点击全选
			doAllCheck(){
				this.isAllCheck = !this.isAllCheck;
			},
			
			//去结算
			toConfirm(){
				//跳转确认页
				var result = this.list.filter(item=>{
					return item.checked == true;
				})
				// console.log(result)
				uni.setStorageSync("order",result);
				uni.navigateTo({
					url:"/pages/confirm/confirm"
				})
			}
		},
		computed: {
			//计算总价
			total() {
				var sum = 0;
				this.list.forEach(item => {
					if (item.checked) {
						sum += item.price * item.num
					}
				})
				return sum
			},
			//全选
			isAllCheck :{
				get: function() {
					return this.list.every(item => {
						return item.checked == true
					});
				},
				set: function(val) {
					//把每个商品的checked状态和全选保持一致
					this.list.forEach(item=>{
						// console.log(item)
						 item.checked = val;
					})
				}
			},
		},
		async onShow(){
			let { 
				uid,
				token
			} = uni.getStorageSync("userInfo")
			var result = await cartList(uid, token);
			console.log(result);
			var list = result.data.list
			if (list==null) {
				return;
			}else{
			list.forEach(item => {
				item.checked = item.checked == 1 ? true : false;
				if (item.img != '') {
					item.img = baseUrl + item.img
				}else{
					return;
				}
			})
		}
		this.list = list;
	}
};
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
