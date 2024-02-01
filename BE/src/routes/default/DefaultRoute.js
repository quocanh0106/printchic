
const express = require('express');

const defaultRouter = express.Router();


require('./LoginRoute')(defaultRouter);
require('./SelectRoute')(defaultRouter);
require('../auth/ImageRoute')(defaultRouter);
require('./PostsDefaultRoute')(defaultRouter);
require('./UsersDefaultRoute')(defaultRouter);
require('./AdvertisementsDefaultRoute')(defaultRouter);
require('./NewsDefaultRoute')(defaultRouter);
require('./XKLDCompaniesDefaultRoute')(defaultRouter);

module.exports = defaultRouter;
