import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Order = sequelize.define(
        "Order",
        {
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
            },
        },
        {
            timestamps: true,
        }
    );

    return Order;
};
