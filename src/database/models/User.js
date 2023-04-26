module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        birthday: {
            type: dataTypes.DATEONLY
        },
        contactInfoId: {
            type: dataTypes.BIGINT(10).UNSIGNED
        },
        image: {
            type: dataTypes.STRING(45)
        },
        roleId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
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
    const User = sequelize.define(alias, cols, config); 


    User.associate = models => {
        User.belongsTo(models.Role, {
            as: "role",
            foreignKey: "roleId"
        });

        User.hasMany(models.CuponsUsedByUser, {
            as: "cuponsUsedByUsers",
            foreignKey: "userId"
        });

        User.hasMany(models.Sale, {
            as: "sales",
            foreignKey: "userId"
        });

        User.hasMany(models.CuponsUsedByUser, {
            as: "cuponsUsedByUsersFromUser",
            foreignKey: "userId"
        });

        User.belongsToMany(models.DiscountCupon, {
            as: "discountCupons",
            through: 'CuponsUsedByUser',
            foreignKey: 'userId',
            otherKey: 'cuponId'
        });

        User.belongsTo(models.ContactInformation, {
            as: "userContactInformation",
            foreignKey: "contactInfoId"
        });
    };
 
    return User;
};