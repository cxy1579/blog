const Category = require('../../schema/category');

//展示删除分类的页面
exports.showDelete = function (req,res){
    let category = req.query.category;
    res.render('admin/category/delete',{
        userInfo:req.userInfo,
        category,
    })
}

//接受删除分类的数据
exports.delete = function(req,res){
    let category = req.body.category;
    if(category === ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'分类首页',
                option:'分类删除',
                message:'分类名称不能为空'
            }
        })
        return;
    }
    //从数据库中删除指定分类
    Category.deleteOne({
        name:category
    }).then(result => {
        if(!result.deletedCount){
            res.render('admin/error',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'分类首页',
                    option:'分类删除',
                    message:'当前分类不存在,不可删除'
                }
            })
            return;
        }
        res.render('admin/success',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'分类首页',
                option:'分类删除',
                message:'分类已成功删除',
                href:'返回分类首页'
            },
            url:'/admin/category'
        })
    })
}