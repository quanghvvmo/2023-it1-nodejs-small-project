import { DataTypes } from "sequelize";

export default (sequelize) => {
    const columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        tax: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        discount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false,
        },
    };

    const timeConfig = { timestamps: true };

    return sequelize.define("Order", columns, timeConfig);
};
