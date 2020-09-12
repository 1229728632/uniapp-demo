<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12"/>
		</view>
		<view class="row">
			<view class="send">
				<text @click="send">{{isShow?info:num}}</text>
			</view>
			<input type="text" v-model="code"  placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button v-if="phone==='' || code === '' "  disabled  type="default" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="goLogin">登录</button>
			
			<button v-else type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="goLogin">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;" >通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {getLogin,sms} from "../../utils/api.js";
	export default{
		data(){
			return {
				phone:'',//手机号
				code:'', //用户输入的验证码,
				isShow:true,
				info:"获取验证码",
				num:60
		 }
	},
	methods:{
		async send(){
			this.isShow = false;
			var tiemr = setInterval(()=>{
				this.num--;
				if(this.num <= 0){
					this.isShow = true;
					clearInterval(tiemr);
				}
			},1000);
			var result = await sms(this.phone);
			// console.log(result)
			//把验证码存放到缓存
			var code = result.data.list.code;
			console.log(code);
			wx.setStorageSync("code",code);
		},
		async goLogin(){
			var code = this.code;
			var codeStorage = wx.getStorageSync('code');
			if(code==codeStorage){
				//执行登录
				var result = await getLogin({"phone":this.phone});
				// 获取token,uid等信息,存入到缓存
				var userInfo = result.data.list;
				wx.setStorageSync('userInfo',userInfo);
				//跳转到我的页面
				wx.reLaunch({
					url:"/pages/mine/mine"
				});
				wx.showToast({
					title:"登录成功"
				})
			}else{
				wx.showToast({
					title:"验证码不正确",
					icon:'none'
				});
			}
		}
	},
}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		/* display: flex;
		justify-content: space-between; */
		text-align: right;
		
	}
	.send text{
		font-size: 40rpx;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		float: right;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
	
	
</style>
