const mongoose = require('mongoose');

//定义分类的数据格式
const categorySchema = new mongoose.Schema({
    //分类的名字
    name:String,
})

//暴露分类的数据库的模型对象
module.exports = mongoose.model('categorys',categorySchema);