const express = require('express');
//引入操作用户数据库的model对象
const User = require('../schema/users');

const router = express.Router();

//初始化后台返回给前端的数据格式
let responseDate = {};

//后台注册处理
router.post('/register',(req,res)=>{
    let {username,password,repassword} = req.body;

    if(username === ''){
        responseDate.code = 1;
        responseDate.message = '用户名不能为空';
        res.send(responseDate);
        return;
    }

    if(password === ''){
        responseDate.code = 2;
        responseDate.message = '密码不能为空';
        res.send(responseDate);
        return;
    }

    if(password !== repassword){
        responseDate.code = 3;
        responseDate.message = '两次密码不一致';
        res.send(responseDate);
        return;
    }

    //从数据库中查询用户名是否已经被注册
    User.findOne({username}).then(somebody => {
        if(somebody){
            responseDate.code = 4;
            responseDate.message = '该用户已经被注册，请重新输入用户名';
            res.send(responseDate);
            return;
        }

        new User({
            username,
            password
        }).save().then(()=>{
            responseDate.code = 0;
            responseDate.message = '恭喜你注册成功';
            res.send(responseDate);
        })
    })
})

//后台登录处理
router.post('/login',(req,res)=>{
    let {username,password} = req.body;
    if(username === ''){
        responseDate.code = 1;
        responseDate.message = '用户名不能为空';
        res.send(responseDate);
        return;
    }

    if(password === ''){
        responseDate.code = 2;
        responseDate.message = '密码不能为空';
        res.send(responseDate);
        return;
    }

    //从数据库中查询此用户是否注册过，找不到返回null

    User.findOne({
        username,
        password,
    }).then(somebody => {
        if(!somebody){
            responseDate.code = 3;
            responseDate.message = '密码或者用户名错误';
            res.send(responseDate);
            return;
        }
        responseDate.code = 0;
        responseDate.message = '登陆成功';
        responseDate.userInfo = {
            id:somebody._id,
            username:somebody.username,
            isAdmin:somebody.isAdmin
        }

        //每次用户登录成功后就设置 cookie
        res.cookie('userInfo',JSON.stringify(responseDate.userInfo),{
            maxAge:66666666
        })
        res.send(responseDate);
    })
})

//退出的后台管理
router.get('/loginout',(req,res)=>{
    //清除cookie（用相同键名的空值覆盖）
    res.cookie('userInfo','');
    res.send('cookie清除了');
})

module.exports = router;//将这个子服务暴露即可