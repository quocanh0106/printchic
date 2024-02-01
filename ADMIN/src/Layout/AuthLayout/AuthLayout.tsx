import { AuthLayoutWrap } from './styles'

const AuthLayout = (props: any) => {
  return (
    <AuthLayoutWrap>
      <div className='auth-layout-inner'>{props.children}</div>
    </AuthLayoutWrap>
  )
}

export default AuthLayout
