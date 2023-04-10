module.exports = (sequelize, dataTypes) => {
    let alias = 'InterestOption';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        installmentsQuantity: {
            type: dataTypes.TINYINT.UNSIGNED,
            allowNull: false
        },
        interestPorcentage: {
            type: dataTypes.TINYINT.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const InterestOption = sequelize.define(alias, cols, config); 


    InterestOption.associate = models => {
        InterestOption.hasMany(models.PaymentMethod, {
            as: "paymentMethods",
            foreignKey: "interestOption"
        });
    };
 
    return InterestOption;
};