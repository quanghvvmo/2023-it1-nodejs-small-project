const BaseModel = require('../base');
const User = require('../user');
const Order = require('../order');

module.exports = class customer extends BaseModel {
    static tableName = 'customer';
    static modelName = 'customer';
    static schema = require('./schema')
    static include = [
        {
            model: User,
            as: 'user'
        },
        {
            model:Order,
            as: 'order'
        }
    ]
    static associate(models){
        this.belongsTo(models.User);
        this.hasMany(models.Order,{as: 'order'})
    }
}