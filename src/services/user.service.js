import APIError from "../helper/apiError.js";
import httpStatus from "http-status";
import sequelize from "../models/index.js";

const { User } = sequelize.models;

const addUser = async (payload) => {
    // Check if the username already exist
    const existingUser = await User.findOne({ where: { username: payload.username } });
    if (existingUser) {
        throw new APIError({ message: "User already exist !", status: httpStatus.CONFLICT });
    }

    const newUser = await User.create({
        ...payload,
        isActive: true,
    });
    return newUser.id;
};

export { addUser };
