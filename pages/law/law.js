// law.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cat: null,
    name: "",
    index: "",
    info: new Object(),
    systemInfo: new Object()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取窗口高度(scroll-into-view需要)
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res
        })
        that.update()
      }
    })

    // 设置页面数据
    
    // console.log(util.getCurrentPageUrlWithArgs());
    var cat = options.cat
    var name = options.name
    var path = app.globalData.lawsPath
    var law_JS = require(path)
    this.setData({
      cat: cat,
      name: name,
      index: options.index,
      info: law_JS.getLawInfo(cat, name),
      law: law_JS.getLawContent(cat, name)
    });

    wx.setNavigationBarTitle({
      title: this.data.info.title
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var url = util.getCurrentPageUrlWithArgs()    //当前页面url+参数

    return {
      title: this.data.info.title,
      path: url,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'cancel',
          duration: 2000
        })
      }
    }
  }
})