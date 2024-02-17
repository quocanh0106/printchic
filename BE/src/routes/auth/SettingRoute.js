
const settingController = require('../../controllers/SettingController').AUTH;
const fileUploader = require('../../configs/cloudinary.config');

function settingRoute(apiRouter) {
    apiRouter.route('/setting/info').get(settingController.info);
    apiRouter.route('/setting/update').put(fileUploader.single('file'), settingController.update);
}
module.exports = settingRoute;
