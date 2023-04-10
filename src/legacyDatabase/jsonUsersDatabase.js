/*
Manejador de Tablas Json. Esta lógica también podría ir en el controlador
*/ 

const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const authTokenUtilities = require(path.resolve(__dirname,"../legacyDatabase/authTokenUtilities"));

//Se obtienen los datos de los usuarios
const usersJsonPath = path.resolve(__dirname,"./users.json");
let usersJsonRawData = fs.readFileSync(usersJsonPath); //guardo contenido json en variable
let usersData = JSON.parse(usersJsonRawData); //convierto json a objeto array

//agregado uso de BD mysql
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Users = db.User;
const Roles = db.Role;

let usersDatabase = {
    usersData: usersData,
    userRegister: userRegister,
    userGetNewId: userGetNewId,
    userFindByEmail: userFindByEmail,
    checkPassword: checkPassword,
    userGetName: userGetName,
    userGetToken: userGetToken,
    userGetUserId: userGetUserId,
    userFindById: userFindById,
    getAllUsers:getAllUsers
};

async function userRegister(userBody, avatar){

    /* if(this.userFindByEmail(userBody.email)){
        console.log("Email ya existe");
        return -1; //no se registra si el email ya fue registrado por otro usuario
    }


    const newId = this.userGetNewId();

    const user = {
        id: newId,
        email: userBody.email,
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        password: bcrypt.hashSync(userBody.password, 10),
        birthday: null,
        address: null,
        postalCode: null,
        location: null,
        province: null,
        image: avatar?avatar.filename:null,
        role: "user"
    }

    this.usersData.push(user);

    writeJson(usersJsonPath, this.usersData);

    return user.id; */

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

    let newUserId = await Users.create(user);

    return newUserId;
}

function writeJson(destination, data) {
    let jsonRawData = JSON.stringify(data, null, 2);
    fs.writeFileSync(destination, jsonRawData);
}

function userGetNewId(){
    return Math.max.apply(Math,this.usersData.map(user=>user.id))+1;
}

async function userFindByEmail(email){
    //return this.usersData.find(user=>user.email==email);
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
    //return this.usersData.find(user=>user.id==id);

    let userFound = await Users.findByPk(id);

    return userFound;
}
async function getAllUsers(){
    let users = await Users.findAll();
    return users;
}

module.exports = usersDatabase;