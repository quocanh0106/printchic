export const url = {
  development: import.meta.env.VITE_API_URL
}

export const Endpoint = {





  // source old
  // admin
  LOGIN_ADMIN: 'login',
  LIST_DATA: 'auth/users/list',
  DETAIL_USER: 'auth/users/info',
  FW_INPUT_EMAIL: 'forgot',
  FW_INPUT_OTP: 'verifyCode',
  FW_CHANGE_PASSWORD: 'resetPassword',
  RECHARGE_USER: 'auth/users/chargeMoney',
  LIST_POST_HR: 'auth/posts/list',
  BLOCK_USER: 'auth/users/lockUser',
  UNLOCK_USER: 'auth/users/unlockUser',
  LIST_HISTORY_HR: 'auth/charging-histories/listByUser',
  LIST_POSTS: 'auth/posts/list',
  POST_DETAIL: 'auth/posts/info',
  ACCEPT_OR_REJECT_POST: 'auth/posts/approve',
  EXTEND_POST: 'auth/posts/extend',
  EXPIRED_POST: 'auth/posts/inactive',
  DASHBOARD_USER_DATA: 'auth/dashboards/userData',
  DASHBOARD_REVENUE_DATA: 'auth/dashboards/revenueData',
  DASHBOARD_REVENUE_BY_YEAR: 'auth/dashboards/revenueByYear',
  ADV_GET_LIST: 'auth/advertisements/list',
  CV_GET_LIST: 'auth/attachments/listTemplateCV',
  CV_ADD_LIST: 'auth/attachments/createTemplateCV',
  LIST_PACKAGE_ADV: 'auth/configs/listAdvertisement',
  CREATE_ADV: 'auth/advertisements/create',
  UPDATE_ADV: 'auth/advertisements/update',
  DELETE_AUTH: 'auth/advertisements/delete',
  DELETE_CV: 'auth/attachments/delete',
  LIST_NEWS: 'news/list',
  CREATE_NEWS: 'auth/news/create',
  UPDATE_NEWS: 'auth/news/update',
  CREATE_PROGRAM: 'auth/countries/create',
  UPDATE_PROGRAM: 'auth/countries/update',
  PROFILE: 'auth/users/info',
  DELETE_PROGRAM: 'auth/countries/delete',
  GET_INFO_NEWS: 'news/info',
  SET_TOP_HR: 'auth/users/setTopHR',
  REMOVE_TOP_HR: 'auth/users/removeTopHR',
  /* Setting config */
  LIST_CONFIG: 'auth/configs/list',
  UPDATE_CONFIG: 'auth/configs/update',
  LIST_PROGRAM: 'auth/countries/list'
  /* Setting config */
}
