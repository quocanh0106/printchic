require('dotenv').config()
const UsersService = require('../services/UsersService');
const PostsService = require('../services/PostsService');
const ChargingHistoriesService = require('../services/ChargingHistoriesService');
const moment = require('moment-timezone');
const {
    responseError,
    validateResult,
    isEmpty,
    responseSuccess,
    urlImage,
} = require('../utils/shared');

const {
    TYPE_USER, TYPE_CHARGING_HISTORIES
} = require('../utils/constants');

module.exports.AUTH = {

    userData: async (req, res) => {
        // #swagger.tags = ['Dashboard'] 
        // #swagger.summary = 'User data dashboard'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const result = {
                totalRecruiters: 0,
                totalCandidates: 0,
                recruitersRegisterInMonth: 0,
                recruitersRegisterPrevMonth: 0,
                candidatesRegisterInMonth: 0,
                candidatesRegisterPrevMonth: 0,
                totalPostsInMonth: 0,
                totalPostsPrevMonth: 0,
            }
            const totalPosts = await PostsService.findByConditions({
                getAll: true,
            })
            const totalRecruiters = await UsersService.findByConditions({
                type: TYPE_USER[0],
                getAll: true,
            })
            const totalCandidates = await UsersService.findByConditions({
                type: TYPE_USER[1],
                getAll: true,
            })
            const startMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
            const endMonth = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
            const prevMonth = moment().subtract(1, 'month');
            const startPrevMonth = moment(prevMonth).startOf('month').format('YYYY-MM-DD HH:mm:ss');
            const endPrevMonth = moment(prevMonth).endOf('month').format('YYYY-MM-DD HH:mm:ss');

            const recruitersRegisterInMonth = totalRecruiters.filter((item) => (
                moment(item?.createdAt).isSameOrAfter(startMonth)
                && moment(item?.createdAt).isSameOrBefore(endMonth)
            ));
            const recruitersRegisterPrevMonth = totalRecruiters.filter((item) => (
                moment(item?.createdAt).isSameOrAfter(startPrevMonth)
                && moment(item?.createdAt).isSameOrBefore(endPrevMonth)
            ));
            const candidatesRegisterInMonth = totalCandidates.filter((item) => (
                moment(item?.createdAt).isSameOrAfter(startMonth)
                && moment(item?.createdAt).isSameOrBefore(endMonth)
            ));
            const candidatesRegisterPrevMonth = totalCandidates.filter((item) => (
                moment(item?.createdAt).isSameOrAfter(startPrevMonth)
                && moment(item?.createdAt).isSameOrBefore(endPrevMonth)
            ));
            const totalPostsInMonth = totalPosts.filter((item) => (
                moment(item?.createdAt).isSameOrAfter(startMonth)
                && moment(item?.createdAt).isSameOrBefore(endMonth)
            ));
            const totalPostsPrevMonth = totalPosts.filter((item) => (
                moment(item?.createdAt).isSameOrAfter(startPrevMonth)
                && moment(item?.createdAt).isSameOrBefore(endPrevMonth)
            ));
            result.totalRecruiters = totalRecruiters?.length || 0;
            result.totalCandidates = totalCandidates?.length || 0;
            result.recruitersRegisterInMonth = recruitersRegisterInMonth?.length || 0;
            result.recruitersRegisterPrevMonth = recruitersRegisterPrevMonth?.length || 0;
            result.candidatesRegisterInMonth = candidatesRegisterInMonth?.length || 0;
            result.candidatesRegisterPrevMonth = candidatesRegisterPrevMonth?.length || 0;
            result.totalPostsInMonth = totalPostsInMonth?.length || 0;
            result.totalPostsPrevMonth = totalPostsPrevMonth?.length || 0;
            return res.json(responseSuccess(10311, result));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    revenueData: async (req, res) => {
        // #swagger.tags = ['Dashboard'] 
        // #swagger.summary = 'Revenue data dashboard'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        try {
            const startMonth = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
            const endMonth = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
            const prevMonth = moment().subtract(1, 'month');
            const startPrevMonth = moment(prevMonth).startOf('month').format('YYYY-MM-DD HH:mm:ss');
            const endPrevMonth = moment(prevMonth).endOf('month').format('YYYY-MM-DD HH:mm:ss');
            let chargingHistoriesInMonth = await ChargingHistoriesService.findByConditions({
                type: TYPE_CHARGING_HISTORIES[300],
                startMonth,
                endMonth,
                getAll: true,
            })
            chargingHistoriesInMonth = chargingHistoriesInMonth.reduce((prev, curr) => {
                prev = prev + +curr?.value?.price;
                return prev;
            }, 0)
            let chargingHistoriesPrevMonth = await ChargingHistoriesService.findByConditions({
                type: TYPE_CHARGING_HISTORIES[300],
                startPrevMonth,
                endPrevMonth,
                getAll: true,
            })
            chargingHistoriesPrevMonth = chargingHistoriesPrevMonth.reduce((prev, curr) => {
                prev = prev + +curr?.value?.price;
                return prev;
            }, 0)
            let chargingAdvertisementsInMonth = await ChargingHistoriesService.findByConditions({
                type: TYPE_CHARGING_HISTORIES[600],
                startMonth,
                endMonth,
                getAll: true,
            })
            chargingAdvertisementsInMonth = chargingAdvertisementsInMonth.reduce((prev, curr) => {
                prev = prev + +curr?.value?.price;
                return prev;
            }, 0)
            let chargingAdvertisementsPrevMonth = await ChargingHistoriesService.findByConditions({
                type: TYPE_CHARGING_HISTORIES[600],
                startPrevMonth,
                endPrevMonth,
                getAll: true,
            })
            chargingAdvertisementsPrevMonth = chargingAdvertisementsPrevMonth.reduce((prev, curr) => {
                prev = prev + +curr?.value?.price;
                return prev;
            }, 0)
            const result = {
                chargingHistoriesInMonth: chargingHistoriesInMonth || 0,
                chargingHistoriesPrevMonth: chargingHistoriesPrevMonth || 0,
                chargingAdvertisementsInMonth: chargingAdvertisementsInMonth || 0,
                chargingAdvertisementsPrevMonth: chargingAdvertisementsPrevMonth || 0,
                totalRevenueInMonth: +chargingHistoriesInMonth + +chargingAdvertisementsInMonth,
                totalRevenuePrevMonth: +chargingHistoriesPrevMonth + +chargingAdvertisementsPrevMonth,
            }
            return res.json(responseSuccess(10312, result));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
    revenueByYear: async (req, res) => {
        // #swagger.tags = ['Dashboard'] 
        // #swagger.summary = 'Revenue by year dashboard'
        /* #swagger.security = [{
               "apiKeyAuth": [],
        }] */
        /* #swagger.parameters['year'] = {
       in: 'query',
       description: 'year format YYYY',
       required: true,
       type: 'string',
       } */
        try {
            const year = req.query.year || moment().format('YYYY');
            const formatData = (key, dataInput) => {
                if (!isEmpty(dataInput)) {
                    const result = Array.from({ length: 12 }, (_, monthIndex) => {
                        const monthData = dataInput.find((item) => item.type === key);
                        if (monthData) {
                            const total = monthData.monthlyTotalPrice.find((item) => item.month === monthIndex + 1);
                            return total ? total.totalPrice : 0;
                        } else {
                            return 0;
                        }
                    });
                    return result;
                }
                return 0;
            }
            const revenueInYear = await ChargingHistoriesService.revenueByYear({
                year: +year,
            })
            const prevYear = moment(year).subtract(1, 'year').format("YYYY");
            const revenuePrevYear = await ChargingHistoriesService.totalRevenueByYear({
                year: +prevYear,
            })
            const dataByTypes = revenueInYear[0]?.types;
            const totalRevenue = revenueInYear[0]?.totalRevenue || 0;
            const formatChargingData = formatData(TYPE_CHARGING_HISTORIES[300], dataByTypes);
            const formatAdvertisementData = formatData(TYPE_CHARGING_HISTORIES[600], dataByTypes);
            return res.json(responseSuccess(10312, {
                [TYPE_CHARGING_HISTORIES[300]]: formatChargingData,
                [TYPE_CHARGING_HISTORIES[600]]: formatAdvertisementData,
                totalRevenueInYear: totalRevenue,
                totalRevenuePrevYear: +revenuePrevYear[0]?.totalRevenue || 0,
            }));
        } catch (errors) {
            console.log(errors, 'errors')
            return res.json(responseError(40004, errors));
        }
    },
}
