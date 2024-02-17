// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import categoryProduct from 'src/store/apps/categoryProduct'
import categoryBlog from 'src/store/apps/categoryBlog'
import permissions from 'src/store/apps/permissions'
import setting from 'src/store/apps/setting'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    categoryProduct,
    categoryBlog,
    permissions,
    setting
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
