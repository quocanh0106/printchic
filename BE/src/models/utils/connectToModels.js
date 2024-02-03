

const { connectDatabase } = require('../../utils/shared');

const UsersSchema = require('../Users');
const SettingModels = require('../Setting');
const ProductsModels = require('../products');
const BlogsModels = require('../Blogs');
const CategoryBlogsModels = require('../CategoryBlog');
const CategoryProductModels = require('../CategoryProduct');
const FaqsModels = require('../Faqs');
const LanguagesModels = require('../Languages');

const models = {};

module.exports = {
    users: UsersSchema,
    settings: SettingModels,
    products: ProductsModels,
    blogs: BlogsModels,
    category_blog: CategoryBlogsModels,
    category_product: CategoryProductModels,
    faqs: FaqsModels,
    languages: LanguagesModels,
    connectToModels: ({ databaseName, currentModels = [], otherModels = [] }) => {
        const conn = connectDatabase(databaseName);
        otherModels.map((model) => {
            conn.model(model, models[model]);
        });
        const objCurrentModels = currentModels.reduce((initObj, currModel) => {
            initObj[currModel] = conn && conn.model ? conn.model(currModel, models[currModel]) : null;
            return initObj;
        }, {});
        objCurrentModels.connectToModel = (model) => {
            conn.model(model, models[model]);
        };
        return objCurrentModels;
    },
};
