/**
 * Created by Administrator on 15-3-25.
 */
var models = require("../model/models");
var application = require("../application");

//登陆操作
exports.login = function (account, password, callback) {
    models.Admin.find({account: account, password: password}, function (err, doc) {
        if (err) {
            application.util.log('FATAL ' + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}

exports.add = function (title, content, tag, img, callback) {
    var article = new models.Article();
    article.title = title;
    article.content = content;
    article.tag = tag;
    article.img = img;
    getArticleSize(function (err, counts) {
        article.id = counts + 1;
        article.save(function (err) {
            if (err) {
                application.util.log("FATAL" + err);
                callback(err);
            } else {
                callback(null);
            }
        });
    });


}

var getArticleSize = function (callback) {
    models.Article.count("", function (err, counts) {
        if (err) {
            callback(err, 0)
        } else {
            callback(null, counts);
        }
    })
};
/**
 * 帖子Tag列表
 * @param callback
 */
exports.tagList = function (callback) {
    models.Tag.find().exec(function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    })
};
/**
 * 帖子封面列表
 * @param callback
 */
exports.coverList = function (callback) {
    models.Cover.find().exec(function (err, data) {
        if (err) {
            callback(err, null);
        } else
            callback(null, data);
    })
};

exports.articleList=function(callback){
  models.Article.find().exec(function(err,data){
      if (err) {
          callback(err, null);
      } else
          callback(null, data);
  })
};