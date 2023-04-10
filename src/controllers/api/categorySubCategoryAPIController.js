const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Categories = db.Category;
const SubCategories = db.SubCategory;

const categorySubCategoryAPIController = {
    getAllCategories: async (req, res) => {
        let allCategories = await Categories.findAll({include: ["subCategories"]});
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
        let allSubCategories = await SubCategories.findAll({include: ["category"]});
        let response = {
            meta: {
                status : 200,
                total: allSubCategories.length,
                url: '/api/categorySubCategory/subcategories'
            },
            data: allSubCategories
        };
        return res.json(response);
    }
};

module.exports = categorySubCategoryAPIController;