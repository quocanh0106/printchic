export const tableHeader = [
  'No',
  'Tiêu đề bài đăng',
  'Nhà tuyển dụng',
  'SĐT',
  'Số lượng ứng tuyển',
  'Lượt xem',
  'Ngày tạo',
  'Ngày cập nhật',
  'Thao tác'
]
export const dataKeys = [
  'id',
  'title',
  'employerName',
  'phoneNumber',
  'candidateNumber',
  'viewNumber',
  'createdAt',
  'udpatedAt',
  'action'
]
export const tableHeaderReject = [
  'No',
  'Tiêu đề bài đăng',
  'Nhà tuyển dụng',
  'SĐT',
  'Lý do',
  'Số lượng ứng tuyển',
  'Lượt xem',
  'Ngày tạo',
  'Ngày cập nhật',
  'Thao tác'
]
export const dataKeysReject = [
  'id',
  'title',
  'employerName',
  'phoneNumber',
  'reason',
  'candidateNumber',
  'viewNumber',
  'createdAt',
  'udpatedAt',
  'action'
]

export const listStatusPost = {
  INACTIVE: 0,
  ACTIVE: 1,
  WAITING_ACCEPTED: 2,
  REJECTED: 3
}

export const listStatusName: any = {
  INACTIVE: 'Đã hết hạn',
  ACTIVE: 'Đang hoạt động',
  WAITING_ACCEPTED: 'Chờ phê duyệt',
  REJECTED: 'Từ chối'
}

export const listDialog = {
  EXTEND: 1,
  ACCEPT: 2,
  REJECT: 3,
  EXPIRE: 4
}

export const styleHeader = [
  { minWidth: '' },
  { minWidth: '400px' },
  { minWidth: '150px' },
  { minWidth: '110px' },
  { minWidth: '170px' },
  { minWidth: '110px' },
  { minWidth: '140px' },
  { minWidth: '140px' },
  { minWidth: '100px' }
]
