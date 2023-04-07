module.exports = (sequelize, dataTypes) => {
    let alias = 'BoughtTogether';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product1: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        product2: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        timesBoughtTogether: {
            type: dataTypes.INT.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        paranoid: true,
        freezeTableName: true //You can stop the auto-pluralization performed by Sequelize using the freezeTableName: true option. This way, Sequelize will infer the table name to be equal to the model name, without any modifications
    }
    const BoughtTogether = sequelize.define(alias, cols, config); 


    BoughtTogether.associate = models => {
        BoughtTogether.belongsTo(models.Product, {
            as: "product1",
            foreignKey: "product1"
        });

        BoughtTogether.belongsTo(models.Product, {
            as: "product2",
            foreignKey: "product2"
        });
    };
 
    return BoughtTogether;
};