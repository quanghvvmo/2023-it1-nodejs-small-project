const BaseModel = require('../base');
const Product = require('../product');

module.exports = class productImages extends BaseModel {
    static tableName = 'productImages'
    static modelName = 'productImages'
    static schema = require('./schema');
    static include = [{
        model: Product,
        as: 'product'
    }]
    static associate(models) {
        this.belongsTo(models.Product)
    }
}