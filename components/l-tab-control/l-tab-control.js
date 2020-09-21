// components/l-tab-control/l-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    activeClick(e){
      // 添加active
      this.setData({
        currentIndex:e.currentTarget.dataset.index
      })
      // 发出事件
      let data={index:this.data.currentIndex,}
      this.triggerEvent('tabclick',data,{})
    }
  }
})
