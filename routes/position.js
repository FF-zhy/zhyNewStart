var express = require('express');
var router = express.Router();

const multer = require("multer");
//引入用户业务逻辑处理对象
var path = require("path");
const PositionService = require("../services/position/position_service.js");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//配置注册处理事件,完整路径应加上调用router的路径
// router.post('/add',PositionService.add);

//配置：服务器磁盘中保存
var storage = multer.diskStorage({
  //目标目录
  destination: function(req,file, cb){
    cb(null,path.join(__dirname,"../public/img/upload/"));
  },
  filename : function(req,file, cb){
    // 文件后缀
    const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
    cb(null,file.fieldname + "-" + Date.now()+ ext);
  }
});

var upload = multer({storage: storage});

//添加职位,完整URL: "/api/positions/add"
router.post("/add",upload.single("posLogo"), PositionService.add);
// 按页查询职位
router.get("/find_by_page", PositionService.findByPage);
//删除该 职位
router.post("/delete_by_id", PositionService.deleteById);


// 更新职位 信息 ……
router.post("/modify_by_id", PositionService.modifyById);



module.exports = router;