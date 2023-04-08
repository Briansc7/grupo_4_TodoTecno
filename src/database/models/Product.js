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
            type: dataTypes.TINYINT.UNSIGNED,
            defaultValue: 0
        },
        isOnSale: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        isNew: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        description: {
            type: dataTypes.TEXT
        }
        
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const Product = sequelize.define(alias, cols, config); 


    Product.associate = models => {
        Product.hasMany(models.ProductImage, {
            as: "productImages",
            foreignKey: "productId"
        });

        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brandId"
        });

        Product.hasMany(models.BoughtTogether, {
            as: "product1BoughtTogethers",
            foreignKey: "product1"
        });
        Product.hasMany(models.BoughtTogether, {
            as: "product2BoughtTogethers",
            foreignKey: "product2"
        });

        Product.belongsTo(models.SubCategory, {
            as: "subCategory",
            foreignKey: "subCategoryId"
        });

        Product.hasMany(models.Characteristic, {
            as: "characteristics",
            foreignKey: "productId"
        });

        Product.hasMany(models.Stock, {
            as: "stocks",
            foreignKey: "productId"
        });

        Product.hasMany(models.DetailSale, {
            as: "detailSales",
            foreignKey: "productId"
        });

        Product.belongsToMany(models.Sale, {
            as: "sales",
            through: 'DetailSale',
            foreignKey: 'productId',
            otherKey: 'saleId'
        });

        
    };
 
    return Product;
};