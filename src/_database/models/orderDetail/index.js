const BaseModel = require('../base');
const Order = require('../order')
const Product = require('../product')
module.exports = class orderDetail extends BaseModel {
    static tableName = 'orderDetail'
    static modelName = 'orderDetail'
    static schema = require('./schema');
    static include = [
        
        {
            model:Order,
            as:'order'
        },
        {
            model:Product,
            as:'product'
        }
    ]
    static associate(models){
        this.belongsTo(models.Order)
        this.belongsTo(models.Product)
    }
}