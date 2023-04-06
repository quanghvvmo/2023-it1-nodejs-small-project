'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.Customer, {
                foreignKey: 'customerid', targetKey: 'id', as: 'orderData', onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
            Order.hasOne(models.OrderDetail, {
                foreignKey: 'orderid', onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    };
    Order.init({
        customerid: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        tax: DataTypes.DOUBLE,
        discount: DataTypes.DOUBLE,
        totalPrice: DataTypes.DOUBLE,
        isDeleted: DataTypes.BOOLEAN,
        createBy: DataTypes.DATE,
        updateBy: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};