const { body } = require("express-validator");

module.exports = {
    loginFormatValidation: [    
        body("email").notEmpty().withMessage("No ingresó ningún email").bail()
            .isEmail().withMessage("Debe ingresar un email válido"),
        body("password").notEmpty().withMessage("No ingresó ninguna contraseña").bail()
            .isAlphanumeric().withMessage("La contraseña sólo puede tener letras y números")
    ],

    registerFormatValidation: [   
        body("firstName").notEmpty().withMessage("No ingresó ningún nombre").bail()
            .isAlpha('es-ES', {ignore: ' '}).withMessage("El nombre no puede tener números ni caracteres especiales").bail()
            .isLength({max: 30}).withMessage("El nombre no puede superar los 30 caracteres"),
        body("lastName").notEmpty().withMessage("No ingresó ningún apellido").bail()
            .isAlpha('es-ES', {ignore: ' '}).withMessage("El apellido no puede tener números ni caracteres especiales").bail()
            .isLength({max: 30}).withMessage("El apellido no puede superar los 30 caracteres"), 
        body("email").notEmpty().withMessage("No ingresó ningún email").bail()
            .isEmail().withMessage("Debe ingresar un email válido").bail()
            .isLength({max: 30}).withMessage("El email no puede superar los 30 caracteres"),
        body("password").notEmpty().withMessage("No ingresó ninguna contraseña").bail()
            .isAlphanumeric().withMessage("La contraseña sólo puede tener letras y números").bail()
            .isLength({min: 8, max: 20}).withMessage("La contraseña debe tener entre 8 y 20 caracteres"),
        body("passwordRepeat").notEmpty().withMessage("Debe volver a escribir la contraseña").bail()
            .custom((value,{req, loc, path}) => {
                if (value !== req.body.password) {
                    // throw error if passwords do not match
                    throw new Error("Las contraseñas no coinciden");
                } else {
                    return value;
                }        
            })
    ]
};