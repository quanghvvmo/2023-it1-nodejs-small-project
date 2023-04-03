const path = require('path');
const Umzug = require('umzug');
const { sequelize } = require('../config/database');


const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelize,
    },

    migrations: {
        params: [
            sequelize.getQueryInterface(), // queryInterface
            sequelize.constructor, // DataTypes
            function () {
                throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
            }
        ],
    },
});

const migrate = () => {
    return umzug.up();
}

module.exports = {
    migrate,
}