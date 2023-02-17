const { body } = require("express-validator");

module.exports = [    
    body("email").notEmpty().withMessage("No ingresó el email").bail()
        .isEmail().withMessage("Debe ingresar un email válido"),
    body("password").notEmpty().withMessage("No ingresó la contraseña").bail()
        .isAlphanumeric().withMessage("La contraseña sólo puede tener letras y números")
]