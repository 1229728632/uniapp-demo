import {request} from "./request.js";

//首页快速分类导航
async function getCate(){
	return await request("/api/getcate")
}

//一级分类下的全部商品
async function getCateGoods(fid){
	return await request("/api/getcategoods",{fid})
}

async function getCates(){
	return await request("/api/getcates")
}

//获取轮播图
async function getBanner(){
	return await request("/api/getbanner")
}

//获取商品信息
async function getIndexGoods(){
	return await request("/api/getindexgoods")
}

//获取一个商品信息
async function getGoodsInfo(id){
	return await request("/api/getgoodsinfo",{id})
}

//添加购物车
async function cartAdd(uid,goodsid,num,token){
	return await request("/api/cartadd",{uid,goodsid,num},"GET",{
		authorization:token
	})
}

//购物车列表
async function cartList(uid,token){
	return await request("/api/cartlist",{uid},"GET",{
		authorization:token
	})
}

//购车修改
async function cartEdit(id,num,checked,token){
	return await request("/api/cartedit",{id,num,checked},"GET",{
		authorization:token
	})
} 

//购物车删除
async function cartDelete(id,token){
	return await request("/api/cartdelete",{id},"GET",{
		authorization:token
	})
}

//订单添加
/* 
		@params '{uid:1111,username:"李四",...}'
		@idstr '123'
		@token 缓存中读取的token
 */
async function orderAdd(params,idstr,token){
	return await request("/api/orderadd",{params:params,idstr:idstr},"GET",{
		authorization:token
	})
}

//like模糊搜索
 async function search(keywords){
	 return await request("/api/search",{keywords})
 }

//登录
async function getLogin(){
	return await request("/api/wxlogin")
}

//发送验证码
async function sms(phone){
	return await request("/api/sms",{phone})
}
export {
	getCate,
	getCateGoods,
	getCates,
	getBanner,
	getIndexGoods,
	getGoodsInfo,
	cartAdd,
	cartList,
	cartEdit,
	cartDelete,
	orderAdd,
	getLogin,
	search,
	sms
}