const path = require("path");

module.exports={
    validImageType: function(req, file, cb){
        const filetypes = [".jpeg", ".jpg", ".png", ".gif"];//tipos de archivos permitidos

        const extname = filetypes.includes(path.extname(file.originalname).toLowerCase());//comparacion con typo de archivo recibido

        if(extname){
            return cb(null, true); //formato válido, se acepta el archivo
        } else {
            req.body.imageBadFormat=true; //se avisa que se recibió un type de archivo inválido para poder mostrar el error
            return cb(null, false); //typo de archivo inválido, el filter de multer no permite que se guarde
        }
    }
}