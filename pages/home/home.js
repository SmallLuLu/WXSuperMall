// pages/home/home.js
import {getMultidata} from '../../network/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    recommends:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMultidata()
  },
  _getMultidata:function(){
    getMultidata()
    .then(res=>{
      console.log(res)
      const banners=res.data.data.banner.list;
      const recommends= res.data.data.recommend.list;
      this.setData({
        banner:banners,
        recommends:recommends
      })
    })
  }
})