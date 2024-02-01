import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
export interface CandidateState {
  dataSubmitBefore: any
  listCandidate: any
  detailCandidate: any
}

const initialState: CandidateState = {
  dataSubmitBefore: {},
  detailCandidate: {},
  listCandidate: []
}

const CandidateRedux = createSlice({
  name: 'CandidateRedux',
  initialState,
  reducers: {
    CandidateRequest: (state, action) => {
      state.dataSubmitBefore.list = action.payload
    },
    CandidateFailed: () => {},
    CandidateSuccess: (state, action) => {
      state.listCandidate = action.payload
    },
    DetailCandidateRequest: (state, action) => {
      state.dataSubmitBefore.detail = action.payload
    },
    DetailCandidateFailed: () => {},
    DetailCandidateSuccess: (state, action) => {
      state.detailCandidate = action.payload
      console.log('action.payload', action.payload)
    },

    BlockUserCandidateRequest: (state, action) => {
      state.dataSubmitBefore.blockUserRequest = action.payload
    },
    BlockUserCandidateFailed: () => {
      toast.error('Gọi api lỗi')
    },
    BlockUserCandidateSuccess: (state, action) => {
      if (action.payload.status === 'ACTIVE') {
        toast.success('Khóa tài khoản thành công')
      } else {
        toast.success('Mở khóa tài khoản thành công')
      }

      if (action.payload.fromScreen === 'list') {
        const tempListCandidateItems: any = JSON.parse(JSON.stringify(state?.listCandidate))
        const index = tempListCandidateItems?.items.findIndex((item: any) => item._id === action.payload.data._id)
        tempListCandidateItems.items[index] = action.payload.data
        state.listCandidate = tempListCandidateItems
      } else {
        state.detailCandidate = action.payload.data
      }
    }
  }
})

export const CandidateReduxActions = CandidateRedux.actions

export default CandidateRedux.reducer
