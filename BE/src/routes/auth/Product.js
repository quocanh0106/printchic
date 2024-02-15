
const productController = require('../../controllers/ProductController').AUTH;
const fileUploader = require('../../configs/cloudinary.config');

function productRoute(apiRouter) {
    apiRouter.route('/product/list').get(productController.list);
    apiRouter.route('/product/create').post(fileUploader.any('files'), productController.create);
    apiRouter.route('/product/update').put(fileUploader.single('file'), productController.update);
    apiRouter.route('/product/delete').delete(productController.delete);
}
module.exports = productRoute;
