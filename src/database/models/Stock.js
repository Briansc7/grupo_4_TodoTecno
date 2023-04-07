module.exports = (sequelize, dataTypes) => {
    let alias = 'Stock';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        productId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        storeId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        quantity: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false
        },
        statusId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        paranoid: true,
        freezeTableName: true
    }
    const Stock = sequelize.define(alias, cols, config); 


    Stock.associate = models => {
        Stock.belongsTo(models.Product, {
            as: "product",
            foreignKey: "productId"
        });

        Stock.belongsTo(models.Store, {
            as: "store",
            foreignKey: "storeId"
        });

        Stock.belongsTo(models.StatusStock, {
            as: "status",
            foreignKey: "statusId"
        });
    };
 
    return Stock;
};