module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
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
    const Category = sequelize.define(alias, cols, config); 


    Category.associate = models => {
        Category.hasMany(models.SubCategory, {
            as: "subCategories",
            foreignKey: "categoryId"
        });

        Category.hasMany(models.BrandsOfCategories, {
            as: "brandsOfCategoriesFromCategory",
            foreignKey: "categoryId"
        });

        Category.belongsToMany(models.Brand, {
            as: "brandsOfCategory",
            through: 'brandsOfCategories',
            foreignKey: 'categoryId',
            otherKey: 'brandId'
        });
    };

        
 
    return Category;
};