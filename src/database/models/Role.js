module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
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
        }
    };
    let config = {
        timestamps: true,
        paranoid: true 
    }
    const Role = sequelize.define(alias, cols, config); 


    Role.associate = models => {
        Role.hasMany(models.User, {
            as: "users",
            foreignKey: "roleId"
        });
    };
 
    return Role;
};