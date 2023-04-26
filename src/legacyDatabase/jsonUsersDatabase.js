/*
Manejador de Bases de Datos relacionadas con el usuario.
Antes se usaba para almacenar los datos en json, ahora se usa mysql
TODO renombrar nombre quitando Json
*/ 

const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const authTokenUtilities = require(path.resolve(__dirname,"../legacyDatabase/authTokenUtilities"));

//agregado uso de BD mysql
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Users = db.User;
const Roles = db.Role;
const ContactInformation = db.ContactInformation;


let usersDatabase = {
    userRegister: userRegister,
    userGetNewId: userGetNewId,
    userFindByEmail: userFindByEmail,
    checkPassword: checkPassword,
    userGetName: userGetName,
    userGetToken: userGetToken,
    userGetUserId: userGetUserId,
    userFindById: userFindById,
    getAllUsers: getAllUsers,
    userCreate:userCreate,
    userDeleteById:userDeleteById,
    userUpdate: userUpdate    

};

async function userRegister(userBody, avatar){

    if(await this.userFindByEmail(userBody.email)){
        console.log("Email ya existe");
        return -1; //no se registra si el email ya fue registrado por otro usuario
    }

    let userRoleId = await Roles.findAll({where: {name: "user"}});

    if(!userRoleId){
        console.log("Rol no encontrado");
        return -2;
    }

    userRoleId = userRoleId[0].id;

    const user = {
        email: userBody.email,
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        password: bcrypt.hashSync(userBody.password, 10),
        image: avatar?avatar.filename:null,
        roleId: userRoleId
    };

    let newUser = await Users.create(user);

    return newUser;
}

function userGetNewId(){
    return Math.max.apply(Math,this.usersData.map(user=>user.id))+1;
}

async function userFindByEmail(email){
    let userFound = await Users.findAll({
        where: {email: email}
    });  
    
    return userFound?userFound[0]:null;
}

async function checkPassword(email, password){
    let userFound = await this.userFindByEmail(email);

    if(!userFound){
        return false;
    }

    return bcrypt.compareSync(password, userFound.password);

}

async function userGetName(email){
    let userFound = await this.userFindByEmail(email);

    if(!userFound){
        return null;
    }

    return userFound.firstName;
}

async function userGetToken(email){
    let userFound = await this.userFindByEmail(email);

    if(!userFound){
        return null;
    }

    let userRole = await Roles.findByPk(userFound.roleId);

    if(!userRole){
        console.log("Rol no encontrado");
        return -2;
    }

    //Se genera un token que va a tener los permisos de administrador o de usuario
    //En un futuro se va a delegar la tarea a un servidor de authenticación 
    return authTokenUtilities.generateToken(
        {
            id: userFound.id,
            role: userRole.name
        }
    );
}

async function userGetUserId(email){
    let userFound = await this.userFindByEmail(email);

    if(!userFound){
        return null;
    }

    return userFound.id;
}

async function userFindById(id){

    let userFound = await Users.findByPk(id);

    return userFound;
}

async function getAllUsers(){
    let users = await Users.findAll({include: ["role"]});
    return users;
}

async function userCreate(onlyUserInfo, contactInfo){    

    let newUser = await Users.create(onlyUserInfo)

    newUser.createUserContactInformation(contactInfo);

    return newUser
}

async function userDeleteById(id){

    await Users.destroy({where: {id}});
};

async function userUpdate(id, userInfo){

    await Users.update(userInfo,{where: {id}});
};
module.exports = usersDatabase;