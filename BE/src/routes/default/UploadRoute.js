const uploadController = require('../../controllers/UploadController').DEFAULT;
const fileUploader = require('../../configs/cloudinary.config');

function uploadRoute(apiRouter) {
    apiRouter.route('/cloudinary-upload').post(fileUploader.single('file'), uploadController.uploadSingle);
}
module.exports = uploadRoute;