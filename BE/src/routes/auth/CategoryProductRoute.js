
const categoryProductController = require('../../controllers/CategoryProductController').AUTH;
const fileUploader = require('../../configs/cloudinary.config');

function categoryProductRoute(apiRouter) {
    apiRouter.route('/categoryProduct/list').get(categoryProductController.list);
    apiRouter.route('/categoryProduct/info').get(categoryProductController.info);
    apiRouter.route('/categoryProduct/validate').get(categoryProductController.validate);
    apiRouter.route('/categoryProduct/updateTop').put(categoryProductController.updateTop);
    apiRouter.route('/categoryProduct/create').post(fileUploader.single('file'), categoryProductController.create);
    apiRouter.route('/categoryProduct/update').put(fileUploader.single('file'), categoryProductController.update);
    apiRouter.route('/categoryProduct/delete').delete(categoryProductController.delete);
}
module.exports = categoryProductRoute;
