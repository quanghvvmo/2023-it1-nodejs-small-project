import { addUser } from "../services/user.service.js";
import httpStatus from "http-status";
import { createSchema } from "../validations/user.validation.js";

const addUserController = async (req, res, next) => {
    try {
        const { error, value } = createSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
        }

        const createdUserId = await addUser(value);
        return res.status(httpStatus.CREATED).json(`User ${createdUserId} created !`);
    } catch (error) {
        next(error);
    }
};

export { addUserController };
