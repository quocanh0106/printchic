
const categoryBlogController = require('../../controllers/CategoryBlogController').AUTH;
const fileUploader = require('../../configs/cloudinary.config');

function categoryBlogRoute(apiRouter) {
    apiRouter.route('/categoryBlog/list').get(categoryBlogController.list);
    apiRouter.route('/categoryBlog/info').get(categoryBlogController.info);
    apiRouter.route('/categoryBlog/create').post(fileUploader.single('file'), categoryBlogController.create);
    apiRouter.route('/categoryBlog/update').put(fileUploader.single('file'), categoryBlogController.update);
    apiRouter.route('/categoryBlog/delete').delete(categoryBlogController.delete);
}
module.exports = categoryBlogRoute;
