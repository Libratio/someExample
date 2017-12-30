const exp = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = exp();

// 使用body-parser和cookie-parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(require('./routers/user/register'));
app.use(require('./routers/user/sign'));
app.use(require('./routers/user/photo'));
app.use(require('./routers/ask'));
app.use(require('./routers/answer'));
app.use(require('./routers/index'));


app.use(exp.static('wwwroot'));

app.listen(3000, () => {
    console.log("服务器运行在3000端口...");
})