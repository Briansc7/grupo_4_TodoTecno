const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Categories = db.Category;
const SubCategories = db.SubCategory;
const BrandsOfCategories = db.BrandsOfCategories;

const categorySubCategoryAPIController = {
    getAllCategories: async (req, res) => {
        
        let allCategories = await Categories.findAll({include: ["subCategories","brandsOfCategory"]});
        let response = {
            meta: {
                status : 200,
                total: allCategories.length,
                url: '/api/categorySubCategory/categories'
            },
            data: allCategories
        };
        return res.json(response);
    },
    getAllSubCategories: async (req, res) => {
        let categoryId = req.query.categoryId;
        let allSubCategories = await SubCategories.findAll({include: ["category"], where: {categoryId}});
        let response = {
            meta: {
                status : 200,
                total: allSubCategories.length,
                url: '/api/categorySubCategory/subcategories'
            },
            data: allSubCategories
        };
        return res.json(response);
    },
    getAllBrands: async (req, res) => {
        let categoryId = req.query.categoryId;
        let allBrands = await BrandsOfCategories.findAll({include: ["brandOfCategory"], where: {categoryId}});
        let response = {
            meta: {
                status : 200,
                total: allBrands.length,
                url: '/api/categorySubCategory/brands'
            },
            data: allBrands
        };
        return res.json(response);
    }
};

module.exports = categorySubCategoryAPIController;