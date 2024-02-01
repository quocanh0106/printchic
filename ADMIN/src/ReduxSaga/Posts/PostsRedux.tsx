import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export interface PostsState {
  listPosts: any
  postDetail: any
  dataSubmitBefore: any
}

const initialState: PostsState = {
  listPosts: {},
  postDetail: {},
  dataSubmitBefore: {}
}

const PostsRedux = createSlice({
  name: 'PostsRedux',
  initialState,
  reducers: {
    getListPostsRequest: (state, action) => {
      state.dataSubmitBefore.callListPost = action.payload
    },
    getListPostsSuccess: (state, action) => {
      state.listPosts = action.payload
    },
    getListPostsFail: () => {
      toast.error('Gọi api lỗi')
    },
    getPostDetailRequest: (_, __) => {},
    getPostDetailSuccess: (state, action) => {
      state.postDetail = action.payload
    },
    getPostDetailFail: () => {
      toast.error('Gọi API lỗi!')
    },
    acceptOrRejectPostsRequest: (state, action) => {
      state.dataSubmitBefore.acceptOrRejectPost = action.payload
    },
    acceptPostsSuccess: (state, action) => {
      console.log('state', state)
      if (action.payload.isApprove) {
        toast.success('Phê duyệt bài đăng thành công')
      } else {
        toast.success('Từ chối bài đăng thành công')
      }
    },
    acceptPostsFail: () => {
      toast.error('Gọi api lỗi')
    },
    extendPostsRequest: (state, action) => {
      state.dataSubmitBefore.extendPost = action.payload
    },
    extendSuccess: () => {
      toast.success('Gia hạn bài đăng thành công')
    },
    extendFail: () => {
      toast.error('Gia hạn bài đăng thất bại')
    },
    expiredPostsRequest: (state, action) => {
      state.dataSubmitBefore.expiredPosts = action.payload
    },
    expiredPostsSuccess: () => {
      toast.success('Hết hạn bài đăng thành công')
    },
    expiredPostsFail: () => {
      toast.error('Hết hạn bài đăng thất bại')
    }
  }
})

export const PostsReduxActions = PostsRedux.actions

export default PostsRedux.reducer
