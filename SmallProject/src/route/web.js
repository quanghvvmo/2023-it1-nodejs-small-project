import customerRoute from "../route/customerRoute"
import orderRoute from "../route/orderRoute"
import productRoute from "../route/productRoute"
import userRoute from "../route/userRoute"
import orderDetailRoute from "../route/orderDetailRoute"

let initWebRoute = (app) => {
    app.use(userRoute)
    app.use(customerRoute)
    app.use(orderRoute)
    app.use(productRoute)
    app.use(orderDetailRoute)
    return app;
}
module.exports = initWebRoute;