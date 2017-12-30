const exp = require('express'),
    fs = require('fs'),
    common = require('../../common');
const route = exp.Router();

route.post('/api/user/register', (req, res) => {
    var fileName = `users/${req.body.petname}.json`;

    function saveFile() {
        fs.exists(fileName, (exists) => {
            if (exists) {
                common.send(res, "registed", "用户已经存在，请直接登录！");
            } else {
                fs.writeFile(fileName, JSON.stringify(req.body), (err) => {
                    if (err) {
                        common.send(res, "regist error", "注册失败！");
                    } else {
                        common.send(res, "success", "注册成功！");
                    }
                })
            }
        })
    }

    fs.exists('users', (exists) => {
        if (exists) {
            saveFile();
        } else {
            fs.mkdir('users', (err) => {
                if (err) {
                    common.send(res, "regist error", "注册失败！");
                } else {
                    saveFile();
                }
            })
        }
    })
})

module.exports = route;