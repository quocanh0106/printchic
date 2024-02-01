exports.CODES_SUCCESS = {
    10000: 'Register successfully!',
    10001: 'Login successfully!',


    /* 10200 -> 10209 users */
    10200: 'Generate verify code successfully!',
    10201: 'Reset password successfully!',
    10202: 'Verify code successfully',
    10203: 'Update profile successfully',
    10204: 'List users successfully',
    10205: 'Info user successfully',

    /* 10210 -> 10229 posts */
    10210: 'Create a new post successfully!',
    10211: 'Update a post successfully!',
    10212: 'Delete a post successfully!',
    10213: 'List post successfully!',
    10214: 'Find post successfully!',
    10215: 'Upgrade post successfully!',
    10216: 'Approve post successfully!',
    10217: 'Apply job successfully!',
    10218: 'Reject job successfully!',
    10219: 'List candidate successfully!',
    10220: 'Extend post successfully',
    10221: 'Inactive post successfully!',
    10225: 'Update status successfully!',
    10226: 'Update status successfully!',
    10227: 'Statistics dashboard successfully!',
    10228: 'Top 6 hr successfully!',
    10229: 'You can apply this post!',
    /* 10230 -> 10239 users part 2 */
    10230: 'Charging successfully!',
    10231: 'Upgrade user successfully!',
    10232: 'Purchase profile candidate successfully!',
    10233: 'Change password successfully!',
    10234: 'Lock successfully!',
    10235: 'Unlock successfully!',
    10236: 'Upload cv successfully!',
    10237: 'Delete cv successfully!',
    10238: 'You can purchase this candidate!',
    /* 10240 -> 10270 configs */
    10240: 'List setting price successfully!',
    10241: 'Update setting price successfully!',
    10242: 'Detail Vip successfully!',
    /* 10271 -> 10280 charging profile */
    10271: 'List my candidate successfully!',
    /* 10281 -> 10310 advertisements */
    10281: 'Create new advertisement successfully!',
    10282: 'List landing successfully!',
    10283: 'Delete advertisement successfully!',
    10284: 'Update advertisement successfully!',
    /* 10311 -> 10360 dashboards */
    10311: "Data user in dashboards successfully!",
    10312: "Revenue in dashboards successfully!",
    /* 10361 -> 10390 cities + countries */
    10361: "List countries successfully!",
    10362: "List cities successfully!",
    10363: "Create countries successfully!",
    10364: "Update countries successfully!",
    10365: "Delete countries successfully!",
    /* 10391 -> 10420 news */
    10391: "Create news successfully!",
    10392: "List news successfully!",
    10393: "Delete news successfully!",
    10394: "Update news successfully!",
    10395: "Detail news successfully!",
    /* 10421 -> 10470 notifications */
    10421: "List notifications successfully!",
    10422: "Read notification successfully!",
    10423: "Read all notification successfully!",
    10424: "Create notification successfully!",
    10425: "Find notification successfully!",
    10426: "Total notification successfully!",
    /* 10471 -> 10500 template cv */
    10471: "Upload template cv successfully!",
    10472: "Delete template cv successfully!",
    10473: "List template cv successfully!",
    /* 10501 -> 10550 internal post */
    10501: "Create internal post successfully!",
    /* 10551 -> 10600 upgrade candidate */
    10551: "Upgrade candidate successfully!",
    10502: "List internal post successfully!",
    10503: "Update internal post successfully!",
    /* 10601 -> 10640 external candidate*/
    10601: "Create external candidate successfully!",
    10602: "List external candidate successfully!",
    10603: "Update external candidate successfully!",
    10604: "Delete external candidate successfully!",

}
exports.CODES_ERROR = {
    40000: 'Username or password is wrong. Please try again!',
    40001: 'Token code must be not empty',
    40002: 'Your login session has expired. Please login again!',
    40003: 'Params Errors!',
    40004: 'Something went wrong!',
    40005: 'Invalid token!',
    40006: 'Only Admin can do this action!',
    40007: 'Hr can do this permission!',
    40008: 'Image must be correct format and size <= 8mb!',

    /* 40100 -> 40109 users */
    40100: 'Username not found!',
    40101: 'Email not match with the registered email!',
    40102: 'Generate verify code failure!',
    40103: 'Confirm password and password must be the same!',
    40104: 'Invalid verify code!',
    40105: 'Reset password failure!',
    40106: 'Password or username is wrong!',
    40107: 'Email and phone number must be unique!',
    40108: 'Verify code is wrong!',
    40109: 'Update user failure!',

    /* 40110 -> 40120 posts */
    40110: 'Create a new post failure!',
    40111: 'Update a post failure!',
    40112: 'Delete a post failure!',
    40113: 'This post is not found!',
    40114: 'Duplicate post name, try another!',
    40115: 'image must be required',
    40116: 'Post not found',
    40117: 'Your account balance is not enough, please recharge your account more',
    40118: 'Upgrade post failure!',
    40119: 'Post is already HOT or URGENT, cant upgrade HOT more',
    40120: 'Current status of post is URGENT, cant upgrade URGENT more!',

    /* 40121 -> 40129 users */
    40121: 'Charging failure!',
    40122: 'User not found!',
    40123: 'Upgrade user failure!',
    40124: 'This dish is not found!',
    40125: 'Update status a dish failure!',
    40126: 'Purchase profile candidate fail!',
    40127: 'This profile has purchased, cant purchase more!',
    40128: 'This profile not in this post!',
    40129: 'You need purchase this cv before watching!',
    /* 40130 -> 40139 posts-2 */
    40130: 'Post is urgent, can only update post til this status is expired!',
    40131: 'Approve post failed!',
    40132: 'Apply fail',
    40133: 'You applied this job, cant apply more',
    40134: 'Your account has been blocked, please contact to Admin',
    40135: 'Account of user who create this post not enough to extend',
    40136: 'Extend post fail',
    40137: 'Inactive post fail',
    40138: 'Applying must have CV, pls upload cv or use your available cv ',
    40139: 'You dont have available cv, pls upload new!',

    /* 40140 -> 40149 users-2 */
    40140: 'This cv is expired you need pay again',
    40141: 'Change password fail!',
    40142: 'Lock user fail!',
    40143: 'Current password is not match!',
    40144: 'Unlock user fail!',
    40145: 'file must be required!',
    40146: 'Upload cv fail',
    40147: 'Must purchase vip in order to buy vip candidate',

    /* 40150 -> 40180 config */
    40150: 'Update setting config fail',
    40151: 'This config cant update',
    40152: 'This config not found',
    40153: 'Cant update lower or equal package',
    40154: 'You have been used full free posts in this vip package',
    40155: 'You have been used full free posts per day',
    40156: 'You have been used full free profiles per day',
    40157: 'VIP package not found, so u cant use vip option',
    /* 40181 -> 40210 advertisement */
    40181: 'Create new advertisement fail',
    40182: 'Can not create advertisement which has existed position',
    40183: 'image must be required',
    40184: 'Position and config are not match',
    40185: 'Delete advertisement fail!',
    40186: 'Update advertisement fail!',
    /* 40211 -> 40230 news */
    40211: "Create news fail",
    40212: "Delete news fail",
    40213: "Update news fail",
    40214: "This news is not existed",
    /* 40231 -> 40270 notifications */
    40231: "List notifications fail!",
    40232: "Read notification fail!",
    40233: "Read all notification fail!",
    40234: "Create notification fail!",
    40234: "This notification not found!",
    40235: "Cant count notification not found!",
    /* 40271 -> 40300 template CV */
    40271: "file must be require",
    40272: "Upload cv fail!",
    40273: "Delete cv fail!",
    40274: "CV not found",
    /* 40301 -> 40330 internal post */
    40301: "Create internal post fail",
    40302: "Update internal post fail",
    /* 40331 -> 40350 upgrade candidate */
    40331: "Upgrade candidate fail",
    /* 40351 -> 40370 external user */
    40351: "Create external user fail",
    40352: "Update external user fail",
    40353: "Delete external user fail",
    /* 40370 -> 40400 countries + cities */
    40370: "Create country fail",
    40371: "Update country fail!",
    40372: "Country name must be unique",
    40373: "Xóa chương trình thất bại",
}