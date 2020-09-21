let baseURL="http://152.136.185.210:8000/api/z8";
function ajax(option){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL+option.url,
      method:option.method || 'get',
      data:option.data || {},
      success:function(res){
        resolve(res)
      },
      fail:reject
    })
  })
}
export default ajax;