//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  /*
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }, */
  globalData:{
    userInfo: null,
    lawsPath: "../../utils/laws.js",
    forward: function (res) {
      return {
        title: '法律速查小程序',
        path: '/pages/index/index',
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
            icon: 'loading',
            duration: 2000
          })
        }
      }
    }
  }
})