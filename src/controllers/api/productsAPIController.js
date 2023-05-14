const path = require('path');
const productsDatabase = require(path.resolve(__dirname, "../../legacyDatabase/jsonDatabase"));

const productsAPIController = {
    productsList: async (req, res) => {
        try{
            if(!(req.query.page) ||  isNaN(Number(req.query.page))){ //se muestra error en caso de no recibir pagina o sea invalida
                return res.status(500).json({
                    errorMsg: "Invalid Page"
                });
            }

            const limit = 10;
            const page = Number(req.query.page) ?? 1;
            const totalProductsCount = await productsDatabase.totalProductsCount(); //cantidad total de productos
            const products = await productsDatabase.getAllProductsWithSomeDetails({limit, page});
            const categories = await productsDatabase.getAllCategoriesWithSubcategories();

            let productsPageCount = products.length; //cantidad de productos recibidos en el paginado

            const host = req.protocol + "://" + req.get('host');
            const apiPath = "/api/products/";
            const partialURL = host + apiPath + "?page="

            let nextUrl = productsPageCount>limit ? partialURL+(page+1) : null;
            let previousUrl = page==1?null: partialURL+(page-1);
    
            let response = {
                count: totalProductsCount,
                countByCategory: {},
                products: [],
                next: nextUrl,
                previous: previousUrl
            };
    
            
    
            products.every((product,i) => { //se cargan todos los productos de la pagina con algunos detalles de los mismos
                if(i==limit){//se recibe uno extra solo para facilitar el paginado, no se debe retornar
                    return false;
                }
                const host = req.protocol + "://" + req.get('host');
                const detailPath = "/products/productDetail/";
    
                let productData = productGetSomeDetails(product);
    
                productData.detail = host + detailPath + product.id;
    
                response.products.push(
                    productData
                );

                return true;
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

        
    },
    lastProductDetail: async (req, res) => {
        try{
            let product = await productsDatabase.getAllLastProductDetail();

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
                errorMsg: error.msg
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