var express = require('express');
var router = express.Router();
//引入用户业务逻辑处理对象
const UserService = require("../services/user/user_service.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//配置注册处理事件,完整路径应加上调用router的路径
router.get('/register',UserService.register);
router.post('/login',UserService.login);

module.exports = router;


