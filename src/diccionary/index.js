/* Se tomo como base index.js de models creado por sequelize para poder usar requiere de la carpeta diccionary 
y usar los archivos js de adentro como si fueran objetos al igual que como se hace con el require de la carpeta models con sequilize
para referenciar a cada modelo con models.nombre*/

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const diccionary = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    diccionary[file.slice(0,file.indexOf('.'))] = model;
    console.log(model);
  });

module.exports = diccionary;
