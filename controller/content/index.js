const Content = require('../../schema/content');

exports.showIndex = function (req,res){
    let page = +req.query.page || 1;
    let limit = 2;
    Content.count().then(count => {
        let pageMax = Math.ceil(count/limit);
        page = Math.min(pageMax,page);
        let skip = (page - 1) * limit;
        Content.find().limit(limit).skip(skip).sort({_id:-1}).population(['category','author']).then(results => {
            res.render('admin/content/index',{
                userInfo:req.userInfo,
                results,
                page,
                pageMax
            })
        })
    })
}