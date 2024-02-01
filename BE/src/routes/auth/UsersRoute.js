
const usersController = require('../../controllers/UsersController').AUTH;
const { isAdmin, expiredChargingProfiles } = require('../../utils/common');
function userRoute(apiRouter) {
    apiRouter.route('/users/list').get(usersController.list);
    apiRouter.route('/users/info').get(usersController.info);
    apiRouter.route('/users/detailVIP').get(usersController.detailVIP);
    apiRouter.route('/users/update').put(usersController.update);
    apiRouter.route('/users/chargeMoney').put(isAdmin, usersController.chargeMoney);
    apiRouter.route('/users/upgradeUser').put(usersController.upgradeUser);
    apiRouter.route('/users/upgradeCandidate').put(usersController.upgradeCandidate);
    apiRouter.route('/users/changePassword').put(usersController.changePassword);
    apiRouter.route('/users/lockUser').put(usersController.lock);
    apiRouter.route('/users/unlockUser').put(usersController.unlock);
    apiRouter.route('/users/changePassOTP').put(usersController.changePassOtp);
    apiRouter.route('/users/verifyOtpChange').put(usersController.verifyOtpChange);
    apiRouter.route('/users/changePWUser').put(usersController.changePasswordUser);
    apiRouter.route('/users/uploadCV').put(usersController.uploadCV);
    apiRouter.route('/users/deleteCV').delete(usersController.deleteCV);
    apiRouter.route('/users/createExternal').post(usersController.createExternal);
    apiRouter.route('/users/updateExternal').put(usersController.updateExternal);
    apiRouter.route('/users/delete').delete(usersController.delete);
    apiRouter.route('/users/listInternal').get(usersController.listInternal);
    apiRouter.route('/job/testJob').get(async (req, res) => {
        const response = await expiredChargingProfiles();
        return res.json(response);
    });
}
module.exports = userRoute;
