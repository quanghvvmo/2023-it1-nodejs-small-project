import { DataTypes } from "sequelize";

export default (sequelize) => {
    const columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tax: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        discount: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        totalPrice: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
    };

    const timeConfig = {
        timestamps: "true",
    };

    return sequelize.define("Product", columns, timeConfig);
};
