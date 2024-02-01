
const CountriesController = require('../../controllers/CountriesController').DEFAULT;
const CitiesController = require('../../controllers/CitiesController').DEFAULT;

function selectRoute(apiRouter) {
    apiRouter.route('/countries/listActive').get(CountriesController.listActive);
    apiRouter.route('/cities/listActive').get(CitiesController.listActive);
}
module.exports = selectRoute;
