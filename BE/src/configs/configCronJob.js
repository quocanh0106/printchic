// /**
//  * Configs
//  * @name CronJob
//  */
const { delExpiredAdvertisement, expiredVipUser, inactivePost, expiredChargingProfiles } = require('../utils/common')
// const moment = require('moment-timezone');
const CronJob = require('cron').CronJob;
// new CronJob('* * * * *', (async () => {
//     console.log('cron job');
//     await expiredPost();
// }), null, true);

new CronJob('*/5 * * * *', (async () => {
    // job delete advertisement
    await delExpiredAdvertisement();
    // job expired profiles
    await expiredChargingProfiles();
}), null, true);

// start 00:00 every day
new CronJob('0 0 * * *', (async () => {
    // job scan expired vip user
    await expiredVipUser();
    // job scan expired vip post
    await inactivePost();
}), null, true);