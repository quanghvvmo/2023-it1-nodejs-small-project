'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            customerid: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            tax: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            discount: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            totalPrice: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createBy: {
                type: Sequelize.DATE
            },
            updateBy: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Orders');
    }
};