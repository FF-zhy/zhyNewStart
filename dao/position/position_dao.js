const {Position} = require("../model/model.js");
const fs = require("fs");

const PositionDao = {
    // 保存变量

    //添加数据
    addDao(positionInfo) {
        const position = new Position(positionInfo);
        return position.save();
    },
    //按页码搜索
    findByPage(page){
        const pageSize=5 ;
        return Position.find({}).limit(pageSize).skip((page-1) * pageSize);
    },
    // 删除数据库集合中的对象
    deleteByIdDao(id){
        var path  ;
        var result;
        //return Position.deleteOne({_id : id});
         new Promise(function(resolve,reject) {

            Position.find({_id : id})
                    .then((data) => {
                        path =  data[0].logo;
                        // 判断logo是否存在
                        if(path) {
                            path = "../day4-proj/public" + path;
                            deleteImg();
                            async function deleteImg(){
                                fs.unlink(path,function(err) {
                                    if(err) {
                                        console.log("删除失败：",err)
                                        //resolve( );
                                    } else {
                                        console.log("删除成功" );
                                        resolve(Position.deleteOne({_id : id}))
                                    }
                                });
                            }
                            
                        } else {
                            // 不删除文件
                            console.log("没有待删除图片");
                           resolve( Position.deleteOne({_id : id}));
                        }
                    })

        }).then((data) => {
            console.log("data__________",data,new Promise((resolve,reject) => {
                resolve(data);
            }) )
            // 返回一个promise对象
            return new Promise((resolve) => {
                resolve(data);
            })
        })

        

    }
}

module.exports = PositionDao;