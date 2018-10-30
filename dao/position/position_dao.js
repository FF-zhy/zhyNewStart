const {Position} = require("../model/model.js");

const PositionDao = {
    addDao(positionInfo) {
        console.log("PositionDao = ",PositionDao);
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
        return Position.deleteOne({_id : id})
    }
}

module.exports = PositionDao;