'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.Customer, { foreignKey: 'userid' })

        }
    };
    User.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN,
        createBy: DataTypes.DATE,
        updateBy: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};