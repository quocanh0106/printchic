import Login from '~/Pages/Auth/Login/Login'
import { IRouter } from './types'
import ForgotPassword from '~/Pages/Auth/ForgotPassword/ForgotPassword'

export const AuthRoute: IRouter[] = [
  {
    path: '/login',
    exact: true,
    element: Login,
    isAuth: false
  },
  {
    path: '/forgot-password',
    exact: true,
    element: ForgotPassword,
    isAuth: false
  }
]
