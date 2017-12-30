var send = (res,code,message,data)=>{
    res.status(200).json({code,message,data});
}

function isSign(req,res,next){
    if (req.cookies.petname) {
        next();   
    }else{
        if (req.xhr) {
            send(res,"system error","系统错误，请重试！");
        } else {
            res.redirect('/user/signin.html');
        }
    }
}

module.exports = {send,isSign};