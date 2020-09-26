// components/l-go-top/l-go-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goTop:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    backTop(){
      wx.pageScrollTo({
        duration: 0,
        scrollTop:0
      })
    }
  }
})
