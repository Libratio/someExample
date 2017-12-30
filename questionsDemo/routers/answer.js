const exp = require('express'),
    fs = require('fs'),
    common = require('../common');
const route = exp.Router();

route.get('/answer.html', common.isSign, (req, res, next) => {
    next();
})

route.post('/api/user/answer', common.isSign, (req, res) => {
    var fileName = `questions/${req.body.question}.json`;
    req.body.time = new Date();
    req.body.ip = req.ip;
    req.body.petname = req.cookies.petname;
    var content = JSON.stringify(req.body);
    content = content.replace('/</g',"&lt;");
    content = content.replace('/>/g',"&gt;");
    var answer = JSON.parse(content);
    fs.readFile(fileName,(err,data)=>{
        if (err) {
            common.send(res,'file error',"回答问题失败！");
        }else{
            var question = JSON.parse(data.toString());
            if (!question.answers) {
                question.answers = [];
            }
            question.answers.push(answer);
            fs.writeFile(fileName,JSON.stringify(question),(err)=>{
                if (err) {
                    common.send(res,"answer error","回答问题失败！");
                } else {
                    common.send(res,"success","回答问题成功！");
                }
            })
        }
    })
})

module.exports = route;