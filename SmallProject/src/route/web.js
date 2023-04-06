import customerRoute from "../route/customerRoute"
import orderRoute from "../route/orderRoute"
import productRoute from "../route/productRoute"
import userRoute from "../route/userRoute"
import orderDetailRoute from "../route/orderDetailRoute"
import productImgRoute from "../route/productImgRoute"

let initWebRoute = (app) => {
    app.use(userRoute)
    app.use(customerRoute)
    app.use(orderRoute)
    app.use(productRoute)
    app.use(orderDetailRoute)
    app.use(productImgRoute)
    return app;
}
module.exports = initWebRoute;