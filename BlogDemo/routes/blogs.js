var express = require('express');
var router = express.Router();
var db = require("../db");

// 新增+修改
router.get("/editor/:id", function (req, res) {
  var id = req.params.id;
  db.Blog.findById(id, function (err, data) {
    var title = '';// 页面标题
    var btn_title = '';// 按钮标题
    if (data) {
      // 修改
      title = "编辑Blog";
      btn_title = "确认修改";
    } else {
      // 新增
      data = new db.Blog();
      title = "新增Blog";
      btn_title = "确认添加";
    }
    res.render("editor", {
      title: title,
      btn_title: btn_title,
      blog: data
    })
  })
})

// 确认修改+确认添加
router.post('/editor/:id', function (req, res) {
  var id = req.params.id;
  db.Blog.findByIdAndUpdate(id, req.body, { upsert: true, setDefaultsOnInsert: true }, function (err) {
    if (!err) {
      res.redirect("/api/v1/list/1");
    }
  })
})

// 删除
router.post('/delete/:id', function (req, res) {
  var id = req.params.id;
  db.Blog.findByIdAndRemove(id, function (err) {
    if (!err) {
      res.json({
        code: "y"
      })
    }
  })
})
// 通过表单删除
router.post('/delete', function (req, res) {
  var id = req.body.id;
  db.Blog.findByIdAndRemove(id, function (err) {
    if (!err) {
      res.redirect('/api/v1/list/1');
    }
  })
})
// 展示单个blog
router.get("/show/:id", function (req, res) {
  var id = req.params.id;
  db.Blog.findByIdAndUpdate(id,{$inc:{"view_count":1}},function (err, blog) {
    if (!err) {
      res.render("show", {
        blog: blog
      })
    }
  })
})
module.exports = router;
