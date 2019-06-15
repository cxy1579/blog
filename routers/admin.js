const express = require('express');
const User = require('../schema/users');
const category = require('../controller/category/index');
const addCategory = require('../controller/category/add');
const updateCategory = require('../controller/category/update');
const deleteCategory = require('../controller/category/delete');

const content = require('../controller/content/index');
const addContent = require('../controller/content/add');
const updateContent = require('../controller/content/update');
const deleteContent = require('../controller/content/delete');


const router = express.Router();

//设置后台管理权限
router.use((req,res,next)=>{
    if(!req.userInfo.isAdmin){
        res.send('你不是管理员，无权访问该页面');
        return;
    }
    next();
})

//渲染后台首页
router.get('/',(req,res)=>{
    res.render('admin/index',{
        usesrInfo:req.userInfo,
    })
})

//渲染用户管理页面
router.get('/user',(req,res)=>{
    let page = +req.query.page || 1;
    let limit = 2;//每页显示的数据条数

    //从数据库中获取所有用户的信息
    User.count().then((count)=>{
        //计算最大页数
        let pageMax = Math.ceil(count/limit);
        page = Math.min(pageMax,page);
        let skip = (page - 1) * limit;
        //每页跳过的数据量
        User.find().limit(limit).skip(skip).then(result => {
            res.render('admin/user/index',{
                userInfo:req.userInfo,
                result,
                page,
                pageMax
            })
        })
    })
})

//渲染添加分类的页面
router.get('/category',category.showIndex);
//渲染添加分类的页面
router.get('/category/add',addCategory.showAdd);
//接受要添加分类的数据
router.post('/category/add',addCategory.add)


//渲染修改分类的页面
router.get('/category/update',updateCategory.showUpdate);
//接受要修改分类的数据
router.post('/category/update',updateCategory.update);


//渲染删除分类的页面
router.get('/category/delete',deleteCategory.showDelete);
//接受要删除分类的数据
router.post('/category/delete',deleteCategory.delete);


//渲染添加内容的页面
router.get('/content',content.showIndex)
//渲染添加内容的页面
router.get('/content/add',addContent.showAdd);
//接受要添加的内容的数据
router.post('/content/add',addContent.add);


//渲染修改内容的页面
router.get('/content/update',updateContent.showUpdate);
//接受要修改的内容的数据
router.post('/content/update',updateContent.update);


//渲染删除内容的页面
router.get('/content/delete',deleteContent.showDelete);
//接受要删除的内容的数据
router.post('/content/delete',deleteContent.delete);


module.exports = router;