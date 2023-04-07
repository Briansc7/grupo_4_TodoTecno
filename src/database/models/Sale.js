module.exports = (sequelize, dataTypes) => {
    let alias = 'Sale';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        productId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        chargeProducts: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        chargeDelivery: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        discountCuponAmount: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        chargeTotalSale: { //columna autogenerada por la BD
            type: 'chargeproducts+chargedelivery-discountcuponamount',
            set() {
              throw new Error('chargeTotalSale es de solo lectura')
            }
        },
        discountCuponId: {
            type: dataTypes.BIGINT(10).UNSIGNED
        },
        date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        storeId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        paymentMethodId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        isPickup: {
            type: dataTypes.BOLEAN.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
        statusId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const Sale = sequelize.define(alias, cols, config); 


    Sale.associate = models => {
        Sale.hasMany(models.DetailSale, {
            as: "detailSales",
            foreignKey: "saleId"
        });
        Sale.belongsTo(models.StatusSale, {
            as: "status",
            foreignKey: "statusId"
        });
        Sale.belongsTo(models.PaymentMethod, {
            as: "paymentMethod",
            foreignKey: "paymentMethodId"
        });
        Sale.belongsTo(models.DiscountCupon, {
            as: "discountCupon",
            foreignKey: "discountCuponId"
        });

        Sale.belongsToMany(models.Product, {
            as: "products",
            through: 'DetailSale',
            foreignKey: 'saleId',
            otherKey: 'productId'
        });
    };
 
    return Sale;
};