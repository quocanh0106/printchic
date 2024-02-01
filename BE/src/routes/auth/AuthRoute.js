
const express = require('express');

const authRouter = express.Router();
const {
    verifyToken,
} = require('../../utils/common.js');

authRouter.use(async (req, res, next) => {
    await verifyToken(req, res, next);
});
require('./PostsRoute')(authRouter);
require('./UsersRoute')(authRouter);
require('./ChargingHistoriesRoute')(authRouter);
require('./UserPostsRoute')(authRouter);
require('./NewsRoute')(authRouter);
require('./ConfigsRoute')(authRouter);
require('./ChargingProfilesRoute')(authRouter);
require('./AdvertisementsRoute')(authRouter);
require('./DashboardsRoute')(authRouter);
require('./NotificationsRoute')(authRouter);
require('./AttachmentsRoute')(authRouter);
require('./CountriesRoute')(authRouter);


module.exports = authRouter;
