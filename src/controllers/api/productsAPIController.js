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

        response.count = products.length;

        products.forEach(product => {
            const host = req.protocol + "://" + req.get('host');
            const detailPath = "/products/productDetail/";

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

            response.products.push(
                {
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
                    characteristics: characteristics,
                    detail: host + detailPath + product.id
                }
            )
        });

        categories.forEach(category => {
            response.countByCategory[category.name] = {
                count: 0,
                countBySubcategories: {

                }
            };

            let categoryCount = 0;
            category.subCategories.forEach(subCategory => {
                categoryCount+= subCategory.products.length;
                response.countByCategory[category.name].countBySubcategories[subCategory.name] = subCategory.products.length;
            });

            response.countByCategory[category.name].count = categoryCount;
        });

        return res.json(response);
    },

    productDetail: async (req, res) => {

    }
};

module.exports = productsAPIController;