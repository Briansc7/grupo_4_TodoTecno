const fs = require('fs');
const path = require("path");

// File destination.txt will be created or overwritten by default.
fs.copyFile(path.resolve(__dirname, "./productsTemplate.json"),path.resolve(__dirname, "./products.json"), (err) => {
  if (err) throw err;
  console.log('Reemplazado products.json con contenido de productsTemplate.json');
});

fs.copyFile(path.resolve(__dirname, "./usersTemplate.json"),path.resolve(__dirname, "./users.json"), (err) => {
    if (err) throw err;
    console.log('Reemplazado users.json con contenido de usersTemplate.json');
  });