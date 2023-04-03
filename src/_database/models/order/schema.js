const Sequelize = require('sequelize');
module.exports = {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    customerId:{
        type:Sequelize.STRING(36),
        allowNull:false,
        primaryKey:true,
        defaultValue: Sequelize.UUIDV1
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:true
    },
    tax:{
        type:Sequelize.DOUBLE,
        allowNull:true
    },
    discount:{
        type:Sequelize.DOUBLE,
        allowNull:true
    },
    totalPrice:{
        type:Sequelize.DOUBLE,
        allowNull:true
    },
    isDeleted:{
        type:Sequelize.INTEGER(1),
        defaultValue:1
    },
    
}