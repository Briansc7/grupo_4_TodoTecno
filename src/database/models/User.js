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
        address: {
            type: dataTypes.TEXT
        },
        zipcode: {
            type: dataTypes.STRING(8)
        },
        location: {
            type: dataTypes.TEXT
        },
        province: {
            type: dataTypes.STRING(45)
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
        //createdAt: true,
        //updatedAt: true,
        //deletedAt: true
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
    };
 
    return User
};