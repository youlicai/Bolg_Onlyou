/**
 * Created by Administrator on 15-3-10.
 */
"use strict";
var util = require('util');
var db = require('../dao/articleDao');

//首页
exports.index = function (req, res) {
    var pageId = typeof(req.params.pageId) == "undefined" || req.params.pageId < 0 ? 0 : req.params.pageId;//页码

    var tag = typeof(req.params.tag) == "undefined" ? "全部" : req.params.tag;//分类
    db.article_list(pageId, tag, function (err, articles) {
        if (err || !articles) {
            return;
        }
        db.newest_article_title(function (err, article_titles) {
            if (err || !article_titles) {
                return;
            }
            util.log(article_titles);
            res.render('index', {
                "articles": articles,
                "article_titles": article_titles,
                "current_tag":tag,
                "pageId":pageId
            });
        });
    });
};
exports.detail = function (req, res) {
    var id = req.params.id;
    db.findArticleById(id, function (err, row) {
        if (err || !row) {
        }
        res.json(row);

    });

};
