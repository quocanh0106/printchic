import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export interface AdvState {
  listAdv: any
  addListCV: any
  listCV: any
  dataSubmitBefore: any
  listPackage: any
  listProgram: any
}

const initialState: any = {
  isSignedIn: false,
  dataSubmitBefore: {},
  addListCV: {},
  listPackage: [],
  listProgram: [],
  listCV: []
}

const AdvRedux = createSlice({
  name: 'AdvRedux',
  initialState,
  reducers: {
    getListAdvRequest: (state, action) => {
      state.dataSubmitBefore.listAdv = action.payload
    },
    getListAdvFailed: () => {
      toast.error('lấy dữ liệu thất bại')
    },
    getListAdvSuccess: (state, action) => {
      state.listAdv = action.payload
    },
    DeleteAdvRequest: (state, action) => {
      state.dataSubmitBefore.deleteAdv = action.payload
    },
    DeleteAdvFailed: () => {
      toast.error('Xóa quảng cáo thất bại')
    },
    DeleteAdvSuccess: (state, action) => {
      const tempList = JSON.parse(JSON.stringify(state.listAdv))
      console.log('action', action.payload)
      const result = tempList.items.filter((ele: any) => ele.id != action.payload)
      tempList.items = result
      state.listAdv = tempList
      toast.success('Xóa quảng cáo thành công')
    },
    getListPackageRequest: (state, action) => {
      state.dataSubmitBefore.listPackage = action.payload
    },
    getListPackageFailed: () => {
      toast.error('lấy dữ liệu thất bại')
    },
    getListPackageSuccess: (state, action) => {
      state.listPackage = action.payload
    },
    createAdvRequest: (state, action) => {
      state.dataSubmitBefore.createAdv = action.payload
    },
    createAdvFailed: (state, action) => {
      state.dataSubmitBefore.createAdv = {}
      switch (action.payload.statusCode) {
        case 40182:
          toast.error('Vị trí đã có quảng cáo, vui lòng chọn vị trí khác')
          break

        default:
          toast.error('Tạo quảng cáo thất bại')
          break
      }
    },
    createAdvSuccess: (state, action) => {
      const { data, currentIdAdv } = action.payload
      console.log('action.payload', action.payload)
      toast.success(currentIdAdv ? 'Cập nhật quảng cáo thành công' : 'Tạo quảng cáo thành công')
      if (!currentIdAdv) {
        const tempListAdv = { ...state.listAdv }
        const tempNewItem = data
        tempNewItem.id = tempNewItem._id
        tempListAdv.items.push(tempNewItem)
        state.listAdv = tempListAdv
      }
    },
    getListCVRequest: () => {},
    getListCVFailed: () => {
      toast.error('lấy dữ liệu thất bại')
    },
    getListCVSuccess: (state, action) => {
      state.listCV = action.payload
    },
    addListCVRequest: (state, action) => {
      state.dataSubmitBefore.addListCV = action.payload
    },
    addListCVFailed: () => {
      toast.error('lấy dữ liệu thất bại')
    },
    addListCVSuccess: () => {
      toast.success('Thêm CV thành công')
    },
    deleteCVRequest: (state, action) => {
      state.dataSubmitBefore.deleteCV = action.payload
    },
    deleteCVFailed: () => {
      toast.error('Xóa CV thất bại')
    },
    deleteCVSuccess: () => {
      toast.success('Xóa CV thành công')
    },
    getListProgramRequest: (state, action) => {
      state.dataSubmitBefore.listProgram = action.payload
    },
    getListProgramFailed: () => {
      toast.error('lấy dữ liệu thất bại')
    },
    getListProgramSuccess: (state, action) => {
      state.listProgram = action.payload
    },
    createProgramRequest: (state, action) => {
      state.dataSubmitBefore.createProgram = action.payload
    },
    createProgramFailed: () => {
      toast.error('Tạo mới chương trình thất bại')
    },
    createProgramSuccess: (state, action) => {
      const currentIdAdv = action.payload
      state.dataSubmitBefore.createProgramSuccess = currentIdAdv
      toast.success(currentIdAdv ? 'Cập nhật chương trình thành công' : 'Tạo mới chương trình thành công')
    },
    DeleteProgramRequest: (state, action) => {
      state.dataSubmitBefore.deleteProgram = action.payload
    },
    DeleteProgramFailed: () => {
      toast.error('Xóa quảng cáo thất bại')
    },
    DeleteProgramSuccess: () => {
      toast.success('Xóa chương trình thành công')
    }
  }
})

export const AdvReduxActions = AdvRedux.actions

export default AdvRedux.reducer
