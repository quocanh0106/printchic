import { useEffect } from 'react'
import { styled } from 'styled-components'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import InfoTemplate from './components/InfoTemplate'
import ListFile from './components/ListFile'

function CVSetting() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'CÀI ĐẶT CV' }))
  }, [dispatch])

  return (
    <Container>
      <InfoTemplate />
      <ListFile />
    </Container>
  )
}

export default CVSetting

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 20px;
  border-radius: 8px;
`
