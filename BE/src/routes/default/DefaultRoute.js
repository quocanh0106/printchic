
const express = require('express');

const defaultRouter = express.Router();


require('./LoginRoute')(defaultRouter);
require('./UsersDefaultRoute')(defaultRouter);
require('./UploadRoute')(defaultRouter);

module.exports = defaultRouter;
