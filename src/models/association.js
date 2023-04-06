exports.setUpAssociations = (sequelize) => {
    const { User, Customer, Order, Product, OrderDetail, ProductImages } = sequelize.models;

    User.hasMany(Customer);
    Customer.belongsTo(User);

    Customer.hasMany(Order);
    Order.belongsTo(Customer);

    Product.hasMany(ProductImages);
    ProductImages.belongsTo(Product);

    Product.hasMany(OrderDetail);
    OrderDetail.belongsTo(Product);

    Order.hasOne(OrderDetail);
    OrderDetail.belongsTo(Order);
}