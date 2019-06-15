const express = require('express');
const Category = require('../schema/category');
const Content = require('../schema/content');

const router = express.Router();

let data = {};

//处理通用数据 只要有请求进来就执行一遍
router.use((req,res,next) => {
    data.userInfo = req.userInfo;
    Category.find().then(categorys => {
        data.categorys = categorys;
        next();
    })
})

//渲染首页
router.get('/',(req,res)=>{
    data.limit = 3;
    data.page = +req.query.page || 1;
    data.category = req.query.category;

    let where = {};

    //如果点击js等分类 则where对象就存有分类信息；如果没有点击 则where即为{};
    if(req.query.category){
        where.category = req.query.category;
    }

    Content.find(where).count().then(count => {
        data.count = count;
        data.pageMax = Math.ceil(data.count/data.limit);
        data.page = Math.min(data.pageMax,data.page);
        //翻页时跳过查询的数量
        data.skip = (data.page - 1) * data.limit;

        return Content.find(where).limit(data.limit).skip(data.skip).sort({_id:-1}).populate('category');
    }).then(contents => {
        data.contents = contents;
        res.render('main/index',data);
    })
})

//阅读全文的后台处理
router.get('/view',(req,res) => {
    //获取当前文章的id
    let contentId = req.query.contentId;
    Content.findById({_id:contentId}).populate(['author','category']).then(content => {
        //进来一次阅读量加一个
        content.views++;
        //content是直接从数据库中读出来的对象，可以直接.save（获取到原型上的API）操作
        content.save();
        data.content = content;
        res.render('main/view',data);
    })
})

//评论提交的后台处理
router.post('/comment',(req,res) => {
    if(!req.userInfo){
        data.code = 1;
        data.message = '你还没登录，请先登录';
        res.send(data);
        return;
    }

    let {contentId,comment} = req.body;

    //定义评论格式
    let commentDate = {
        comment,
        time:new Date,
        username:req.userInfo.username
    }
    Content.findById(contentId).then(result => {
        result.comment.push(commentData);
        result.save().then(() => {
            res.send(result.comment)
        })
    })
})

router.get('/comment',(req,res) => {
    let contentId = req.query.contentId;
    Content.findById(contentId).then(result => {
        res.send(result.comment)
    })
})


module.exports = router;