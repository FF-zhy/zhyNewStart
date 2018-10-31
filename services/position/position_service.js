const PositionDao = require("../../dao/position/position_dao.js");

const PositionService = {
    //添加职位数据
    add(req,res, next) {
        // 获取 POST 请求中传递的数据
        const {company,posName, salary} = req.body;
        let logo ="";
        if(req.file){
            logo = "/img/upload/" + req.file.filename;
        }
        // 保存到数据库中
        PositionDao.addDao({company, posName, salary,logo})
                    .then((data) =>{
                        res.json({
                            res_code: 1,
                            res_error: "",
                            res_body: {
                                status: 1,
                                data: data
                            }
                        });
                    })
                    .catch((err) =>{ //保存数据库失败
                        res.json({
                            res_code: 0,
                            res_error: err,
                            res_body: {}
                        })
                    })
    },
    // 查询字符数据
    findByPage(req,res,next) {
        // 获取查询页码
        const {page} = req.query;
        PositionDao.findByPage( page)
                    .then((data) =>{
                        res.json({
                            res_code:1,
                            res_error:"",
                            res_body: {
                                status:1,
                                // 待渲染的数组结构 数据
                                list: data
                            }
                        })
                    })
                    .catch((err) =>{
                        res.json({
                            res_code: 0,
                            res_error: err,
                            res_body: {}
                        })
                    })
    },
    //删除数据
    deleteById(req, res, next) {
        const id = req.body;
        // 数据库操作
        console.log( "deleteByIdDao__________",PositionDao.deleteByIdDao(id.id) );
        PositionDao.deleteByIdDao(id.id)
                    .then( (data) => {
                        res.json({
                            res_code: 1,
                            res_error: "",
                            res_body: {}
                        });
                    })
                    .catch((err) =>{
                        res.json({
                            res_code: 0,
                            res_error: err,
                            res_body: {}
                        });
                    })
            
    },
    // 修改职位信息
    modifyById(req, res, next) {
        // 获取待更新的id,以及相关数据，post
        const {id,company,posName, salary} = req.body;
        //数据库更新
        PositionDao.modify({company, posName, salary,id})
                    .then((data) => {
                        res.json({
                            res_code:1,
                            res_error:"",
                            res_body:{
                                
                            }
                        })
                    })
                    .catch((err) => {

                    })
    }

};

module.exports = PositionService;

