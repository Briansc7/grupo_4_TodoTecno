module.exports = (sequelize, dataTypes) => {
    let alias = 'StatusSale';
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
        }
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const StatusSale = sequelize.define(alias, cols, config); 


    StatusSale.associate = models => {
        StatusSale.hasMany(models.Sale, {
            as: "sales",
            foreignKey: "saleId"
        });
    };
 
    return StatusSale;
};