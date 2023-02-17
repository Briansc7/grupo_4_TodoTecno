const { body } = require("express-validator");

module.exports = [    
    body("email").notEmpty().withMessage("El campo email es obligatorio").bail()
        .isEmail(),
    body("password").notEmpty().withMessage("El campo contraseña es obligatorio").bail()
]