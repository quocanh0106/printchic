
const ConfigsController = require('../../controllers/ConfigsController').AUTH;

function chargingHistoriesRoute(apiRouter) {
    apiRouter.route('/configs/list').get(ConfigsController.list);
    apiRouter.route('/configs/update').put(ConfigsController.update);
    apiRouter.route('/configs/listAdvertisement').get(ConfigsController.listAdvertisement);
    apiRouter.route('/configs/listVip').get(ConfigsController.listVip);
    apiRouter.route('/configs/listUploadPost').get(ConfigsController.listUploadPost);
    apiRouter.route('/configs/listPurchaseUser').get(ConfigsController.listPurchaseUser);
}
module.exports = chargingHistoriesRoute;
