
const advertisementsController = require('../../controllers/AdvertisementsController').AUTH;

function advertisementsRoute(apiRouter) {
    apiRouter.route('/advertisements/create').post(advertisementsController.create);
    apiRouter.route('/advertisements/list').get(advertisementsController.list);
    apiRouter.route('/advertisements/delete').delete(advertisementsController.delete);
    apiRouter.route('/advertisements/update').put(advertisementsController.update);

}
module.exports = advertisementsRoute;
