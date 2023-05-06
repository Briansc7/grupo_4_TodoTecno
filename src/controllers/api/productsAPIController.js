const path = require('path');
const productsDatabase = require(path.resolve(__dirname, "../../legacyDatabase/jsonDatabase"));

const productsAPIController = {
    productsList: async (req, res) => {
        const products = await productsDatabase.getAllProductsWithSomeDetails();
        const categories = await productsDatabase.getAllCategoriesWithSubcategories();

        let response = {
            count: 0,
            countByCategory: {},
            products: []
        };

        response.count = products.length; //cantidad total de productos

        products.forEach(product => { //se cargan todos los productos con algunos detalles de los mismos
            const host = req.protocol + "://" + req.get('host');
            const detailPath = "/products/productDetail/";

            let productData = productGetSomeDetails(product);

            productData.detail = host + detailPath + product.id;

            response.products.push(
                productData
            )
        });

        categories.forEach(category => { //se obtiene la cantidad total de productos para una categoria especifica
            response.countByCategory[category.name] = {
                count: 0,
                countBySubcategories: {}
            };

            let categoryCount = 0;
            category.subCategories.forEach(subCategory => { //se obtiene la cantidad total de productos para una subcategoria especifica
                categoryCount+= subCategory.products.length;
                response.countByCategory[category.name].countBySubcategories[subCategory.name] = subCategory.products.length;
            });

            response.countByCategory[category.name].count = categoryCount; //la cantidad de productos de una categoria es la sumatoria de los productos de sus subcategorias
        });

        return res.json(response);
    },

    productDetail: async (req, res) => {
        const product = await productsDatabase.getAllProductDetailsById(req.params.id);

        let productData = productGetSomeDetails(product);

        /* Atributos restantes no disponibles en productGetSomeDetails */

        productData.artNumber = product.artNumber;
        productData.price = product.price;
        productData.discountPorc = product.discountPorc;
        productData.isOnSale = product.isOnSale;
        productData.isNew = product.isNew;

        productData.images = product.productImages; //array relacion uno a muchos

        return res.json(productData);
    }
};

function productGetSomeDetails(product) {
    

    let characteristics = getProductCharacteristicsAndSubCharacteristics(product); //array relacion uno a muchos principal para el producto

    let productData = {
        id: product.id,
        brandName: product.brand.name,
        model: product.model,
        description: product.description,
        category: {
            id: product.subCategory.category.id,
            name: product.subCategory.category.name
        },
        subCategory: {
            id: product.subCategory.id,
            name: product.subCategory.name
        },
        characteristics: characteristics
    };
    return productData;
}

function getProductCharacteristicsAndSubCharacteristics(product) {
    let characteristics = [];

    product.characteristics.forEach((characteristic, i) => {
        characteristics.push(
            {
                id: characteristic.id,
                name: characteristic.name,
                subCharacteristics: []
            }
        );

        characteristic.subCharacteristics.forEach(subCharacteristic => {
            characteristics[i].subCharacteristics.push(
                {
                    id: subCharacteristic.id,
                    name: subCharacteristic.name,
                    value: subCharacteristic.value
                }
            );
        });
    });
    return characteristics;
}

module.exports = productsAPIController;