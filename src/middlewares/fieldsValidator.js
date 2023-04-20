const { body } = require("express-validator");

let validations = {
    validateEmailFormat: body("email").notEmpty().withMessage("No ingresó ningún email").bail()
    .isEmail().withMessage("Debe ingresar un email válido"),

    validatePasswordFormat: body("password").notEmpty().withMessage("No ingresó ninguna contraseña").bail()
    .isAlphanumeric().withMessage("La contraseña sólo puede tener letras y números"),

    validateFirstNameFormat: body("firstName").notEmpty().withMessage("No ingresó ningún nombre").bail()
    .isAlpha('es-ES', {ignore: ' '}).withMessage("El nombre no puede tener números ni caracteres especiales").bail()
    .isLength({max: 30}).withMessage("El nombre no puede superar los 30 caracteres"),

    validateLastNameFormat: body("lastName").notEmpty().withMessage("No ingresó ningún apellido").bail()
    .isAlpha('es-ES', {ignore: ' '}).withMessage("El apellido no puede tener números ni caracteres especiales").bail()
    .isLength({max: 30}).withMessage("El apellido no puede superar los 30 caracteres"), 

    validatePasswordRepeat: body("passwordRepeat").notEmpty().withMessage("Debe volver a escribir la contraseña").bail()
    .custom((value,{req, loc, path}) => {
        if (value !== req.body.password) {
            // throw error if passwords do not match
            throw new Error("Las contraseñas no coinciden");
        } else {
            return value;
        }        
    })
};

module.exports = {
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
    ]
};