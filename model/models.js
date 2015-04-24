var baseDao = require("../dao/baseDao");

//管理员
var AdminSchema = new baseDao.Schema({
    "id": Number,
    "account": String,
    "password": String
});
exports.Admin = baseDao.mongoose.model('admins', AdminSchema);


//文章
var ArticleScheme = new baseDao.Schema({
    "id":Number,
    "title": String,
    "content": String,
    "public_time": {type: Date, default: Date.now},
    "tag": String,
    "cover": String,
    "read_nums": {type: Number, default: 0},
    "comment_nums": {type: Number, default: 0}

});
exports.Article = baseDao.mongoose.model('Articles', ArticleScheme);

//Tag
var TagScheme = new baseDao.Schema({
    "id":Number,
    "tagName": String
});
exports.Tag = baseDao.mongoose.model('Tags', TagScheme);


//封面
var CoverScheme = new baseDao.Schema({
    "id":Number,
    "coverName": String,
    "coverUrl": String
});
exports.Cover = baseDao.mongoose.model('Covers', CoverScheme);

