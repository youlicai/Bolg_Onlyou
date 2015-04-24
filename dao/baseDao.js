/**
 * Created by Administrator on 15-3-25.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dburl = require("../config").db;//数据库地址
exports.connect = function (callback) { //链接数据库
    mongoose.connect(dburl);
}

exports.disconnect = function (callback) {//关闭数据库
    mongoose.disconnect(callback);
}

exports.mongoose=mongoose;
exports.Schema=Schema;

