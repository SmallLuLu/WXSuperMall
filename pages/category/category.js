// pages/category/category.js
import {getCategory,getSubcategory,getCategoryDetail} from '../../network/category'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧导航栏数据
    leftNav:[],
    // 左侧导航栏选中
    navListActive:0,
    // 分类商品数据
    categoryGoods:[],
    // 小导航栏内容
    titles:['综合', '新品', '销量'],
    goodsList: [],
    goods: {
      'pop': [],
      'new': [],
      'sell': []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    getCategory().then(res=>{
      this.setData({
        leftNav:res.data.data.category.list
      })
      this._getSubcategory(this.data.leftNav[0].maitKey);
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 导航栏点击
  navListClick(e){
    // 设置选中的状态
    this.setData({
      navListActive:e.target.dataset.index
    })
    // 点击获取分类商品数据
    this._getSubcategory(e.target.dataset.maitkey)

  },
  // 商品数据获取函数
  _getSubcategory(maitKey){
    getSubcategory(maitKey).then(res=>{
      this.setData({
        categoryGoods:res.data.data.list
      })
    })
  },
  _getCategoryDetail(miniWallkey, type){
    getCategoryDetail(miniWallkey, type).then(res=>{

    })
  }
})