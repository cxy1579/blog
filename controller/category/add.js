const Category = require('../../schema/category');

exports.showAdd = function (req,res){
    res.render('admin/category/add',{
        userInfo:req.userInfo,
    })
}

exports.add = function (req,res){
    //获取提交的分类
    let category = req.body.category;

    if(category === ''){
        res.render('admin/err',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'分类首页',
                option:'分类添加',
                message:'分类名不能为空'
            }
        })
    }

    //从数据库中查询该分类是否已存在
    Category.findOne({
        name:category
    }).then(result => {
        if(result){
            res.render('admin/error',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'分类首页',
                    option:'分类添加',
                    message:'该分类已存在，不能重复添加'
                }
            })
            return;
        }

        new Category({
            name:category
        }).save().then(()=>{
            res.render('admin/success',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'分类首页',
                    option:'分类添加',
                    message:'已成功添加该分类',
                    href:'返回分类首页'
                },
                url:'/admin/category'
            })
        })
    })
}