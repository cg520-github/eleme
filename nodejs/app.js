let express = require('express');
let app = express();
let router = require('./router/index.js');
let mogonoose = require('mongoose');
let path = require('path');

app.use('/public', express.static(path.resolve(__dirname, './public')));
app.all("*", function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    next();
})
app.use('/', router);

app.listen(3000);
// 链接数据库
// mogonoose.connect('mongodb://127.0.0.1:27017/hy', function(err) {
//     if (!err) {
//         // 链接成功
//         app.use('/', router);
//         //中间件 app.use     
//         app.listen(3001);
//     }

// })

//let router = require('./router/index');
//let router = require('./router');

//在来一个中间件来处理post数据，
// app.use('/',body,function(req,res,next){
//     next();
// })