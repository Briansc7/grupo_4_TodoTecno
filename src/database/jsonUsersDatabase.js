/*
Manejador de Tablas Json. Esta lógica también podría ir en el controlador
*/ 

const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const authTokenUtilities = require(path.resolve(__dirname,"../database/authTokenUtilities"));

//Se obtienen los datos de los usuarios
const usersJsonPath = path.resolve(__dirname,"./users.json");
let usersJsonRawData = fs.readFileSync(usersJsonPath); //guardo contenido json en variable
let usersData = JSON.parse(usersJsonRawData); //convierto json a objeto array

let usersDatabase = {
    usersData: usersData,
    userRegister: userRegister,
    userGetNewId: userGetNewId,
    userFindByEmail: userFindByEmail,
    checkPassword: checkPassword,
    userGetName: userGetName,
    userGetToken: userGetToken,
    userGetUserId: userGetUserId,
    userFindById: userFindById
};

function userRegister(userBody, avatar){

    if(this.userFindByEmail(userBody.email)){
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

    return user.id;
}

function writeJson(destination, data) {
    let jsonRawData = JSON.stringify(data, null, 2);
    fs.writeFileSync(destination, jsonRawData);
}

function userGetNewId(){
    return Math.max.apply(Math,this.usersData.map(user=>user.id))+1;
}

function userFindByEmail(email){
    return this.usersData.find(user=>user.email==email);
}

function checkPassword(email, password){
    let userFound = this.userFindByEmail(email);

    if(!userFound){
        return false;
    }

    return bcrypt.compareSync(password, userFound.password);

}

function userGetName(email){
    let userFound = this.userFindByEmail(email);

    if(!userFound){
        return null;
    }

    return userFound.firstName;
}

function userGetToken(email){
    let userFound = this.userFindByEmail(email);

    if(!userFound){
        return null;
    }

    //Se genera un token que va a tener los permisos de administrador o de usuario
    //En un futuro se va a delegar la tarea a un servidor de authenticación 
    return authTokenUtilities.generateToken(
        {
            id: userFound.id,
            role: userFound.role
        }
    );
}

function userGetUserId(email){
    let userFound = this.userFindByEmail(email);

    if(!userFound){
        return null;
    }

    return userFound.id;
}

function userFindById(id){
    return this.usersData.find(user=>user.id==id);
}

module.exports = usersDatabase;