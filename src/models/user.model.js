import { DataTypes } from "sequelize";

export default (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(32),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(250),
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            isActive: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );

    return User;
};
