var express = require('express');
var router = express.Router();
var formidable = require("formidable");

// /api/v1/upload/image
router.post('/image',function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + '/../public/upload';
    form.keepExtensions = true;
    // 解析上传数据
    form.parse(req,function(err,fileds,files){
        var file = files.imgFile;//获取到上传的文件
        var path = file.path;//获取到上传的文件的路径
        path = path.replace(/\\/g,"/");// 把路径中的\换为/
        path = path.substring(path.lastIndexOf('/'),path.length);// 获取到文件名以及文件扩展名
        var url = "/upload"+path;// 拼接文件在服务器上的url
        // 拼接返回信息
        var info = {
            "error":0,
            "url":url
        };
        res.send(info);
    })
})

module.exports = router;