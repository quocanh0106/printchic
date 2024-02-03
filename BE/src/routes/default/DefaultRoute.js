
const express = require('express');

const defaultRouter = express.Router();


require('./LoginRoute')(defaultRouter);
require('./UsersDefaultRoute')(defaultRouter);

module.exports = defaultRouter;
