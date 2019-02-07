//search.js
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp();
Page({
    law_JS: require(app.globalData.lawsPath),
    data: {
        cat: null,
        catTitle: '',
        laws: null,
        search_str: '',
    },
    emptyResultToast: function (result) {
        var noResult = true;
        for (var lawKey in result) {
            if (result[lawKey].content && result[lawKey].content.length > 0) {
                noResult = false;
                break;
            }
        }
        if (noResult) {
            wx.showToast({
                title: '未找到相关条目',
                icon: 'none'
            });
        }
    },
    getSearchLawsResult: function (cat, search_str, showEmptyToast = false) {
        var result = this.law_JS.searchLaw(cat, search_str);
        if (search_str && showEmptyToast) {
            this.emptyResultToast(result);
        }
        return result;
    },
    search: function (e) {
        var str = e.detail.value || '';

        this.setData({
            search_str: str,
            laws: this.getSearchLawsResult(this.data.cat, str, true)
        });
    },
    goToLawPage: function (e) {
        var cat = this.data.cat;
        var name = e.currentTarget.dataset.name;
        var index = e.currentTarget.dataset.index || 0;
        wx.navigateTo({
            url: '../law/law?cat=' + cat + '&name=' + name + '&index=' + index
        });
    },
    onLoad: function (options) {
        var search = options.search_str || '';
        this.setData({
            cat: options.cat,
            catTitle: this.law_JS.getLawsTitle(options.cat),
            laws: this.getSearchLawsResult(options.cat, search),
            search_str: options.search_str || ''
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var url = util.getCurrentPageUrlWithArgs(); //当前页面url+参数
        if (this.data.search_str.length > 0) {
            url += '&search_str=' + this.data.search_str; //搜索参数
        }

        return {
            title: '明法手册 - 法律速查',
            path: url,
            success: function (res) {
                // 转发成功
                wx.showToast({
                    title: '转发成功',
                    icon: 'success',
                    duration: 2000
                });
            },
            fail: function (res) {
                // 转发失败
                wx.showToast({
                    title: '转发失败',
                    icon: 'cancel',
                    duration: 2000
                });
            }
        };
    }
});