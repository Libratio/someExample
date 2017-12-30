var express = require('express');
var router = express.Router();
var db = require("../db");

router.get('/:folder', function(req, res, next) {
  db.Note.find({
    folder:req.params.folder
  }).then(function(data){
    return Promise.all([data]);
  }).spread(function(data){
    db.NoteFolder
    .findById(req.params.folder)
    .then(function(folder){
      res.render('list',{
        name:folder.name,
        folder:req.params.folder,
        notes:db.toArray(data)
      })
    })
  })
});

// 访问新增和修改页面
router.get('/detail/:folder/:id?',function(req,res){
  if (!!req.params.id) {
    db.Note.findById(req.params.id).then(function(note){
      res.render('detail',{
        note:db.toObject(note),
        folder:req.params.folder
      })
    })
  }else{
    res.render('detail',{
      folder:req.params.folder
    })
  }
})

// 新增保存
router.post('/:folder',function(req,res){
  var note = new db.Note(req.body);
  note.folder = req.params.folder;
  note.save().then(function(){
    res.redirect('/note/'+req.params.folder);
  })
})
// 修改保存
router.post('/:folder/:id',function(req,res){
  req.body.update_time = Date.now();
  db.Note.findByIdAndUpdate(req.params.id,req.body).then(function(){
    res.redirect('/note/'+req.params.folder);
  })
})
module.exports = router;
