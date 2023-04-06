const BaseModel = require('../base')
const Customer = require('../customer');
const OrderDetail = require('../orderDetail');

module.exports = class order extends BaseModel {
    static tableName = 'order';
    static modelName = 'order';
    static schema = require('./schema');
    static include = [
        {
            model: Customer,
            as: 'customer'
        },
        {
            model:OrderDetail,
            as:'orderDetail'
        }
    ]
    static associate(models){ 
        this.belongsTo(models.Customer,{as: 'customer'});
        this.hasOne(models.Order,{as: 'order'});
    }
}