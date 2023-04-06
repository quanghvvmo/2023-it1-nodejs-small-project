const path = require('path');
const Umzug = require('umzug');
const { sequelize } = require('../config/database');
const sequelizeConfig = require('../../.sequelizerc');


var migrationsConfig = {
    storage: "sequelize",
    storageOptions: {
        sequelize: sequelize,
      // modelName: 'SequelizeMeta' // No need to specify, because this is default behaviour
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        sequelize.constructor
      ],
      truncate: false,
      path: sequelizeConfig['migrations-path'],
      pattern: /\.js$/
    }
  };
  
  var seedsConfig = {
    storage: "sequelize",
    storageOptions: {
        sequelize: sequelize,
      modelName: 'SequelizeData' // Or whatever you want to name the seeder storage table
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(),
        sequelize.constructor
      ],
      truncate: false,
      path: sequelizeConfig['seeders-path'],
      pattern: /\.js$/
    }
  };

var migrator = new Umzug(migrationsConfig);
var seeder = new Umzug(seedsConfig);
const migrate = () => {
    return migrator.up().then(() => seeder.up());
}

module.exports = {
    migrate,
}