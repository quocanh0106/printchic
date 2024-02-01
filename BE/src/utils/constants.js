exports.IS_DELETED = {
    200: 'No', // chưa xóa
    300: 'Yes', // đã xóa
};
exports.YES_NO = {
    100: 'No',
    200: 'Yes',
};
exports.DEFAULT_PAGE = 1;
exports.DEFAULT_LIMIT = 10;

exports.STATUS = {
    100: 'ACTIVE',
    200: 'INACTIVE',
    300: 'WAITING_ACCEPTED',
    400: 'REJECTED'
}
exports.DISH_STATUS = {
    100: 'IN_STOCK',
    200: 'OUT_STOCK',
}
exports.GENDER = ["MALE", "FEMALE", "OTHER"];
exports.GENDER_FOR_WORK = ["MALE", "FEMALE", "OTHER", "ALL"];
// exports.STATUS_POST = ["URGENT", "HOT", "NORMAL"];
exports.STATUS_POST = {
    100: "FREE",
    200: "NORMAL",
    300: "VIP3",
    400: "VIP2",
    500: "VIP1",
};
exports.STATUS_USER = ["TRUST", "UNTRUST"];
exports.TYPE_USER = ["HR", "CANDIDATE", "ADMIN"];
exports.OPTION_TYPE = ["SINGLE", "MULTI"];
exports.TYPE_CHARGING_HISTORIES = {
    100: 'UPGRADE_POSTS', // Nâng cấp bài post
    200: 'UPGRADE_USERS', // Tích xanh
    300: 'CHARGE_USERS', // Nạp tiền
    400: 'PURCHASE_PROFILES', // Mua thông tin ứng viên
    500: 'EXTEND_POSTS', // Gia hạn
    600: 'ADVERTISEMENTS', // Landing
    700: 'UPGRADE_CANDIDATE', // Nâng cấp người lao động
};
exports.TYPE_CHARGING_HISTORIES_ENUM = [
    'UPGRADE_POSTS',  // Nâng cấp bài post
    'UPGRADE_USERS',  // Tích xanh
    'CHARGE_USERS',  // Nạp tiền
    'PURCHASE_PROFILES',  // Mua thông tin ứng viên
    'EXTEND_POSTS',  // Gia hạn
    'ADVERTISEMENTS', // Landing
    'UPGRADE_CANDIDATE' // nâng cấp user vip
];
exports.ENTITY_TYPE_CHARGING_HISTORIES = {
    100: 'POSTS',
    200: 'USERS',
    300: 'ADVERTISEMENTS',
};
exports.ENTITY_TYPE_CHARGING_HISTORIES_ENUM = ['POSTS', 'USERS', 'ADVERTISEMENTS'];

exports.ENTITY_TYPE_ATTACHMENTS = {
    100: 'USERS',
    200: 'USER_POSTS',
    300: 'ADVERTISEMENTS',
}

exports.TYPE_UPLOAD_ATTACHMENT = {
    100: 'CV',
    200: 'APPLY',
    300: 'ADVERTISEMENT',
    400: 'TEMPLATE_CV',
}

exports.POSITION_ADVERTISEMENTS = {
    100: 'TOP1',
    200: 'TOP2',
    300: 'MIDDLE1',
    400: 'MIDDLE2',
    500: 'BOTTOM1',
    600: 'BOTTOM2',
}
exports.CONFIG_TYPE = {
    100: "ADVERTISEMENTS",
    200: "VIP",
    300: "UPLOAD_POST",
    400: "UPGRADE_CANDIDATE",
}
exports.CONFIG_EXPIRED_UNIT = {
    100: "DAYS",
    200: "WEEKS",
    300: "MONTHS",
    400: "HOURS",
    500: "YEARS",
}
exports.POST_TYPE = {
    100: "INTERNAL",
    200: "EXTERNAL",
}
exports.NOTIFICATION_TYPE = {
    100: "APPROVE",
    200: "REJECT",
    300: "EXPIRED_POSTS",
    400: "APPLY",
    500: "EXPIRED_PROFILES",
    600: "EXPIRED_VIP",
    700: "UPGRADE_VIP",
    800: "LOCK_USER",
    900: "OPEN_USER",
}
exports.FOR_ENTITY_TYPE = {
    100: "USER",
    200: "POST",
}
exports.CANDIDATE_TYPE = {
    100: "NORMAL",
    200: "PRO",
}
exports.CANDIDATE_GROUP = {
    100: "INTERNAL", // uv trên sàn
    200: "EXTERNAL", // uv tự thêm vào
}
exports.MY_CUSTOM_LABELS = {
    totalDocs: 'itemCount',
    docs: 'items',
    limit: 'limit',
    page: 'currentPage',
    nextPage: 'nextPage',
    prevPage: 'prevPage',
    totalPages: 'pageCount',
    pagingCounter: 'pagingCounter',
    meta: 'paginator',
};
exports.LANGUAGES = ['vi', 'en'];
