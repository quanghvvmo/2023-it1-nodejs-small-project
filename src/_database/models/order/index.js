const BaseModel = require('../base')
const Customer = require('../customer');

module.exports = class order extends BaseModel {
    static tableName = 'order';
    static modelName = 'order';
    static schema = require('./schema');
    static include = [
        {
            model: Customer,
            as: 'customer'
        }
    ]
    static associate(models){ 
        this.belongsTo(models.Customer,{as: 'customer'});
    }
}