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
        searchStr: '',
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
    getSearchLawsResult: function (searchStr, showEmptyToast = false) {
        var result = this.law_JS.searchLaw(this.data.cat, searchStr);
        if (searchStr && showEmptyToast) {
            this.emptyResultToast(result);
        }
        return result;
    },
    clearSearch: function() {
        this.search();
    },
    search: function (searchStr = '', showEmptyToast = false) {
        var laws = this.getSearchLawsResult(searchStr, showEmptyToast);
        this.setData({
            searchStr,
            laws
        });
    },
    onSearchStrChange: function (e) {
        var searchStr = e.detail.value || '';
        this.search(searchStr, true);
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
        // 同步数据
        this.setData({
            cat: options.cat,
            catTitle: this.law_JS.getLawsTitle(options.cat)
        });

        this.search(options.searchStr || '');
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var url = util.getCurrentPageUrlWithArgs(); //当前页面url+参数
        if (this.data.searchStr.length > 0) {
            url += '&searchStr=' + this.data.searchStr; //搜索参数
        }

        return {
            title: '明法手册 - 法律速查',
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