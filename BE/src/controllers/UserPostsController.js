require('dotenv').config()
const UserPostsService = require('../services/UserPostsService');
const { upload } = require('../configs/configMulter');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
} = require('../utils/shared');


module.exports.AUTH = {

    list: async (req, res) => {
        // #swagger.tags = ['Danh sách ứng viên'] 
        // #swagger.summary = 'Danh sách ứng viên ứng tuyển'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['postObjId'] = {
        in: 'query',
        description: 'id của bài đăng',
        required: false,
        type: 'string',
        } */
        try {
            // const { userObjId } = req.decoded;
            // req.query.userObjId = userObjId;
            const result = await UserPostsService.list({
                ...req.query,
            })
            if (!isEmpty(result)) {
                return res.json(responseSuccess(10219, result));
            }
            return res.json(responseSuccess(10219, []));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    listCandidateByUser: async (req, res) => {
      // #swagger.tags = ['Danh sách ứng viên'] 
      // #swagger.summary = 'Danh sách ứng viên của tôi'
      /* #swagger.security = [{
             "apiKeyAuth": [],
      }] */
      /* #swagger.parameters['postObjId'] = {
      in: 'query',
      description: 'filter theo id của posts',
      required: false,
      type: 'string',
      } */
      try {
          const {userObjId} = req.decoded;
          req.query.userObjId = userObjId;
          const result = await UserPostsService.listCandidateByUser({
              ...req.query,
          })
          if (!isEmpty(result)) {
              return res.json(responseSuccess(10219, result));
          }
          return res.json(responseSuccess(10219, []));
      } catch (errors) {
          console.log(errors, 'errors')
          return res.json(responseError(40004, errors));
      }
  },
}
