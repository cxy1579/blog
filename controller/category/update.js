const Category = require('../../schema/category');

//展示分类修改的页面
exports.showUpdate = function (req,res){
    //获取分类名字
    let category = req.query.category;
    res.render('admin/category/update',{
        userInfo:req.userInfo,
        category
    })
}

//接受修改分类的数据
exports.update = function(req,res){
    //当前分类
    let cate = req.query.category;
    //表单提交的分类
    let category = req.body.category;
    
    if(category === ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'分类首页',
                option:'分类修改',
                message:'分类名称不能为空'
            }
        })
        return;
    }
    //从数据库查询新分类是否已存在，如果已经存在则不能修改
    Category.updateOne({name:cate},{$set:{name:category}}).then(result => {
        if(!result.nModified){
            res.render('admin/error',{
                userInfo:req.userInfo,
                optionMessage:{
                    location:'分类首页',
                    option:'分类修改',
                    message:'分类已存在,不可以重复修改'
                }
            })
            return;
        }
        res.render('admin/success',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'分类首页',
                option:'分类修改',
                message:'修改分类成功',
                href:'返回分类首页'
            },
            url:'/admin/category'
        })
    })
}