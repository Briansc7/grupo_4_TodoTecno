module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        subCategoryId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        brandId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        model: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        artNumber: {
            type: dataTypes.BIGINT.UNSIGNED,
            unique: true
        },
        price: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false
        },
        discountPorc: {
            type: dataTypes.TINYINT.UNSIGNED
        },
        isOnSale: {
            type: dataTypes.BOLEAN.UNSIGNED,
            allowNull: false
        },
        isNew: {
            type: dataTypes.BOLEAN.UNSIGNED,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        }
        
    };
    let config = {
        timestamps: true,
        //createdAt: true,
        //updatedAt: true,
        //deletedAt: true
    }
    const Product = sequelize.define(alias, cols, config); 


    Product.associate = models => {
        Product.hasMany(models.productImage, {
            as: "productImages",
            foreignKey: "productId"
        });

        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brandId"
        });

        //TODO mas relaciones

        
    };
 
    return Product;
};