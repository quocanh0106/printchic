
const chargingHistoriesController = require('../../controllers/ChargingHistoriesController').AUTH;

function chargingHistoriesRoute(apiRouter) {
    apiRouter.route('/charging-histories/listByUser').get(chargingHistoriesController.list);
}
module.exports = chargingHistoriesRoute;
