// pages/home/home.js
import {getMultidata ,getGoodsdata} from '../../network/home'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    banner:[],
    // 推荐数据
    recommends:[],
    // tab-control数据
    titles:["流行","新款","精选"],
    // 商品数据
    goods:{
      'new':{
        page:0,
        list:[]
      },
      'pop':{
        page:0,
        list:[]
      },
      'sell':{
        page:0,
        list:[]
      }
    },
    // 请求商品数据类型
    currentType:'pop'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图的数据
    this._getMultidata();
    // 请求商品的数据
    this._getGoodsdata('pop');
    this._getGoodsdata('new');
    this._getGoodsdata('sell');
  },
  // 初始化页面数据的获取
  _getMultidata:function(){
    getMultidata()
    .then(res=>{
      const banners=res.data.data.banner.list;
      const recommends= res.data.data.recommend.list;
      this.setData({
        banner:banners,
        recommends:recommends
      })
    })
  },
  _getGoodsdata:function(type){
    // 页码
    const page=this.data.goods[type].page+1;
    getGoodsdata(type,page)
    .then(res=>{
      const list =res.data.data.list;
      const oldList=this.data.goods[type].list;
      oldList.push(...list);
      const typeKey=`goods.${type}.list`;
      const typePage= `goods.${type}.page`
      this.setData({
        [typeKey]:oldList,
        [typePage]:page
      })
      console.log(this.data.goods)
    })
  },
  // tab-control点击事件
  handleTabClick(event){
    let index=event.detail.index;
    switch (index){
      case 0:
        this.setData({
          currentType:"pop"
        })
        break
      case 1:
        this.setData({
          currentType:"new"
        })
        break
      case 2:
        this.setData({
          currentType:"sell"
        })
        break
      }
      
  }
})