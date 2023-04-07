module.exports = (sequelize, dataTypes) => {
    let alias = 'CuponsUsedByUser';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        cuponId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        usesCount: {
            type: dataTypes.SMALLINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const CuponsUsedByUser = sequelize.define(alias, cols, config); 


    CuponsUsedByUser.associate = models => {
        CuponsUsedByUser.belongsTo(models.User, {
            as: "user",
            foreignKey: "userId"
        });

        CuponsUsedByUser.belongsTo(models.DiscountCupon, {
            as: "discountCupon",
            foreignKey: "cuponId"
        });
    };
 
    return CuponsUsedByUser;
};