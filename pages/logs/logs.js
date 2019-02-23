//logs.js
// var util = require('../../utils/util.js')
Page({
    data: {
        canUseOfficialAccount: wx.canIUse('official-account'),
        logs: [{
            date: '2019.02',
            text: '\n优化操作及界面样式'
        },
        {
            date: '2018.03.15',
            text: '\n增加数部法条'
        },
        {
            date: '2018.03.08',
            text: '\n改进了转发功能\n' +
                    '修改了一些排版错误'
        },
        {
            date: '2017.12.09',
            text: '\n收录了5大分类的法律条文\n' +
                    '来源：北大法宝网 http://www.pkulaw.cn'
        },
        {
            date: '2017.11.10',
            text: '\n收录《中华人民共和国民法总则》\n' +
                    '收录最高人民法院关于适用《中华人民共和国物权法》若干问题的解释（一）\n' +
                    '收录《中华人民共和国物权法》\n' +
                    '收录《职工带薪年休假条例》\n' +
                    '收录《中华人民共和国婚姻法》\n' +
                    '来源：北大法宝网 http://www.pkulaw.cn'
        },
        {
            date: '2017.07.27',
            text: '\n收录《中华人民共和国劳动法》\n' +
                    '来源：http://www.gov.cn/banshi/2005-05/25/content_905.htm\n' +
                    '收录《中华人民共和国劳动合同法》\n' +
                    '来源：http://www.gov.cn/ziliao/flfg/2007-06/29/content_669394.htm'
        }
        ]
    },
    onLoad: function () {
        /* this.setData({
          logs: (wx.getStorageSync('logs') || []).map(function (log) {
            return util.formatTime(new Date(log))
          })
        })*/
    }
});