<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:悟空</label>
				<label for="">18301628393</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">花果山水帘洞27号</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">

			<view class="cartsInfo" v-for="(item,index) in confilrmList" :key="item.id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="reduce(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="add(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {orderAdd} from  "../../utils/api.js"
	export default {
		data() {
			return {
				confilrmList: [], //订单列表
				userInfo:{
					username:"张一山",
					userphone:"18220177788",
					address:"北京"
				}
			}
		},
		onLoad() {
			let list = uni.getStorageSync("order") || [];
			console.log(list)
			this.confilrmList = list
		},
		methods:{
			//商品数量增加
			add(index){
				if(this.confilrmList[index].num >= 20){
					this.confilrmList[index].num = 20;
					uni.showToast({
						title:"亲,不能再多了",
						icon:"none"
					});
					return;
				}
				this.confilrmList[index].num ++;
				 uni.setStorageSync("order",this.confilrmList)
			},
			//减少
			reduce(index){
				if(this.confilrmList[index].num <= 1){
					this.confilrmList[index].num = 1;
					uni.showToast({
						title:"亲,不能再少了",
						icon:"none"
					});
					return;
				}
				this.confilrmList[index].num --;
				 uni.setStorageSync("order",this.confilrmList)
			},
			//提交订单
			async pay(){
				let {uid,token} = uni.getStorageSync("userInfo");
				let {username,userphone,address} = this.userInfo
				let countmoney = this.allPrice;
				let countnumber = this.confilrmList.reduce((total,item)=>{
					return total += item.num 
				},0);
				let addtime = new Date().getTime();
				
				//@params
				let params = {uid,username,userphone,address,countmoney,countnumber,addtime};
				params = JSON.stringify(params);
				
				
				// @idstr
				let idArr = this.confilrmList.map(item=>{
					return item.id
				})
				let idstr = idArr.join(",")
				//调用接口
				var result = await orderAdd(params,idstr,token);
				if(result.data.code == 200){
					uni.showToast({
						title:result.data.msg
					});
				}else{
					uni.showToast({
						title:result.data.msg,
						icon:"none"
					});
				}
			}
		},
		computed:{
			//计算总价
			  allPrice(){
				return this.confilrmList.reduce((total,item)=>{
					return total += item.price * item.num;
				},0)
			}
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
