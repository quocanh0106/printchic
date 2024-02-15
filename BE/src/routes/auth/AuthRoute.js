
const express = require('express');

const authRouter = express.Router();
const {
    verifyToken,
} = require('../../utils/common.js');

// authRouter.use(async (req, res, next) => {
//     await verifyToken(req, res, next);
// });
require('./UsersRoute')(authRouter);
require('./CategoryProductRoute')(authRouter);
require('./Product')(authRouter);


module.exports = authRouter;
