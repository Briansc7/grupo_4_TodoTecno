module.exports = (sequelize, dataTypes) => {
    let alias = 'ContactInformation';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        address: {
            type: dataTypes.STRING(45)
        },
        location: {
            type: dataTypes.STRING(45)
        },
        province: {
            type: dataTypes.STRING(45)
        },
        zipCode: {
            type: dataTypes.STRING(8)
        },
        phone: {
            type: dataTypes.STRING(15)
        }
        
    };
    let config = {
        timestamps: true,
        /*Sequelize supports the concept of paranoid tables. 
        A paranoid table is one that, when told to delete a record, it will not truly delete it. 
        Instead, a special column called deletedAt will have its value set to the timestamp of that deletion request.
        This means that paranoid tables perform a soft-deletion of records, instead of a hard-deletion.*/
        paranoid: true,
        freezeTableName: true
    }
    const ContactInformation = sequelize.define(alias, cols, config); 


    ContactInformation.associate = models => {
        ContactInformation.hasMany(models.User, {
            as: "users",
            foreignKey: "contactInfoId"
        });

        ContactInformation.hasMany(models.Store, {
            as: "stores",
            foreignKey: "contactInfoId"
        });

        ContactInformation.hasMany(models.Sale, {
            as: "sales",
            foreignKey: "contactInfoId"
        });
    };
 
    return ContactInformation;
};