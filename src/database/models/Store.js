module.exports = (sequelize, dataTypes) => {
    let alias = 'Store';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            unique: true,
            allowNull: false
        },
        contactInfoId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT
        },
        shoppingHours: {
            type: dataTypes.STRING(60),
            allowNull: false
        }
        
    };
    let config = {
        timestamps: true,
        /*Sequelize supports the concept of paranoid tables. 
        A paranoid table is one that, when told to delete a record, it will not truly delete it. 
        Instead, a special column called deletedAt will have its value set to the timestamp of that deletion request.
        This means that paranoid tables perform a soft-deletion of records, instead of a hard-deletion.*/
        paranoid: true 
    }
    const Store = sequelize.define(alias, cols, config); 


    Store.associate = models => {
        Store.hasMany(models.Stock, {
            as: "stocks",
            foreignKey: "storeId"
        });

        Store.belongsTo(models.ContactInformation, {
            as: "storeContactInformation",
            foreignKey: "contactInfoId"
        });
    };
 
    return Store;
};