
const express = require('express');

const authRouter = express.Router();
const {
    verifyToken,
} = require('../../utils/common.js');

authRouter.use(async (req, res, next) => {
    await verifyToken(req, res, next);
});
require('./UsersRoute')(authRouter);


module.exports = authRouter;
