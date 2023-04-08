const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const columns = {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }

    const timestampConfig = {
        timestamps: true
    }

    return sequelize.define('Customer', columns, timestampConfig);
}