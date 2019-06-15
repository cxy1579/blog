const mongoose = require('mongoose');

//定义用户的数据格式
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

//暴露操纵这个子数据库的模型对象，其他文件引入这个模块就可以操作这个数据库了
module.exports = mongoose.model('users,userSchema');