const { CONFIG_TYPE, YES_NO, CONFIG_EXPIRED_UNIT, STATUS_POST } = require('../../utils/constants');
module.exports.dataConfigs = [
  {
    configCode: "CF_001",
    configName: "Giá bài đăng hot",
    value: 20000,
    unit: 'VNĐ/lần'
  },
  {
    configCode: "CF_002",
    configName: "Giá mua thông tin ứng viên",
    value: 30000,
    unit: 'VNĐ/lần'
  },
  {
    configCode: "CF_003",
    configName: "Giá gia hạn bài đăng",
    value: 10000,
    unit: 'VNĐ/lần'
  },
  {
    configCode: "CF_004",
    configName: "Giá gói quảng cáo hình ảnh 24h",
    value: 10000,
    unit: 'VNĐ/lần'
  },
  {
    configCode: "CF_005",
    configName: "Giá gói quảng cáo hình ảnh 48h",
    value: 20000,
    unit: 'VNĐ/lần'
  },
  {
    configCode: "CF_006",
    configName: "Giá gói quảng cáo hình ảnh 1 tuần",
    value: 20000,
    unit: 'VNĐ/lần'
  },
  {
    configCode: "CF_007",
    configName: "Giá gói quảng cáo hình ảnh 1 tháng",
    value: 20000,
    unit: 'VNĐ/lần'
  },
  {
    configCode: "CF_008",
    configName: "Giá đăng bài",
    value: 79000,
    unit: 'VNĐ/lần'
  },
  {
    configCode: "CF_009",
    configName: "Giá quảng cáo ở top 1 trong 24h",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 24,
      timeUnit: 'hours',
      position: 'TOP1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_010",
    configName: "Giá quảng cáo ở top 2 trong 24h",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 24,
      timeUnit: 'hours',
      position: 'TOP2',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_011",
    configName: "Giá quảng cáo ở middle 1 trong 24h",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 24,
      timeUnit: 'hours',
      position: 'MIDDLE1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_012",
    configName: "Giá quảng cáo ở middle 2 trong 24h",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 24,
      timeUnit: 'hours',
      position: 'MIDDLE2',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_013",
    configName: "Giá quảng cáo ở bottom 1 trong 24h",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 24,
      timeUnit: 'hours',
      position: 'BOTTOM1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_014",
    configName: "Giá quảng cáo ở bottom 2 trong 24h",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 24,
      timeUnit: 'hours'
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_015",
    configName: "Giá quảng cáo ở top 1 trong 1 tuần",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'week',
      position: 'TOP1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_016",
    configName: "Giá quảng cáo ở top 2 trong 1 tuần",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'week',
      position: 'TOP2',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_017",
    configName: "Giá quảng cáo ở middle 1 trong 1 tuần",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'week',
      position: 'MIDDLE1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_018",
    configName: "Giá quảng cáo ở middle 2 trong 1 tuần",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'week',
      position: 'MIDDLE2',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_019",
    configName: "Giá quảng cáo ở bottom 1 trong 1 tuần",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'week',
      position: 'BOTTOM1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_020",
    configName: "Giá quảng cáo ở bottom 2 trong 1 tuần",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'week',
      position: 'BOTTOM2',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_021",
    configName: "Giá quảng cáo ở top 1 trong 1 tháng",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'month',
      position: 'TOP1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_022",
    configName: "Giá quảng cáo ở top 2 trong 1 tháng",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'month',
      position: 'TOP2',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_023",
    configName: "Giá quảng cáo ở middle 1 trong 1 tháng",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'month',
      position: 'MIDDLE1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_024",
    configName: "Giá quảng cáo ở middle 2 trong 1 tháng",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'month',
      position: 'MIDDLE2',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_025",
    configName: "Giá quảng cáo ở bottom 1 trong 1 tháng",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'month',
      position: 'BOTTOM1',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "CF_026",
    configName: "Giá quảng cáo ở bottom 2 trong 1 tháng",
    value: 50000,
    unit: 'VNĐ/lần',
    detail: {
      time: 1,
      timeUnit: 'month',
      position: 'BOTTOM2',
    },
    type: CONFIG_TYPE[100],
  },
  {
    configCode: "VIP1",
    configName: "Gói vip 1",
    value: 28000000,
    unit: 'VNĐ/lần',
    level: 1,
    detail: {
      freeProfiles: 20,
      freePosts: 10,
      expiredPost: 7, //default unit = day
      priceForHighEmploy: 100000, // default vnd
      priceForNormalPost: 500000, // default vnd
    },
    expired: {
      value: 7,
      unit: CONFIG_EXPIRED_UNIT[100],
    },
    type: CONFIG_TYPE[200],
    canUpdate: YES_NO[100],
  },
  {
    configCode: "VIP2",
    configName: "Gói vip 2",
    value: 12495000,
    unit: 'VNĐ/lần',
    level: 2,
    detail: {
      freeProfiles: 10,
      freePosts: 7,
      expiredPost: 7, //default unit = day
      priceForHighEmploy: 100000, // default vnd
      priceForNormalPost: 300000, // default vnd
    },
    expired: {
      value: 7,
      unit: CONFIG_EXPIRED_UNIT[100],
    },
    type: CONFIG_TYPE[200],
    canUpdate: YES_NO[100],
  },
  {
    configCode: "VIP3",
    configName: "Gói vip 3",
    value: 4725000,
    unit: 'VNĐ/lần',
    level: 3,
    detail: {
      freeProfiles: 3,
      freePosts: 5,
      expiredPost: 7, //default unit = day
      priceForHighEmploy: 100000, // default vnd
      priceForNormalPost: 150000, // default vnd
    },
    expired: {
      value: 7,
      unit: CONFIG_EXPIRED_UNIT[100],
    },
    type: CONFIG_TYPE[200],
    canUpdate: YES_NO[100],
  },
  {
    configCode: "UPLOAD_POST_FREE",
    configName: "Cấu hình đăng bài free",
    value: 0,
    unit: 'VNĐ/lần',
    level: 10,
    detail: {
      totalPerDay: 1, // số lượt up 1 ngày
      postStatus: STATUS_POST[100]
    },
    expired: {
      value: 1,
      unit: CONFIG_EXPIRED_UNIT[100],
    },
    type: CONFIG_TYPE[300],
  },
  {
    configCode: "UPLOAD_POST_NORMAL",
    configName: "Cấu hình đăng bài thường (79k)",
    value: 79000,
    unit: 'VNĐ/lần',
    level: 4,
    detail: {
      postStatus: STATUS_POST[200]
    },
    expired: {
      value: 1,
      unit: CONFIG_EXPIRED_UNIT[100],
    },
    type: CONFIG_TYPE[300],
  },
  {
    configCode: "UPLOAD_POST_3",
    configName: "Cấu hình đăng bài lẻ 150k/1b",
    value: 150000,
    unit: 'VNĐ/lần',
    level: 3,
    detail: {
      postStatus: STATUS_POST[300]
    },
    expired: {
      value: 7,
      unit: CONFIG_EXPIRED_UNIT[100],
    },
    type: CONFIG_TYPE[300],
  },
  {
    configCode: "UPLOAD_POST_2",
    configName: "Cấu hình đăng bài lẻ 300k/1b",
    value: 300000,
    unit: 'VNĐ/lần',
    level: 2,
    detail: {
      postStatus: STATUS_POST[400]
    },
    expired: {
      value: 7,
      unit: CONFIG_EXPIRED_UNIT[100],
    },
    type: CONFIG_TYPE[300],
  },
  {
    configCode: "UPLOAD_POST_1",
    configName: "Cấu hình đăng bài lẻ 500k/1b",
    value: 500000,
    unit: 'VNĐ/lần',
    level: 1,
    detail: {
      postStatus: STATUS_POST[500]
    },
    expired: {
      value: 7,
      unit: CONFIG_EXPIRED_UNIT[100],
    },
    type: CONFIG_TYPE[300],
  },
  {
    configCode: "PRO_CANDIDATE",
    configName: "Nâng cấp vip cho người lao động",
    value: 50000,
    unit: 'VNĐ/lần',
    level: 1,
    type: CONFIG_TYPE[400],
  },
]

