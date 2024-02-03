
const usersController = require('../../controllers/UsersController').DEFAULT;
const queryString = require('query-string');
const axios = require('axios');

function loginRoute(apiRouter) {
    // Get otp regis
    apiRouter.route('/verifyRegister').post(usersController.verifyRegis);
    apiRouter.route('/test').get(async (req, res) => {
    });
    // verify otp regis
    apiRouter.route('/validRegister').post(usersController.validRegis);
    // regis
    apiRouter.route('/register').post(usersController.register);

    apiRouter.route('/login').post(usersController.login);

    //get otp forgot
    apiRouter.route('/forgot').post(usersController.forgot);
    // verify otp forgot
    apiRouter.route('/verifyCode').post(usersController.verify);
    // reset
    apiRouter.route('/resetPassword').post(usersController.resetPassword);
    apiRouter.route('/ping').get(async (req, res) => {
        return res.json('hello v2');
    });
    // apiRouter.route('/v1/sendSMS').post(async (req, res) => {
    //     try {
    //         const API_SMS = 'http://rest.esms.vn/MainService.svc/';
    //         const params = {};
    //         params.ApiKey = '';
    //         params.SecretKey = '';
    //         params.SmsType = 2;
    //         params.Brandname = "KAIKE.VN";
    //         params.IsUnicode = 0;
    //         params.Phone = "0333545654";
    //         params.Content = "XIn Chào, mình là kaike";
    //         const url = `${API_SMS}/json/SendMultipleMessage_V4_get`;
    //         let queryParams = '';
    //         if (Object.keys(params).length > 0) {
    //             queryParams = `?${queryString.stringify(params)}`;
    //         }
    //         const urlQuery = `${url}${queryParams}`;
    //         const result = await axios.get(urlQuery);
    //         return res.json(Promise.resolve(result.data));
    //     } catch (err) {
    //         console.log(err, 'err');
    //     }
    // });
}
module.exports = loginRoute;
