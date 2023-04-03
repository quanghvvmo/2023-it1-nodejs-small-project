function applyExtraSetup(sequelize) {
    const { User, Customer, Order, Product, OrderDetails, ProductImages } = sequelize.models;

    User.hasOne(Customer);
    Customer.belongsTo(User);

    Customer.hasMany(Order);
    Order.belongsTo(Customer);

    Product.hasMany(OrderDetails);
    OrderDetails.belongsTo(Product);

    Order.hasOne(OrderDetails);
    OrderDetails.belongsTo(Order);

    Product.hasOne(ProductImages);
    ProductImages.belongsTo(Product);
}

export default applyExtraSetup;
