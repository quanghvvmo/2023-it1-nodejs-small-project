const dotenv = require('dotenv')
dotenv.config();
const env = process.env.NODE_ENV

const configs = {

    base: {
        env,
        // Application
        name: process.env.APP_NAME || 'SIMPLE_APP_NAME',
        host: process.env.HTTP_HOST || 'localhost',
        port: process.env.HTTP_PORT || 3000,
        // Database
        db_host: process.env.DB_HOST || 'localhost',
        db_port: process.env.DB_PORT || 3306,
        db_dialect: process.env.DB_DIALECT || 'mysql',
        db_username: process.env.DB_USERNAME || 'root',
        db_password: process.env.DB_PASSWORD || '',
        db_database: process.env.DB_DATABASE || 'miniproject',
        // db_recreate: process.env.DB_RECREATE == 'true',
        db_recreate: true,
        db_run_migration: process.env.DB_RUN_MIGRATION != 'false',
        db_run_migration: '',
        //paginate
        DEFAULT_LIMIT: 10,
        DEFAULT_OFFSET:0
    }
}
const config = Object.assign(configs.base, configs[env]);

module.exports = config;