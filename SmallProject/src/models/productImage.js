'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProductImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ProductImage.belongsTo(models.Product, {
                foreignKey: 'productid'
            })

        }
    };
    ProductImage.init({
        productid: DataTypes.STRING,
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        isDeleted: DataTypes.BOOLEAN,
        createBy: DataTypes.DATE,
        updateBy: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'ProductImage',
    });
    return ProductImage;
};