const Sequelize = require('sequelize');

module.exports = {
    id:{
        type:Sequelize.STRING(36),
        allowNull:false,
        primaryKey:true,
        defaultValue: Sequelize.UUIDV1
    },
    paymentMethod:{
        type:Sequelize.INTEGER(10),
        allowNull:true
    },
    isActive:{
        type:Sequelize.INTEGER(1),
        allowNull:true
    }
}