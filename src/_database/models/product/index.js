const BaseModel = require('../base')

module.exports = class order extends BaseModel {
    static tableName = 'product';
    static modelName = 'product';
    static schema = require('./schema');
    static include = []
    static associate(models){ 
        
    }
}