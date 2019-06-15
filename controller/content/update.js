const Content = require('../../schema/content');

//展示修改内容的页面
exports.showUpdate = function (req,res){
    let id = req.query.id;

    Content.findById(id).populate('category').then(result => {
        res.render('admin/content/update',{
            userInfo:req.userInfo,
            result,
        })
    })
}

//接收修改内容的数据
expotrts.update = function (req,res){
    let id = req.query.id;
    let {title,description,content} = req.body;
    if(title === ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容修改',
                message:'内容标题不能为空'
            }
        })
        return;
    }

    if(description === ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容修改',
                message:'内容描述不能为空'
            }
        })
        return;
    }

    if(content === ''){
        res.render('admin/error',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容修改',
                message:'内容主体不能为空'
            }
        })
        return;
    }

    //按照ID查询数据库 并修改对应字段
    Content.updateOne({_id:id},{$set:{title,description,content,time:new Date}}).then(result => {
        res.render('admin/success',{
            userInfo:req.userInfo,
            optionMessage:{
                location:'内容首页',
                option:'内容修改',
                message:'内容修改成功',
                herf:'返回内容首页'
            },
            url:'/admin/content'
        })
    })
}