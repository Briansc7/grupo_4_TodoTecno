module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductImage';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fileName: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        productId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const ProductImage = sequelize.define(alias, cols, config); 


    ProductImage.associate = models => {
        ProductImage.belongsTo(models.Product, {
            as: "product",
            foreignKey: "productId"
        });
    };
 
    return ProductImage;
};