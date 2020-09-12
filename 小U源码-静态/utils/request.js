const baseUrl = "http://localhost:3000";

function request(url="",data={},methods="GET",header={}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+url,
			data:data,
			methods:methods,
			header:header,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}

//导出
export {
	baseUrl,
	request
}
