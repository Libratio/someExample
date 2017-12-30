var express = require('express');
var router = express.Router();
var AnimalType = require("../db").AnimalType;

/* GET users listing. */
router.get('/get_data', function(req, res) {
  AnimalType.find().then(function(data){
    res.json({
      code:"success",
      result:data
    })
  }).catch(function(reason){
    res.json({
      code:"error",
      result:reason
    })
  })
});

// 添加动物类型
router.post("/add",function(req,res){
  var type = new AnimalType(req.body);
  type.save().then(function(){
    res.json({
      code:"success",
      msg:"添加成功"
    })
  }).catch(function(){
    res.json({
      code:"error",
      msg:"添加失败"
    })
  })
})

// 访问修改页面，获取id对应的类型
router.get("/editor/:id",function(req,res){
  AnimalType.findById(req.params.id).then(function(type){
    res.json({
      code:"success",
      result:type
    })
  })
})

// 修改
router.post("/editor/:id",function(req,res){
  AnimalType.findByIdAndUpdate(req.params.id,req.body,function(err){
    if (!err) {
      res.json({
        code:"success",
        msg:"修改成功"
      })
    }else{
      res.json({
        code:"error",
        msg:"修改失败"
      })
    }
  })
})

module.exports = router;
