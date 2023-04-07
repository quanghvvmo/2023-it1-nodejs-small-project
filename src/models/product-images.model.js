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
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: false,
        },
    };

    const timeConfig = {
        timestamps: "true",
    };

    return sequelize.define("ProductImages", columns, timeConfig);
};
