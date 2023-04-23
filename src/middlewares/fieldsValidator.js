const { body } = require("express-validator");

let validations = {
    validateEmailFormat: body("email").notEmpty().withMessage("No ingresó ningún email").bail()
    .isEmail().withMessage("Debe ingresar un email válido")
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

    validateProductModel: body("model").notEmpty().withMessage("No ingresó el modelo del producto").bail()
    .isAlphanumeric('es-ES', {ignore: ' '}).withMessage("El modelo no puede tener caracteres especiales"),

    validateProductArtNumber: body("artNumber").isNumeric().withMessage("Debe ingresar un número en el número de artículo").bail()
    .optional({ checkFalsy: true }),

    validateProductPrice: body("price").isNumeric().withMessage("Debe ingresar un número en el precio del producto").bail(),

    validateProductDiscountPorc: body("discount").isNumeric().withMessage("Debe ingresar un número en el Porcentaje de descuento").bail()
    .optional({ checkFalsy: true }),

    userBirthday: body("birthday"),

    userAddress: body("address"),

    userZipCode: body("zipCode"),    

    userLocation: body("location"),

    userProvince: body("province")

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
        validations.validateProductDiscountPorc
    ],

    userFormatValidation: []
};

/* Validaciones que requieren que fieldsValidator esté inicializado*/
fieldsValidator.userFormatValidation = [
    ...fieldsValidator.registerFormatValidation,
    validations.userBirthday,
    validations.userAddress,
    validations.userZipCode,        
    validations.userLocation,
    validations.userProvince
]



module.exports = fieldsValidator;