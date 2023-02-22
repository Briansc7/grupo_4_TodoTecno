/*
Manejador de Tablas Json. Esta lógica también podría ir en el controlador
*/ 

const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

//Se obtienen los datos de los usuarios
const usersJsonPath = path.resolve(__dirname,"./users.json");
let usersJsonRawData = fs.readFileSync(usersJsonPath); //guardo contenido json en variable
let usersData = JSON.parse(usersJsonRawData); //convierto json a objeto array

let usersDatabase = {
    usersData: usersData,
    userRegister: userRegister,
    userGetNewId: userGetNewId,
    emailExist: emailExist
};

function userRegister(userBody){

    if(this.emailExist(userBody.email)){
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
        image: [],
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

function emailExist(email){
    return this.usersData.find(user=>user.email==email);
}


module.exports = usersDatabase;