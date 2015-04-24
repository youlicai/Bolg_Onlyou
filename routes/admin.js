/**
 * Created by Administrator on 15-3-25.
 */
var util = require('util');
var db = require('../dao/adminDao');
var formidable = require('formidable');

exports.index = function (req, res) {
    if (!req.session.username) {
        res.render('admin/login', { title: 'Express'});
    } else {


        res.render('admin/index', { title: 'Express'});
    }
};


exports.login = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    db.login(username, password, function (err, data) {
        if (err) {
            return;
        }
        if (!data) {
            return;
        }
        req.session.username = username;
        res.json(data);
    });
};
exports.tagList = function (req, res) {
    db.tagList(function (err, data) {
        if (err) {
        console.log(err);
        } else {
            console.log(data);
            res.render('admin/tags', { "tags": data});
        }
    })
};


exports.coverList=function(req,res){
  db.coverList(function(err,data){
      if(err){
          console.log(err);
      }else{
          res.render('admin/covers', { "covers": data});
      }
  })
};

exports.articleList=function(req,res){
    db.articleList(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('admin/articles', { "articles": data});
        }
    })
}

exports.publish = function (req, res) {

//
//    var submitData = {
//        content: req.body.editor,
//        tag: req.body.tag,
//        title: req.body.title
//    }
    console.log("content=" + req.param("editor"));
    console.log("content=" + req.body.editor);

    console.log("content=" + req.files.fieldSize);


//
//    var name = "";
//    var form = new formidable.IncomingForm();
//    form.keepExtensions = false;//keep .jpg/.png
//    form.uploadDir = "./public/images/upload/";//upload path
//    form.parse(req, function (err, fields, files) {
//        if(err){
//            console.log(err);
//            return;
//        }
//        name = Date.parse(new Date());
//        var fs = require('fs');
//        fs.renameSync(files.upload.path, form.uploadDir + name + '.png');
//        console.log("parse!");
//    });//bind event handler
//    form.on('progress', function (bytesReceived, bytesExpected) {
//        console.log(((bytesReceived / bytesExpected) * 100) + "% uploaded");
//    });
//
//    form.on("complete", function (err) {
//        console.log("complete!");
//    });
//    form.on('end', function () {
//        console.log("end!");
//
//        var content = req.param('myEditor');
//        var tag = req.param('tag');
//        var title = req.param('title');
//        console.log("tag=:" + tag);
//        console.log("title=" + title);
//        console.log("content=" + req.ueditor);
//        var cover = "http://localhost:3001/images/upload/" + name + ".png";
//        db.add(title, content, tag, cover, function (err, data) {
//            if (err) {
//                return;
//            }
//            if (!data) {
//                return;
//            }
//
//        })
//    });
}
;


//
//exports.imgUp=(path.join(__dirname, 'public'), function(req, res, next) {
//    // ueditor 客户发起上传图片请求
//    if (req.query.action === 'uploadimage') {
//        var foo = req.ueditor;
//        var date = new Date();
//        var imgname = req.ueditor.filename;
//
//        var img_url = '/images/ueditor/';
//        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
//    }
//    //  客户端发起图片列表请求
//    else if (req.query.action === 'listimage') {
//        var dir_url = '/images/ueditor/';
//        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
//    }
//    // 客户端发起其它请求
//    else {
//        // console.log('config.json')
//        res.setHeader('Content-Type', 'application/json');
//        res.redirect('/ueditor/nodejs/config.json');
//    }
//});
