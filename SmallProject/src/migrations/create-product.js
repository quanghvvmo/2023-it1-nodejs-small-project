'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DOUBLE,
            },
            tax: {
                type: Sequelize.DOUBLE,
            },
            discount: {
                type: Sequelize.DOUBLE
            },
            totalPrice: {
                type: Sequelize.DOUBLE
            },
            isDeleted: {
                type: Sequelize.BOOLEAN
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
        await queryInterface.dropTable('Product');
    }
};