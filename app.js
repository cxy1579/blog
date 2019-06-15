const　express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

//body-parser 中间件解析post数据
app.use(bodyParser.urlencoded({
    extended:false,
}))

//cookie-parser 中间件解析cookie数据
app.use(cookieParser())
//设置模板引擎为ejs
app.set('view engine','ejs');

//根据不同的模块  划分不同的路由

//任何路由都会触发下面的回调
app.use((req,res,next)=>{
    if(req.cookies.userInfo){    //如果该用户已经登陆了
        req.userInfo = JSON.parse(req.cookies.userInfo);
    }
    next();//继续向下触发相应的路由
})
//处理后台服务
app.use('/admin',require('./routers/admin'));

//处理注册登录服务
app.use('/api',require('./routers/api'));

//处理前台服务
app.use('/',require('./routers/main'));

//为public下的所有文件自动设置路由
app.use(express.static('public'));

//连接数据库
mongoose.connect('mogodb://localhost:27017/blog',{useNewUrlParser:true},(err)=>{
    if(err){
        console.log('数据库连接失败');
        return;
    }
    console.log('数据库连接成功');

    app.listen(3000);
})