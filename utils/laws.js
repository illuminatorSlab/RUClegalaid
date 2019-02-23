const CIVIL = require('./laws/civil/index.js');

const LABOR = require('./laws/labor/index.js');

const MARRIAGE = require('./laws/marriage/index.js');

const PROCEDURE = require('./laws/procedure/index.js');

const TRAFFIC = require('./laws/traffic/index.js');

const LAWS = [LABOR, CIVIL, MARRIAGE, PROCEDURE, TRAFFIC];

// 查询分类下法律信息接口
function getLawsInfo() {
    var info = [];
    for (var i in LAWS) {
        info[i] = {
            'title': '',
            'laws': []
        };
        for (var key in LAWS[i]) {
            if (key == 'title') {
                info[i].title = LAWS[i].title;
            } else {
                info[i].laws.push(LAWS[i][key].title);
            }
        }
    }

    return info;
}

// 查询指定分类标题接口
function getLawsTitle(cat) {
    return LAWS[cat].title;
}

// 查询法律信息接口
function getLawInfo(cat, name) {
    var info = {
        'title': LAWS[cat][name].title,
        'info': LAWS[cat][name].info
    };
    return info;
}

// 查询法律内容接口
function getLawContent(cat, name) {
    return LAWS[cat][name].content;
}

// 搜索内容接口
function searchLaw(cat, str) {
    str = str.trim();
    var keywords = str.split(' ');

    var data = {};
    for (var law in LAWS[cat]) {
        // 跳过标题对象
        if (law == 'title') continue;
        data[law] = new Object();
        data[law].title = LAWS[cat][law].title;
        data[law].content = new Array();

        if (str.length == 0) {
            continue;
        } else {
            for (var a in LAWS[cat][law]['content']) {
                var text = LAWS[cat][law]['content'][a].label + ' ' + LAWS[cat][law]['content'][a].text;

                var matched = true;
                for (var i in keywords) {
                    if (text.indexOf(keywords[i]) < 0) {
                        matched = false;
                        break;
                    }
                }

                if (matched) {
                    var obj = LAWS[cat][law]['content'][a];
                    obj.index = a;
                    data[law].content.push(obj);
                }
            }
        }
    }

    return data;
}

// 获取内容接口
function getArticle(cat, name, index) {
    if (typeof LAWS[cat][name]['content'][index] != 'undefined') {
        return LAWS[cat][name]['content'][index];
    } else {
        return false;
    }
}

module.exports = {
    getLawsInfo: getLawsInfo,
    getLawsTitle: getLawsTitle,
    getLawInfo: getLawInfo,
    getLawContent: getLawContent,
    searchLaw: searchLaw
};