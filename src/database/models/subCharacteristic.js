module.exports = (sequelize, dataTypes) => {
    let alias = 'SubCharacteristic';
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
        characteristicId: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        value: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        paranoid: true 
    }
    const SubCharacteristic = sequelize.define(alias, cols, config); 


    SubCharacteristic.associate = models => {
        SubCharacteristic.belongsTo(models.Characteristic, {
            as: "characteristic",
            foreignKey: "characteristicId"
        });

        
    };
 
    return SubCharacteristic;
};