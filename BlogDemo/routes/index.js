var express = require('express');
var router = express.Router();
var moment = require("moment");
var db = require("../db");

function getPages(page, pageCount) {

  var pages = [page];
  var left = page - 1;
  var right = page + 1;
  while (pages.length < 8 && (left > 0 || right <= pageCount)) {
    if (left > 0) {
      pages.unshift(left--);
    }
    if (right <= pageCount) {
      pages.push(right++);
    }
  }
  return pages;
}

// 获取列表数据
router.get("/list/:page", function (req, res) {
  var page = req.params.page;
  page = parseInt(page);
  page = page || 1;
  var pageSize = 3;
  db.Blog.find().count(function (err, count) {
    var pageCount = Math.ceil(count / pageSize);
    if (page <= 1) {
      page = 1;
    }
    if (page >= pageCount) {
      page = pageCount;
    }

    // 页码数组
    var pages = getPages(page, pageCount);
    db.Blog.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ "_id": 1 })
      .exec(function (err, blogs) {
        if (!err) {
          blogs.forEach(function (blog) {
            blog.dateForShow = moment(blog.created_at).format("YYYY-MM-DD HH:mm:ss");
          })
          res.render("index", {
            page: page,// 当前页
            pageCount: pageCount,// 总页数
            pages: pages,// 页码数组
            blogs: blogs // 博客数据
          })
        }
      })
  })

  // db.Blog.find().exec(function(err,blogs){
  //   if (!err) {
  //     blogs.forEach(function(blog){
  //       // 添加一个属性，用于记录处理后的创建时间
  //       blog.dateForShow = moment(blog.created_at).format("YYYY-MM-DD HH:mm:ss");
  //     })
  //     res.render("index",{
  //       blogs:blogs
  //     })
  //   }
  // })
})

module.exports = router;
