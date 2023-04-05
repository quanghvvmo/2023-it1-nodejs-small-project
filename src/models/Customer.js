const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4 
    },
    paymentMedthod: {
        type: DataTypes.INTEGER,
    },
    isActive: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'customers'
});

Customer.associations = (models) => {
    Customer.belongsTo(models.User, { foreignKey: 'userId' });
    Customer.hasMany(models.Order, { foreignKey: {
        name: 'customerId',
        allowNull: false,
        unique: true,
    }});
}


exports.Customer = Customer;