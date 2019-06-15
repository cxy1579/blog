const mongoose = require('mongoose');

//定义储存在数据库的内容的数据格式
const contentSchema = new mongoose.Schema({
    title:String,
    description:String,
    constent:String,
    //关联存有分类的那个集合
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    //发表时间
    time:{
        type:Date,
        default:new Date,
    },
    //阅读量
    views:{
        type:Number,
        default:0,
    },
    //关联用户的那个集合
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    comment:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model('contents',contentSchema);