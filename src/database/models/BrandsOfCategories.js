module.exports = (sequelize, dataTypes) => {
    let alias = 'BrandsOfCategories';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        brandId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        categoryId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        paranoid: true,
        freezeTableName: true //You can stop the auto-pluralization performed by Sequelize using the freezeTableName: true option. This way, Sequelize will infer the table name to be equal to the model name, without any modifications
    }
    const BrandsOfCategories = sequelize.define(alias, cols, config); 


    BrandsOfCategories.associate = models => {
        BrandsOfCategories.belongsTo(models.Brand, {
            as: "brandOfCategory",
            foreignKey: "brandId"
        });

        BrandsOfCategories.belongsTo(models.Category, {
            as: "categoryOfBrand",
            foreignKey: "categoryId"
        });
    };
 
    return BrandsOfCategories;
};