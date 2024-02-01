
const dashboardsController = require('../../controllers/DashboardsController').AUTH;

function newsRoute(apiRouter) {
    apiRouter.route('/dashboards/userData').get(dashboardsController.userData);
    apiRouter.route('/dashboards/revenueData').get(dashboardsController.revenueData);
    apiRouter.route('/dashboards/revenueByYear').get(dashboardsController.revenueByYear);
}
module.exports = newsRoute;
