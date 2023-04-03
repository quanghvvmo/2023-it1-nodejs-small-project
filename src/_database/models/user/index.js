const Sequelize = require('sequelize');
const BaseModel = require('../base');
const Customer = require('../customer');

module.exports = class User extends BaseModel {
    static tableName = 'user';
    static modelName = 'user';
    static schema = require('./schema')
    static include = [
        // {
        //     model: Customer,
        //     as:'customer',
        //     required: true
        // }
    ]
    static associate(models){
        this.hasOne(models.Customer,{foreignKey: 'customerId',targetKey:'id', as:'customer'})
    }
    
}