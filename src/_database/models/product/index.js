const BaseModel = require('../base')
const OrderDetail = require('../orderDetail')
module.exports = class order extends BaseModel {
    static tableName = 'product';
    static modelName = 'product';
    static schema = require('./schema');
    static include = [
        {
            model:OrderDetail,
            as:'orderDetail'
        }
    ]
    static associate(models){ 
        this.hasMany(models.OrderDetail,{as:'orderDetail'});
    }
}