// 连接处理 mongodb 的依赖
const mongoose = require('mongoose');

//连接数据库
// current URL string parser is deprecated,
mongoose.connect('mongodb://localhost/zhy',{useNewUrlParser:true});

// Schema -数据结构：用户
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    regTime: Date
});

// Schema -数据结构：职位
const positionSchema = new mongoose.Schema({
    posName:String,
    salary: Number,
    //...........
    company: String,
    logo:String
});

//model -集合：用户 ; 对应user 集合
const User = mongoose.model('user',userSchema);
// Model-集合：职位
const Position = mongoose.model('position', positionSchema);

module.exports = {User,Position};