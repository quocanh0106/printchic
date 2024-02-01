import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { RootState } from '~/Config/ReduxConfig/Store'
import { TOKEN_KEY } from '~/Constants'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import Layout from '~/Layout'
import AuthLayout from '~/Layout/AuthLayout/AuthLayout'
import { AuthReduxActions } from '~/ReduxSaga/Auth/AuthRedux'
import { RouteContainer } from '~/Routes'
import { AuthRoute } from '~/Routes/authRouter'

const Navigation = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isSignedIn } = useAppSelector((state: RootState) => state.auth)

  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_KEY)
    const userData = localStorage.getItem('user_data')
    if (!accessToken) {
      navigate('/login')
    } else {
      dispatch(AuthReduxActions.loginSuccess({ accessToken: accessToken, userData: userData }))
      if (location.pathname == '/login') {
        navigate('/')
      }
    }
  }, [isSignedIn])

  const renderRoutes = () => {
    if (isSignedIn) {
      return (
        <Layout>
          <Routes>
            {RouteContainer.map((route, i: number) => {
              return <Route path={route.path} element={<route.element />} key={i} />
            })}
          </Routes>
        </Layout>
      )
    } else {
      return (
        <AuthLayout>
          <Routes>
            {AuthRoute.map((route, i: number) => {
              return <Route path={route.path} element={<route.element />} key={i} />
            })}
          </Routes>
        </AuthLayout>
      )
    }
  }

  return <div>{renderRoutes()}</div>
}

export default Navigation
