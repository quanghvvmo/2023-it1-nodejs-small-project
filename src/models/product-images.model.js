import { DataTypes } from "sequelize";

export default (sequelize) => {
    const ProductImages = sequelize.define(
        "ProductImages",
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
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isDeleted: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
        },
        {
            timestamps: "true",
        }
    );

    return ProductImages;
};
