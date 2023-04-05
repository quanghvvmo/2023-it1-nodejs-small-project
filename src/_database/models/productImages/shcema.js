const Sequelize = require('sequelize')

module.exports = {
    id:{
        type:Sequelize.STRING(36),
        primaryKey:true,
        defaultValue:Sequelize.UUIDV1
    },
    name:{
        type:Sequelize.STRING(36),
        unique:true,
        allowNull:false,
    },
    productId:{
        type:Sequelize.STRING(36),
        allowNull:false,
        references:{
            model:'product',
            key:'id'
        }
    },
    url:{
        type:Sequelize.STRING(500),
        allowNull:true,
        
    }
}