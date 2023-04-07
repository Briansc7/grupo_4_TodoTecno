module.exports = (sequelize, dataTypes) => {
    let alias = 'DiscountCupon';
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
        cuponCode: {
            type: dataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        startDate: {
            type: dataTypes.DATEONLY
        },
        endDate: {
            type: dataTypes.DATEONLY
        },
        discountPorcentage: {
            type: dataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        minPurchaseRequired: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED
        },
        maxDiscountValue: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED
        },
        maxUsesPerUser: {
            type: dataTypes.SMALLINT.UNSIGNED,
            allowNull: false,
            defaultValue: 1
        },
        maxUsesTotal: {
            type: dataTypes.INT.UNSIGNED
        },
        usesCount: {
            type: dataTypes.INT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const DiscountCupon = sequelize.define(alias, cols, config); 


    DiscountCupon.associate = models => {
        DiscountCupon.hasMany(models.Sale, {
            as: "sales",
            foreignKey: "discountCuponId"
        });
        DiscountCupon.hasMany(models.CuponsUsedByUser, {
            as: "cuponsUsedByUsers",
            foreignKey: "cuponId"
        });
        DiscountCupon.belongsToMany(models.User, {
            as: "users",
            through: 'CuponsUsedByUser',
            foreignKey: 'cuponId',
            otherKey: 'userId'
        });
    };
 
    return DiscountCupon;
};