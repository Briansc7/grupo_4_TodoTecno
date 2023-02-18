const { body } = require("express-validator");

module.exports = [    
    body("email").notEmpty().withMessage("No ingresó ningún email").bail()
        .isEmail().withMessage("Debe ingresar un email válido"),
    body("password").notEmpty().withMessage("No ingresó ninguna contraseña").bail()
        .isAlphanumeric().withMessage("La contraseña sólo puede tener letras y números"),
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