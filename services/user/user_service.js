// 引入 "UserDao" 依赖
const UserDao = require("../../dao/user/user_dao.js");

const UserService = {
    //用户‘业务逻辑层’处理
    register(req,res,next){
        // GET请求方式获取数据
        const {username,password,email} = req.query;
        //数据加密
       
        //将用户注册信息发送到数据访问层处理,userDao 返回一个promise对象
        UserDao.save({username,password,email})
                .then((data)=>{
                    console.log(data);
                    res.json({res_code:1, res_error:"", res_body:{status: 1, message:"success", data:{username: data.username}}});
                })
                .catch((err)=>{
                    res.json({res_code:1, res_error:"", res_body:{status: 0, message:"failed:" + err, data: {}}});
                });

    },

    // login
    login(req,res,next){
        //post 请求用球 获取数据
        const {username,password} = req.body;
        console.log("username = ",username)
        UserDao.find({username})
                .then((data) =>{
                    console.log("findData = ",data);
                    // 判断密码
                    if(data.length ===1) {
                        if(password === data[0].password) {
                            res.json({
                                res_code:1,
                                res_error:"",
                                res_body:{
                                    status:1,
                                    message:"success",
                                    data:{
                                        username: data[0].username
                                    }
                                }
                            });
                        } else { //密码不一致
                            res.json({
                                res_code:1,
                                res_error:"",
                                res_body:{
                                    status:0,
                                    message:"密码错误",
                                    data:{}
                                }
                            });
                        }
                    } else { //不存在该用户名
                        res.json({
                            res_code: 1,
                            res_error:"",
                            res_body: {
                                status: 0,
                                message: "用户名不存在",
                                data: {}
                            }
                        })
                    }
                   
                })
                .catch((err) =>{
                    res.json({
                        res_code:0,
                        res_error:err,
                        res_body:{}
                    });
                });
    },

    //检测用户失败、否存在
    check(req,res,next) {

    },

    //注销退出
    logout(req,res,next) {

    }

}
//console.log("user_service",UserDao);
module.exports = UserService;