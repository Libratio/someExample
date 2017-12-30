var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.NoteFolder
  .find()
  .sort('-_id')
  .exec(function(err,data){
    db.Note.aggregate({
      $group:{
        _id:'$folder',
        count:{
          $sum:1
        }
      }
    }).exec(function(err,gdata){
      if (err) {
        res.send("获取数据失败");
      }else{
        data = db.toArray(data);
        data.forEach(function(item){
          var count = 0;
          for (var i = 0; i < gdata.length; i++) {
               if (item.id == gdata[i]._id) {
              count = gdata[i].count;
            }            
          }
          item.count = count;
        })
         res.render('index',{
          folders:data
        })
      }
    })
  })
});

// 保存文件夹
router.post('/',function(req,res){
  var folder = new db.NoteFolder(req.body);
  folder.save().then(function(){
    res.redirect('/note_folder');
  })
})

module.exports = router;
