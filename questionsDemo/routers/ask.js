const exp = require('express'),
    fs = require('fs'),
    common = require('../common');
const route = exp.Router();

route.post('/api/user/ask', common.isSign, (req, res) => {
    var time = new Date();
    req.body.ip = req.ip;
    req.body.time = time;
    req.body.petname = req.cookies.petname;
    var content = JSON.stringify(req.body);
    content = content.replace(/>/g,"&gt;");
    content = content.replace(/</g,"&lt;");

    var fileName = `questions/${time.getTime()}.json`;

    function saveFile(){
        fs.writeFile(fileName,content,(err)=>{
            if (err) {
                common.send(res,"ask error","提问问题失败！");
            } else {
                common.send(res,"success","提问问题成功！");
            }
        })
    }

    fs.exists('questions',(exists)=>{
        if (exists) {
            saveFile();
        } else {
            fs.mkdir('questions',(err)=>{
                if (err) {
                    common.send(res,"ask error","提问问题失败！");
                } else {
                    saveFile();
                }
            })
        }
    })
})

module.exports = route;