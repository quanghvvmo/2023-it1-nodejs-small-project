const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Order = sequelize.define('Order', {
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
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    },
    createdBy: {
        type: Sequelize.DATE,
    },
    updatedBy: {
        type: Sequelize.DATE,
    },
}, {
    timestamps: false,
    tableName: 'users',
});

Order.associations = (models) => {
    Order.belongsTo(models.Customer, { foreignKey: 'customerId' });
}

exports.Order = Order;
