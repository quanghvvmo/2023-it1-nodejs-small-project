const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const { User } = require('./User');

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
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
}


exports.Customer = Customer;