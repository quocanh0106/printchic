export const tableHeader = [
  'ID',
  'Nhà tuyển dụng',
  'Số điện thoại',
  'Tài khoản',
  'Số lượng việc làm',
  'Trạng thái',
  'Thao tác'
]
export const dataKeys = ['id', 'employer', 'phone', 'account', 'workNumber', 'status', 'action']

export const styleHeader = [
  { minWidth: '' },
  { minWidth: '200px' },
  { minWidth: '150px' },
  { minWidth: '210px' },
  { minWidth: '170px' },
  { minWidth: '150px' },
  { minWidth: '150px' }
]

export const listStatus = [
  {
    label: 'Đang hoạt động',
    value: 'ACTIVE'
  },
  {
    label: 'Đã bị khóa',
    value: 'INACTIVE'
  },
  {
    label: 'Đang chờ duyệt',
    value: 'WAITING_ACCEPTED'
  },
  {
    label: 'Từ chối',
    value: 'REJECTED'
  }
]
