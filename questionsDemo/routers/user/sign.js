const exp = require('express'),
fs = require('fs'),
common = require('../../common');
const route = exp.Router();

route.post('/api/user/signin',(req,res)=>{
    var fileName = `users/${req.body.petname}.json`;
    fs.exists(fileName,(exists)=>{
        if (exists) {
            fs.readFile(fileName,(err,data)=>{
                if (err) {
                    common.send(res,'signin error',"登录失败！");
                } else {
                    var user = JSON.parse(data.toString());
                    if (user.password == req.body.password) {
                        res.cookie('petname',req.body.petname);
                        common.send(res,"success","登录成功！");
                    }else{
                        common.send(res,"password error","密码错误！");
                    }
                }
            })
        } else {
            common.send(res,"signin error","用户不存在，请先注册！");
        }
    })
})

route.get('/api/user/signout',(req,res)=>{
    res.clearCookie('petname');
    res.redirect('/');
})

module.exports = route;