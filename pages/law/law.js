// law.js
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp();
// 转发标题
const shareTitleSuffix = ' - 明法手册';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        cat: null,
        name: '',
        index: '',
        info: {},
        showInfoText: false
    },
    toggleInfoText: function () {
        this.setData({
            showInfoText: !this.data.showInfoText
        });
    },
    syncIndex(index) {
        this.setData({
            index: index
        });
        this.options.index = index;
    },
    onLawTap: function (e) {
        var index = e.target.dataset.index;
        if (index) {
            this.syncIndex(index);
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 设置页面数据
        var path = app.globalData.lawsPath;
        var law_JS = require(path);
        var { cat, name, index } = options;
        this.setData({
            cat: cat,
            name: name,
            index: index,
            info: law_JS.getLawInfo(cat, name),
            law: law_JS.getLawContent(cat, name)
        });

        /* wx.setNavigationBarTitle({
            title: this.data.info.title
        }); */
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var url = util.getCurrentPageUrlWithArgs(); //当前页面url+参数

        return {
            title: this.data.info.title + shareTitleSuffix,
            path: url,
            success: function (res) {
                // 转发成功
                wx.showToast({
                    title: '转发成功',
                    icon: 'success'
                });
            },
            fail: function (res) {
                // 转发失败
                wx.showToast({
                    title: '转发失败',
                    icon: 'none'
                });
            }
        };
    }
});