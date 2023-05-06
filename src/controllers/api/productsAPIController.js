const path = require('path');
const productsDatabase = require(path.resolve(__dirname, "../../legacyDatabase/jsonDatabase"));

const productsAPIController = {
    productsList: async (req, res) => {
        try{
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
        }catch(error){
            console.log(error);
            return res.status(500).json({
                errorMsg: "Error interno del servidor"
            });
        }
        
    },

    productDetail: async (req, res) => {
        try{
            let product = await productsDatabase.getAllProductDetailsById(req.params.id);

            let productData = productGetSomeDetails(product);

        /* Atributos restantes no disponibles en productGetSomeDetails */

        productData.artNumber = product.artNumber;
        productData.price = product.price;
        productData.discountPorc = product.discountPorc;
        productData.isOnSale = product.isOnSale;
        productData.isNew = product.isNew;

        productData.images = []; //array relacion uno a muchos

        product.productImages.forEach(image => {
            const host = req.protocol + "://" + req.get('host');
            const imagePath = "/images/products/";
            productData.images.push({
                id: image.id,
                imageUrl: host + imagePath + image.fileName,
                createdAt: image.createdAt,
                updatedAt: image.updatedAt
            });
        });

        productData.relatedProducts = [];

        product.product1BoughtTogethers.forEach(relatedProduct => {
            productData.relatedProducts.push(
                {
                    id: relatedProduct.productB.id,
                    brandName: relatedProduct.productB.brand.name,
                    model: relatedProduct.productB.model,
                    timesBoughtTogether: relatedProduct.timesBoughtTogether
                }
            )
        }) 

        return res.json(productData);
        }catch(error){
            console.log(error);
            return res.status(500).json({
                errorMsg: "product Not Found"
            });
        }

        
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