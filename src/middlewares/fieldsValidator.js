const { body } = require("express-validator");

let validations = {
    /* Validaciones de usuario para registro, login y crud de usuarios*/
    validateEmailFormat: body("email").notEmpty().withMessage("No ingresó ningún email").bail()
    .isEmail().withMessage("Debe ingresar un email válido").bail()
    .isLength({max: 45}).withMessage("El email puede tener hasta 45 caracteres"),

    validatePasswordFormat: body("password").notEmpty().withMessage("No ingresó ninguna contraseña").bail()
    .isLength({min: 8, max: 45}).withMessage("La contraseña debe tener entre 2 y 45 caracteres"),

    validateFirstNameFormat: body("firstName").notEmpty().withMessage("No ingresó ningún nombre").bail()
    .isAlpha('es-ES', {ignore: ' '}).withMessage("El nombre no puede tener números ni caracteres especiales").bail()
    .isLength({min: 2, max: 45}).withMessage("El nombre debe tener entre 2 y 45 caracteres"),

    validateLastNameFormat: body("lastName").notEmpty().withMessage("No ingresó ningún apellido").bail()
    .isAlpha('es-ES', {ignore: ' '}).withMessage("El apellido no puede tener números ni caracteres especiales").bail()
    .isLength({min: 2, max: 45}).withMessage("El apellido debe tener entre 2 y 45 caracteres"), 

    validatePasswordRepeat: body("passwordRepeat").notEmpty().withMessage("Debe repetir la contraseña").bail()
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {
            // throw error if passwords do not match
            throw new Error("Las contraseñas no coinciden");
        } else {
            return value;
        }        
    }),

    userBirthday: body("birthday").isDate().withMessage("Debe ingresar una fecha").bail()
    .optional({ checkFalsy: true }),

    userAddress: body("address").isAlphanumeric('es-ES', {ignore: ' '}).withMessage("La dirección no puede tener caracteres especiales").bail()
    .isLength({max: 45}).withMessage("La dirección puede tener hasta 45 caracteres")
    .optional({ checkFalsy: true }),

    userZipCode: body("zipCode").isAlphanumeric().withMessage("El código postal no puede tener caracteres especiales ni espacios").bail()
    .isLength({min: 4, max: 8}).withMessage("El código postal debe tener entre 4 y 8 caracteres")
    .optional({ checkFalsy: true }),    

    userLocation: body("location").isAlpha('es-ES', {ignore: ' '}).withMessage("La localidad no puede tener números ni caracteres especiales").bail()
    .isLength({max: 45}).withMessage("La localidad puede tener hasta 45 caracteres")
    .optional({ checkFalsy: true }),

    userProvince: body("province").isAlpha('es-ES', {ignore: ' '}).withMessage("La provincia no puede tener números ni caracteres especiales").bail()
    .isLength({max: 45}).withMessage("La provincia puede tener hasta 45 caracteres")
    .optional({ checkFalsy: true }),

    userPhone: body("phone").custom((value,{req, loc, path}) => { 
        let cleanValue = removeCharacters(value,[" ","+","-"]);//Validacion custom para permitir espacios, y simbolos + y - en el numero de telefono
        if (isNaN(cleanValue)) {
            // throw error if passwords do not match
            throw new Error("El teléfono no puede tener letras");
        } else {
            return value;
        }        
    })    
    .bail()    
    .isLength({min: 8, max: 15}).withMessage("El teléfono debe tener entre 8 y 15 caracteres")
    .optional({ checkFalsy: true }),

    //TODO validacion de phone 

    /* Validaciones de productos*/
    validateProductModel: body("model").notEmpty().withMessage("No ingresó el modelo del producto").bail()
    .isAlphanumeric('es-ES', {ignore: ' '}).withMessage("El modelo no puede tener caracteres especiales").bail()
    .isLength({min: 5, max: 45}).withMessage("El nombre del producto debe tener entre 5 y 45 caracteres"),

    validateProductArtNumber: body("artNumber").isNumeric().withMessage("Debe ingresar un número en el número de artículo").bail()
    .isInt({min:0, max: 9999999999999}).withMessage("El número de artículo debe estar entre 0 y 9999999999999").bail()
    .optional({ checkFalsy: true }),

    validateProductPrice: body("price").notEmpty().withMessage("No ingresó el precio del producto").bail()
    .isNumeric().withMessage("Debe ingresar un número en el precio del producto").bail()
    .isFloat({min: 0, max: 99999999.99}).withMessage("El precio debe ser mayor a 0 y menor a 99999999.99"),

    validateProductDiscountPorc: body("discount").isNumeric().withMessage("Debe ingresar un número en el Porcentaje de descuento").bail()
    .isInt({min:0, max: 100}).withMessage("El porcentaje de descuento debe ser mayor a 0 y menor a 100").bail()
    .optional({ checkFalsy: true }),

    validateProductDescription: body("description").notEmpty().withMessage("No ingresó una descripción para el producto").bail()
    .isAlphanumeric('es-ES', {ignore: ' '}).withMessage("La descripción no puede tener caracteres especiales").bail()
    .isLength({min: 20, max: 65535}).withMessage("La descripción debe tener entre 20 y 65535 caracteres")
    

};

let fieldsValidator = {
    loginFormatValidation: [
        validations.validateEmailFormat,
        validations.validatePasswordFormat
    ],

    registerFormatValidation: [
        validations.validateFirstNameFormat,
        validations.validateLastNameFormat,
        validations.validateEmailFormat,
        validations.validatePasswordFormat,
        validations.validatePasswordRepeat
    ],

    productFormatValidation: [
        validations.validateProductModel,
        validations.validateProductArtNumber,
        validations.validateProductPrice,
        validations.validateProductDiscountPorc,
        validations.validateProductDescription
    ],

    userFormatValidation: [
        validations.validateFirstNameFormat,
        validations.validateLastNameFormat,
        validations.validateEmailFormat,
        validations.validatePasswordFormat,
        
        validations.userBirthday,
        validations.userAddress,
        validations.userZipCode,        
        validations.userLocation,
        validations.userProvince,
        validations.userPhone
    ],

    userEditFormatValidation: [
        validations.validateFirstNameFormat,
        validations.validateLastNameFormat,
        validations.validateEmailFormat,
        validations.validatePasswordFormat.optional({ checkFalsy: true }),
        
        validations.userBirthday,
        validations.userAddress,
        validations.userZipCode,        
        validations.userLocation,
        validations.userProvince,
        validations.userPhone
    ]
};

function removeCharacters(string, charactersToRemove){
    let stringResult = string;

    charactersToRemove.forEach(characterToRemove=>{
        stringResult = stringResult.replace(characterToRemove, "");
    });

    return stringResult;
}

module.exports = fieldsValidator;