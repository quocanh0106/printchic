
const advertisementsController = require('../../controllers/AdvertisementsController').DEFAULT;

function advertisementDefaultRoute(apiRouter) {
    apiRouter.route('/advertisements/landing').get(advertisementsController.landing);
}
module.exports = advertisementDefaultRoute;
