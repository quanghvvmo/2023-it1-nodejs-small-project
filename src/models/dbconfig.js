const { Sequelize } = require("sequelize");
const config = require("../config/index.js");
const { setUpAssociations } = require('./association.js');
const { setUpHooks } = require('./hooks.js');

const User = require('./User.js');
const Customer = require('./Customer.js');
const Order = require('./Order.js');
const Product = require('./Product.js');
const ProductImages = require('./ProductImages.js');
const OrderDetail = require('./OrderDetail.js');

const sequelize = new Sequelize(config.db_database, config.db_username, config.db_password, {
    host: config.db_host,
    port: config.db_port,
    dialect: config.db_dialect,
});

const models = [User, Customer, Order, Product, ProductImages, OrderDetail];

models.forEach(model => {
    model(sequelize);
});

setUpAssociations(sequelize);
setUpHooks(sequelize);

module.exports = sequelize;




