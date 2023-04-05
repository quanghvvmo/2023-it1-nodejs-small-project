import APIError from "../helper/apiError.js";
import httpStatus from "http-status";
import sequelize from "../models/index.js";

const { User, Order, OrderDetails, Customer } = sequelize.models;

const addOrder = async (currentUserId, payload) => {
    const t = await sequelize.transaction();

    // find current customer
    const currentUser = await User.findOne({
        include: [Customer],
        where: { id: currentUserId },
    });
    const customerId = currentUser.Customer.id;

    let newOrder;
    const totalPrice = payload.price + payload.tax - payload.discount;
    try {
        newOrder = await Order.create(
            { ...payload, totalPrice, CustomerId: customerId },
            { transaction: t }
        );

        await OrderDetails.create(
            { ...payload, totalPrice, OrderId: newOrder.id },
            { transaction: t }
        );

        await t.commit();
    } catch (error) {
        await t.rollback();
        console.log(error);
        throw new APIError({
            message: "Transaction got error !",
            status: httpStatus.INTERNAL_SERVER_ERROR,
        });
    }

    return newOrder.id;
};

export { addOrder };
