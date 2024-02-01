
const ChargingProfilesController = require('../../controllers/ChargingProfilesController').AUTH;

function chargingProfilesRoute(apiRouter) {
    apiRouter.route('/charging-profiles/listPurchasedCandidate').get(ChargingProfilesController.list);
    apiRouter.route('/charging-profiles/checkPurchased').get(ChargingProfilesController.checkPurchased);
}
module.exports = chargingProfilesRoute;
