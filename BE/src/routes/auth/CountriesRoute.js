
const CountriesController = require('../../controllers/CountriesController').AUTH;

function countriesRoute(apiRouter) {
    apiRouter.route('/countries/list').get(CountriesController.list);
    apiRouter.route('/countries/create').post(CountriesController.create);
    apiRouter.route('/countries/update').put(CountriesController.update);
    apiRouter.route('/countries/delete').delete(CountriesController.delete);
}
module.exports = countriesRoute;
