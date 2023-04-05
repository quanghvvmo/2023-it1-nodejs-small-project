import httpStatus from "http-status";
import { addOrder } from "../services/order.service.js";
import { createOrderSchema } from "../validations/order.validation.js";

const createOrderController = async (req, res, next) => {
    try {
        const { error, value } = createOrderSchema.validate(req.body);
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json(error.details[0].message);
        }

        const createdOrderId = await addOrder(req.user.id, value);
        return res.status(httpStatus.CREATED).json(createdOrderId);
    } catch (error) {
        next(error);
    }
};

export { createOrderController };
