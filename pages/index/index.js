//index.js
//获取应用实例
var app = getApp();
Page({
    law_JS: require(app.globalData.lawsPath),
    data: {
        expandCat: [],
        lawsInfo: null
    },
    goToSearchPage: function (e) {
        var cat = e.currentTarget.dataset.cat;
        // console.log(cat)
        wx.navigateTo({
            url: '../search/search?cat=' + cat
        });
    },
    expandCatTap: function (e) {
        var newExpandCat = this.data.expandCat;
        var catIndex = e.target.dataset.catIndex;
        newExpandCat[catIndex] = !newExpandCat[catIndex];
        this.setData({
            expandCat: newExpandCat
        });
    },
    onLoad: function () {
        //console.log('onLoad')
        this.setData({
            lawsInfo: this.law_JS.getLawsInfo()
        });
        // console.log(this.data.lawsInfo)

        /*
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
            userInfo:userInfo
          })
        })*/
    },
    onShareAppMessage: app.globalData.forward
});