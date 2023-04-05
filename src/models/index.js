import Sequelize from "sequelize";
import applyExtraSetup from "./associates.js";

import config from "../config/index.js";
import userModel from "./user.model.js";
import customerModel from "./customer.model.js";
import orderModel from "./order.model.js";
import productModel from "./product.model.js";
import orderDetailsModel from "./order-details.model.js";
import productImagesModel from "./product-images.model.js";

const sequelize = new Sequelize(config.db_database, config.db_username, config.db_password, {
    host: config.db_host,
    port: config.db_port,
    dialect: config.db_dialect,
});

// models
const models = [
    userModel,
    customerModel,
    orderModel,
    productModel,
    orderDetailsModel,
    productImagesModel,
];

for (const model of models) {
    model(sequelize);
}

// associates
applyExtraSetup(sequelize);

// sync
sequelize.sync({ force: true }).then(() => {
    console.log("Sync successfully.");
});

export default sequelize;
