module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
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
    const Brand = sequelize.define(alias, cols, config); 


    Brand.associate = models => {
        Brand.hasMany(models.Product, {
            as: "products",
            foreignKey: "brandId"
        });
    };
 
    return Brand;
};