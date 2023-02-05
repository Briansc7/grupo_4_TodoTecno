const fs = require('fs');
const path = require("path");

// Copiado de archivos json de base de datos desde template
createJsonDatabase();


const srcFolderToCopy = path.resolve(__dirname, "../../public/images/productsTemplate/");
const destFolderToCopy = path.resolve(__dirname, "../../public/images/products/");

//borrado de imagenes de /products para reiniciar base de datos
deleteProductImages();


// copiado de fotos desde products templates a products para la carga de productos iniciales
copyImagesFromTemplatesToProducts();





function copyImagesFromTemplatesToProducts() {
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

function deleteProductImages() {
  fs.readdir(destFolderToCopy, (err, files) => {
    if (err)
      console.log(err);
    else {
      

      files.forEach(file => {
        fs.unlink(path.join(destFolderToCopy, file), (err) => {
          if (err)
            throw err;
          console.log(`Borrado archivo: ${file}`);
        });
      });
      
    }
  });
}

function createJsonDatabase() {
  fs.copyFile(path.resolve(__dirname, "./productsTemplate.json"), path.resolve(__dirname, "./products.json"), (err) => {
    if (err)
      throw err;
    console.log('Reemplazado products.json con contenido de productsTemplate.json');
  });

  fs.copyFile(path.resolve(__dirname, "./usersTemplate.json"), path.resolve(__dirname, "./users.json"), (err) => {
    if (err)
      throw err;
    console.log('Reemplazado users.json con contenido de usersTemplate.json');
  });
}

