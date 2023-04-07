module.exports = (sequelize, dataTypes) => {
    let alias = 'StatusStock';
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
        paranoid: true,
        freezeTableName: true 
    }
    const StatusStock = sequelize.define(alias, cols, config); 


    StatusStock.associate = models => {
        StatusStock.hasMany(models.Stock, {
            as: "stocks",
            foreignKey: "statusId"
        });
    };
 
    return StatusStock;
};