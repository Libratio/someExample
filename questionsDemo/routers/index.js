const exp = require('express'),
    fs = require('fs'),
    common = require('../common');
const route = exp.Router();

route.get('/questions', (req, res) => {

    function readFiles(index, files, questions, callback) {
        if (index < files.length) {
            fs.readFile(`questions/${files[index]}`,(err,data)=>{
                if (!err) {
                    questions.push(JSON.parse(data.toString()));
                }
                index++;
                readFiles(index,files,questions,callback);
            })
        } else {
            callback();
        }
    }

    fs.readdir('questions', (err, files) => {
        if (err) {
            common.send(res,"file error","获取数据失败！");
        }else{
            var questions = [];
            readFiles(0,files,questions,function(){
                common.send(res,"success","获取数据成功",questions);
            })
        }
    })
})

module.exports = route;