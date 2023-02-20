/*
Manejador de Tablas Json. Esta lógica también podría ir en el controlador
*/ 

const path = require("path");
const fs = require("fs");

//Se obtienen los datos de los usuarios
const usersJsonPath = path.resolve(__dirname,"./users.json");
let usersJsonRawData = fs.readFileSync(usersJsonPath); //guardo contenido json en variable
let usersData = JSON.parse(usersJsonRawData); //convierto json a objeto array

let usersDatabase = {
    usersData: usersData,
    userRegister: userRegister,
    userGetNewId: userGetNewId
};

function userRegister(user){

    if(emailExist(user.email)){
        console.log("Email ya existe");
        return -1;
    }

    const newId = this.userGetNewId();

    user.id = newId;

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


module.exports = usersDatabase;