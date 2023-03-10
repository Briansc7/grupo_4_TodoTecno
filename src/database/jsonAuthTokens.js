const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

//Se obtienen los Tokens
const tokensJsonPath = path.resolve(__dirname,"./authenticationTokens.json");
let tokensJsonRawData = fs.readFileSync(tokensJsonPath); //guardo contenido json en variable
let tokensData = JSON.parse(tokensJsonRawData); //convierto json a objeto array

let authDatabase = {
    tokensData: tokensData,
    generateAndSaveToken: generateAndSaveToken,
    isValidToken: isValidToken,
    isValidAdminToken: isValidAdminToken
};

function generateAndSaveToken(userId, userRole){
    const token = createToken(userId, userRole);

    const result = addToken(userId, token);

    return result?token:null;
}

function createToken(userId, userRole){
    return bcrypt.hashSync(userId+userRole+"Token", 10);
}

function addToken(userId, token){
    let authRegistry = {
        id: null,
        userId: userId,
        token: token
    };

    authRegistry.id = tokenGetNewId();

    if(authRegistry.id){

        this.tokensData.push(authRegistry);

        writeJson(tokensJsonPath, this.tokensData);
    }

    return authRegistry.id;

}

function isValidToken(userId, token){
    const requiredTokenOption1 = ""+userId+"userToken";
    const requiredTokenOption2 = ""+userId+"adminToken";
    return bcrypt.compareSync(requiredTokenOption1, token) || bcrypt.compareSync(requiredTokenOption2, token);
}

function isValidAdminToken(userId, token){
    const requiredToken = ""+userId+"adminToken";
    return bcrypt.compareSync(requiredToken, token);
}

function writeJson(destination, data) {
    let jsonRawData = JSON.stringify(data, null, 2);
    fs.writeFileSync(destination, jsonRawData);
}

function tokenGetNewId(){
    return Math.max.apply(Math,this.tokensData.map(user=>user.id))+1;
}


module.exports = authDatabase;