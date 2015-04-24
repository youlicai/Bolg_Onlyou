var express = require('express')
    , portal = require('./routes/portal')
    , path = require('path')
    , http = require('http')
    , config = require("./config")
    , todoDao = require("./dao/baseDao")
    , formidable = require('formidable');
var multer  = require('multer');



var admin = require('./routes/admin');
var ueditor = require('ueditor');
var session = require('express-session');
var app = express();

//var bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({
//    extended: true
//}));

app.use(multer({
    dest: './public/images/upload/',
    limits: {
        fileSize: 100000000
    }
}))

//app.configure(function () {
//    app.use(express.bodyParser({
//        keepExtensions: true,
//        limit: 10000000,// 10M limit
//        defer: true//enable event
//    }));
//});
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart();
//app.use(bodyParser.json());
// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

todoDao.connect(function (error) {
    if (error) throw error;
});
app.on('close', function (error) {
    todoDao.disconnect(function (error) {
    });
});
app.get('/', portal.index);
app.get('/portal', portal.index);
app.get('/portal/:tag', portal.index);
app.get('/portal/:tag/:pageId', portal.index);

app.get('/article/:id', portal.detail);
app.get('/admin', admin.index);
app.get('/admin/login', admin.login);
app.get('/admin/tagList', admin.tagList);
app.get('/admin/coverList', admin.coverList);
app.post('/admin/login', admin.login);
app.post('/admin/publish',admin.publish);
//app.post('/admin/imgUp', admin.imgUp);

app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/images/upload/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/upload/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm()
    form.keepExtensions = false;//keep .jpg/.png
    form.uploadDir = "upload/";//upload path
    form.parse(req, function (err, fields, files) {
        console.log("parse!");
    });//bind event handler
    form.on("progress", function (err) {
    })
    form.on("complete", function (err) {
    })
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
