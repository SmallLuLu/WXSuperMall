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
    currentType:'pop',
    // 返回顶部
    goTop:false,
    // 商品顶部固定导航是否显示
    topIsShow:false,
    goodTabTop:0
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
  onShow(){
    
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
      
  },
  //上拉加载更多
  onReachBottom(){
    this._getGoodsdata(this.data.currentType)
  },
  // 监听也页面滚动
  // 在onPageSrcoll中尽量少调用setData
  onPageScroll(option){
    // 返回顶部按钮的显现和隐藏
    const scollTop=option.scrollTop;
    //返回顶部的flag
    const flag = scollTop>=500;
    // 商品导航栏的flag
    const flag2= scollTop>=this.data.goodTabTop;
    // 设置一个flag先让flag和固定的位置的位置比较如果为真的话再调用setData
    if(flag!=this.data.goTop){
      this.setData({
        goTop:!this.data.goTop
      })
    }
    if(flag2!=this.data.topIsShow){
      this.setData({
        topIsShow:!this.data.topIsShow
      })
    }
  },
  // 滚动到商品导航栏顶部固定
  // 子组件的热门推荐图片加载完成传递出来的方法
  recommendImgLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect=>{
      this.data.goodTabTop=rect.top
    }).exec()
  }
})