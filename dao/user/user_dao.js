// 引入User 的model
const {User} = require("../model/model.js");

//用户数据访问处理
const UserDao = {
    //保存数据
    save(userinfo) {
        // 根据model 创建“document文档”
        const user = new User(userinfo);
        //保存到集合，并返回保存结果懂的promise对象
        return user.save();
    },
    //查找用户数据
    find(condition){
        console.log("find username = ",condition);
        return User.find(condition);
    }
}
//console.log("进入UserDao ",UserDao,User);
module.exports = UserDao;