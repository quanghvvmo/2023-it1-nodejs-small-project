const BaseModel = require('../base');
const Product = require('../product');

module.exports = class productImages extends BaseModel{
    static tableName = 'productImages'
    static modelName = 'productImages'
    static schema = './schema'
    static include = [{
        model:Product,
        as:'product'
    }]
    static association(models){
        this.belongsTo(models)
    }
}