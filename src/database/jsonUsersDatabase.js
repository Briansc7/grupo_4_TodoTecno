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

function userRegister(userBody){

    if(emailExist(userBody.email)){
        console.log("Email ya existe");
        return -1;
    }

    const newId = this.userGetNewId();

    const user = {
        id: newId,
        email: userBody.email,
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        password: userBody.password,
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
    return false;
}


module.exports = usersDatabase;