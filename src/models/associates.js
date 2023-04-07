function applyExtraSetup(sequelize) {
    const { User, Customer, Order, Product, OrderDetails, ProductImages } = sequelize.models;

    User.hasOne(Customer, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Customer.belongsTo(User);

    Customer.hasMany(Order, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    Order.belongsTo(Customer);

    Product.hasMany(OrderDetails, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    OrderDetails.belongsTo(Product);

    Order.hasOne(OrderDetails, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    OrderDetails.belongsTo(Order);

    Product.hasOne(ProductImages, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    ProductImages.belongsTo(Product);
}

export default applyExtraSetup;
