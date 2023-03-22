const fs = require('fs');
const path = require("path");


const jsonMetaDataArray = [
  {
    templateFile: "productsTemplate.json",
    mainFile: "products.json"
  },
  {
    templateFile: "usersTemplate.json",
    mainFile: "users.json"
  }
];

const productsSrcFolderToCopy = path.resolve(__dirname, "../../public/images/productsTemplate/");
const productsDestFolderToCopy = path.resolve(__dirname, "../../public/images/products/");
const productsExceptionImg = "defaultProduct.png";

const usersSrcFolderToCopy = path.resolve(__dirname, "../../public/images/usersTemplate/");
const usersDestFolderToCopy = path.resolve(__dirname, "../../public/images/users/");
const usersExceptionImg = "defaultUser.png";

// Copiado de archivos json de base de datos desde template
Promise.resolve(createJsonDatabase(jsonMetaDataArray)).then(
  //borrado de imagenes de /products para reiniciar base de datos
  result => deleteImages(productsDestFolderToCopy, productsExceptionImg)
).then(
  // copiado de fotos desde products templates a products para la carga de productos iniciales
  result => copyImagesFromTemplatesToProducts(productsSrcFolderToCopy, productsDestFolderToCopy)
).then(
  //borrado de imagenes de /users para reiniciar base de datos
  result => deleteImages(usersDestFolderToCopy, usersExceptionImg)
).then(
  // copiado de fotos desde users templates a users para la carga de productos iniciales
  result => copyImagesFromTemplatesToProducts(usersSrcFolderToCopy, usersDestFolderToCopy)
).catch(
  error => console.log(error)
);



function copyImagesFromTemplatesToProducts(srcFolderToCopy, destFolderToCopy) {
  fs.readdir(srcFolderToCopy, (err, files) => {
    if (err)
      console.log(err);
    else {
      
      files.forEach(file => {
        fs.copyFile(path.join(srcFolderToCopy, file), path.join(destFolderToCopy, file), (err) => {
          if (err)
            throw err;
          console.log(`Copiado archivo ${file} de carpeta ${srcFolderToCopy} a carpeta ${destFolderToCopy}`);
        });
      });
      
    }
  });
}

function deleteImages(destFolderToCopy, exceptionImg) {
  fs.readdir(destFolderToCopy, (err, files) => {
    if (err)
      console.log(err);
    else {

      let filteredFiles = files.filter(img=>img!=exceptionImg);
      

      filteredFiles.forEach(file => {
        fs.unlink(path.join(destFolderToCopy, file), (err) => {
          if (err)
            throw err;
          console.log(`Borrado archivo: ${file}`);
        });
      });
      
    }
  });
}

function createJsonDatabase(jsonMetaDataArray) {

  for(i=0;i<jsonMetaDataArray.length;i++){
    console.log(`Reemplazando ${jsonMetaDataArray[i].mainFile} con contenido de ${jsonMetaDataArray[i].templateFile}`);
    fs.copyFile(path.resolve(__dirname, "./"+jsonMetaDataArray[i].templateFile), path.resolve(__dirname, "./"+jsonMetaDataArray[i].mainFile), (err) => {
      if (err)
        throw err;
      console.log("Copiado completo");
    });
  }
}

