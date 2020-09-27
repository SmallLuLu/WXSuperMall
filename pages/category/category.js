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
    },
    currentType:'pop'
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
        leftNav:res.data.data.category.list,
      })
      console.log(this.data.leftNav)
      this._getSubcategory(this.data.leftNav[0].maitKey);
      this._getCategoryDetail(this.data.leftNav[0].miniWallkey,'pop');
      this._getCategoryDetail(this.data.leftNav[0].miniWallkey,'new');
      this._getCategoryDetail(this.data.leftNav[0].miniWallkey,'sell');
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
    // 获取nav的数据
    this._getCategoryDetail(e.target.dataset.miniwallkey,'pop');
    this._getCategoryDetail(e.target.dataset.miniwallkey,'new');
    this._getCategoryDetail(e.target.dataset.miniwallkey,'sell');
  },
  // 商品数据获取函数
  _getSubcategory(maitKey){
    getSubcategory(maitKey).then(res=>{
      this.setData({
        categoryGoods:res.data.data.list
      })
    })
  },
  // 综合新品销量分类数据的获取
  _getCategoryDetail(miniWallkey, type){
    getCategoryDetail(miniWallkey, type).then(res=>{
      const resList=res.data;
      const typeKey=`goods.${type}`
      this.setData({
        [typeKey]:resList
      })
    })
  },
  // 小导航栏切换
  navClick(event){
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