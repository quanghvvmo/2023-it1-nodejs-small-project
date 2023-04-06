const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    price: {
        type: DataTypes.DOUBLE,
    },
    tax: {
        type: DataTypes.DOUBLE,
    },
    discount: {
        type: DataTypes.DOUBLE,
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    createdBy: {
        type: DataTypes.DATE,
    },
    updatedBy: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false,
    tableName: 'customers'
});

Product.associations = (models) => {
    Product.hasMany(models.OrderDetail, { foreignKey: {
        name: 'productId',
        allowNull: false,
        unique: true,
    }});
    
}