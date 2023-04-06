'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.hasMany(models.OrderDetail, {
                foreignKey: 'productid', as: 'orderDetailData', onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
            Product.hasOne(models.ProductImage, {
                foreignKey: 'productid',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })

        }
    };
    Product.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        tax: DataTypes.DOUBLE,
        discount: DataTypes.DOUBLE,
        totalPrice: DataTypes.DOUBLE,
        isDeleted: DataTypes.BOOLEAN,
        createBy: DataTypes.DATE,
        updateBy: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};