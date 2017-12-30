var express = require('express');
var router = express.Router();
var Animal = require("../db").Animal;
var AnimalType = require("../db").AnimalType;

/* GET home page. */
router.get('/get_data', function (req, res) {
  Animal.find().populate('type', "name description -_id").then(function (animals) {
    // console.log(animals);
    res.json({
      code: "success",
      result: animals
    })
  })
});

// 添加动物
router.post('/add', function (req, res) {
  var animal = new Animal(req.body);
  animal.save().then(function () {
    res.json({
      code: "success",
      msg: "添加成功"
    })
  })
})

// 访问修改页面
router.get("/editor/:id", function (req, res) {
  Animal.findById(req.params.id).then(function (animal) {
    AnimalType.find().then(function (types) {
      res.render('animal_editor', {
        animal: animal,
        types: types
      })
    })
  })
})

// 修改
router.post('/editor/:id', function (req, res) {
  Animal.findByIdAndUpdate(req.params.id, req.body).then(function () {
    res.json({
      code:"success",
      msg:"修改成功"
    })
  })
})

// 删除
router.post("/delete/:id",function(req,res){
  Animal.findByIdAndRemove(req.params.id).then(function(){
    res.json({
      code:"success"
    })
  })
})
module.exports = router;
