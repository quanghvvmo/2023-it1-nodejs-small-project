'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.belongsTo(models.User, { foreignKey: 'userid' })
            Customer.hasMany(models.Order, { foreignKey: 'customerid', as: 'orderData' })

        }
    };
    Customer.init({
        userid: DataTypes.STRING,
        paymentMethod: DataTypes.INTEGER,
        isActive: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Customer',
    });
    return Customer;
};