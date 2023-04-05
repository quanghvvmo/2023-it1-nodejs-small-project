const Sequelize = require('sequelize');
module.exports = {
    id: {
        type: Sequelize.STRING(36),
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    tax: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    discount: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    totalPrice: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    isDeleted: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
}