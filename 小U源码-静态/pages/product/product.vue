<template>
	<view>
		<view class="list" v-for="(item,index) in list" :key="item.id">
			<view class="row">
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>原价￥{{item.market_price}}</text>
					<text>现价￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-if="list.length==0">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {
		getCateGoods
	} from "../../utils/api.js";
	import {
		baseUrl
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {

		},
		async onLoad(options) {
			// console.log(options)
			let {
				fid
			} = options;
			// console.log(fid)
			//直接获取当前类别下的所有商品
			var result = await getCateGoods(fid);
			// console.log(result)
			var list = result.data.list;
			// console.log(list)
			if (list==null) {
				return;
			}else{
				list.forEach(item => {
					// console.log(item)
					if (item.img != '') {
						item.img = baseUrl + item.img
					} else {
						return;
					}
				})
			}
			this.list = list
			console.log(this.list)
		}
	}
</script>

<style>
	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 160rpx;
	}

	.info {
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
