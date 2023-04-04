const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('order_management', 'root', '12345678', {
    dialect: "mysql",
    host: "localhost"
});

function init() {
    sequelize.sync().then(res => {
        console.log("Database connection succeed . . .");
    }).catch(err => console.log("Errors:", err));
}

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Database connection established . . .");
    } catch (error) {
        console.log(error);
    }
}

function close() {
    sequelize.close();
}

exports.init = init;
exports.connect = connect;
exports.close = close;
exports.sequelize = sequelize;



