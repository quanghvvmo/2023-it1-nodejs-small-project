const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../dbconfig');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4 
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
    },
    isActive: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    },
    createdBy: {
        type: Sequelize.DATE,
    },
    updatedBy: {
        type: Sequelize.DATE,
    },
}, {
    timestamps: false,
    tableName: 'users',
});

User.associations = (models) => {
    User.hasMany(models.Customer, { foreignKey: {
        name: 'userId',
        allowNull: false,
        unique: true,
    }});
};

User.beforeSave(async (user, options) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

User.prototype.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

exports.User = User;