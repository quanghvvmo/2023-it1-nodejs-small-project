const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const columns = {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE
        },
        tax: {
            type: DataTypes.DOUBLE
        },
        discount: {
            type: DataTypes.DOUBLE
        },
        totalPrice: {
            type: DataTypes.DOUBLE,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }

    const timestampConfig = {
        timestamps: true
    }

    return sequelize.define('Order', columns, timestampConfig);
}