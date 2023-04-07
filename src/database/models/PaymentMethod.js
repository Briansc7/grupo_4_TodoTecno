module.exports = (sequelize, dataTypes) => {
    let alias = 'PaymentMethod';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        interestOption: { //puede no tenerlo y ser null
            type: dataTypes.BIGINT(10).UNSIGNED
        }
    };
    let config = {
        timestamps: true,
        paranoid: true
    }
    const PaymentMethod = sequelize.define(alias, cols, config); 


    PaymentMethod.associate = models => {
        PaymentMethod.hasMany(models.Sale, {
            as: "sales",
            foreignKey: "paymentMethodId"
        });
        PaymentMethod.belongsTo(models.InterestOption, {
            as: "interestOption",
            foreignKey: "interestOption"
        });
    };
 
    return PaymentMethod;
};