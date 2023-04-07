module.exports = (sequelize, dataTypes) => {
    let alias = 'Characteristic';
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
        }
    };
    let config = {
        timestamps: true,
        paranoid: true 
    }
    const Characteristic = sequelize.define(alias, cols, config); 


    Characteristic.associate = models => {
        Characteristic.belongsTo(models.Product, {
            as: "product",
            foreignKey: "productId"
        });
    };
 
    return Characteristic;
};