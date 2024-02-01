export const tableHeaderListPost = [
  'No.',
  'Chi tiết nhà tuyển dụng',
  'Ngày tạo',
  'Ngày cập nhật',
  'Lượt xem',
  'Lượt ứng tuyển',
  'Trạng thái'
]
export const dataKeysListPost = ['id', 'detail', 'createDate', 'updateDate', 'countView', 'apply', 'status']

export const tableHeaderListCandidate = [
  'No.',
  'Họ và tên',
  'Giới tính',
  'Quốc gia quan tâm',
  'Ngành nghề quan tâm',
  'Ngày đăng kí'
]
export const dataKeysListCandidate = ['id', 'fullName', 'gender', 'country', 'job', 'registerDate']

export const styleHeader = [
  { minWidth: '' },
  { minWidth: '' },
  { minWidth: '120px' },
  { minWidth: '150px' },
  { minWidth: '100px' },
  { minWidth: '150px' },
  { minWidth: '150px' }
]

export const statusPost = [
  {
    label: 'Đang hoạt động',
    value: 'ACTIVE'
  },
  {
    label: 'Đã hết hạn',
    value: 'INACTIVE'
  },
  {
    label: 'Chờ phê duyệt',
    value: 'WAITING_ACCEPTED'
  }
]

export const statusHistory = [
  {
    label: 'Nâng cấp bài post',
    value: 'UPGRADE_POSTS'
  },
  {
    label: 'Mua Tích xanh',
    value: 'UPGRADE_USERS'
  },
  {
    label: 'Nạp tiền vào tài khoản',
    value: 'CHARGE_USERS'
  },
  {
    label: 'Mua thông tin ứng viên',
    value: 'PURCHASE_PROFILES'
  }
]
