import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Product = sequelize.define(
        "Product",
        {
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
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: true,
            },
        },
        {
            timestamps: "true",
        }
    );

    return Product;
};
