var models = require("../model/models");
var application = require("../application");
exports.newest_article_title = function (callback) {
    models.Article.find().skip(0).limit(5).select("id title").exec(function (err, doc) {
        if (err) {
            application.util.log('FATAL ' + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

exports.article_list = function (pageId, tag, callback) {
    pageId = pageId * 5;
    if (tag == "全部") {
        models.Article.find().skip(pageId).limit(5).exec(function (err, doc) {
            if (err) {
                application.util.log('FATAL ' + err);
                callback(err, null);
            }
            callback(null, doc);
        });
    } else {
        models.Article.find().where('tag').equals(tag).skip(pageId).limit(5).exec(function (err, doc) {
            if (err) {
                application.util.log('FATAL ' + err);
                callback(err, null);
            }
            callback(null, doc);
        });
    }
}


exports.findArticleById = function (id, callback) {
    models.Article.find({id: id}, function (err, doc) {
        if (err) {
            application.util.log('FATAL ' + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

