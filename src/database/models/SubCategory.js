module.exports = (sequelize, dataTypes) => {
    let alias = 'SubCategory';
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
        categoryId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        paranoid: true 
    }
    const SubCategory = sequelize.define(alias, cols, config); 


    SubCategory.associate = models => {
        SubCategory.hasMany(models.Product, {
            as: "products",
            foreignKey: "subCategoryId"
        });

        SubCategory.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryId"
        });
    };
 
    return SubCategory;
};