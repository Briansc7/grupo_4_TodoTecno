module.exports = (sequelize, dataTypes) => {
    let alias = 'DetailSale';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        saleId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        productId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        quantity: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false
        },
        unitPrice: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false
        },
        discountPorc: {
            type: dataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        chargeTotal: { //columna autogenerada por la BD
            type: 'quantity*unitprice*(100 - discountporc)/100',
            set() {
              throw new Error('chargeTotal es de solo lectura')
            }
        }
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const DetailSale = sequelize.define(alias, cols, config); 


    DetailSale.associate = models => {
        DetailSale.belongsTo(models.Product, {
            as: "product",
            foreignKey: "productId"
        });

        DetailSale.belongsTo(models.Sale, {
            as: "sale",
            foreignKey: "saleId"
        });
    };
 
    return DetailSale;
};