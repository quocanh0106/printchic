import { styled } from 'styled-components'
import CustomTable from '~/Components/CustomTable/CustomTable'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { Images } from '~/Themes'
import { dataKeysListPost, statusPost, styleHeader, tableHeaderListPost } from '../config'
import { useMemo, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { HRReduxActions } from '~/ReduxSaga/HR/HRRedux'
import { RootState } from '~/Config/ReduxConfig/Store'
import { findLabelByValueInOptions } from '~/Utils'

function TabListPost({ id }: any) {
  const dispatch = useAppDispatch()
  const { listPost } = useAppSelector((state: RootState) => state.hr)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(HRReduxActions.ListPostHRRequest({ id, page: currentPage }))
  }, [currentPage])

  const dataTable = useMemo(() => {
    const tempListPost = new Array(listPost?.length).fill({})
    listPost?.items?.forEach((ele: any, index: number) => {
      tempListPost[index] = {
        id: ele._id,
        detail: ele.description,
        createDate: ele.createdAt,
        updateDate: ele?.updatedAt,
        countView: 'Chưa có trong api',
        apply: ele.numberOfRecruits,
        status: findLabelByValueInOptions(statusPost, ele.status, 'value', 'label')
      }
    })
    return tempListPost
  }, [listPost])

  return (
    <div>
      <FlexBoxSpaceBetween style={{ width: '100%', marginBottom: '35px' }}>
        <ItemContainer>
          <img src={Images.penIcon} alt='#' />
          <div>
            <CustomText type={TEXT_TYPE.primary_24_700}>{listPost?.paginator?.itemCount}</CustomText>
            <p>Tổng số bài đăng</p>
          </div>
        </ItemContainer>
        <ItemContainer>
          <img src={Images.timeIcon} alt='#' />
          <div>
            <CustomText type={TEXT_TYPE.primary_24_700}>{listPost?.totalWaiting}</CustomText>
            <p>Bài đăng chờ phê duyệt</p>
          </div>
        </ItemContainer>
        <ItemContainer>
          <img src={Images.confirmIcon} alt='#' />
          <div>
            <CustomText type={TEXT_TYPE.primary_24_700}>{listPost?.totalActive?.value}</CustomText>
            <p>Bài đăng đang hoạt động</p>
          </div>
        </ItemContainer>
        <ItemContainer>
          <img src={Images.expiredTimeIcon} alt='#' />
          <div>
            <CustomText type={TEXT_TYPE.primary_24_700}>{listPost?.totalExpired}</CustomText>
            <p>Bài đăng đã hết hạn</p>
          </div>
        </ItemContainer>
      </FlexBoxSpaceBetween>
      <div>
        <CustomTable
          data={dataTable}
          pageCount={listPost?.paginator?.pageCount}
          headerCells={tableHeaderListPost}
          dataKeys={dataKeysListPost}
          styleHeader={styleHeader}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default TabListPost

const ItemContainer = styled(FlexBoxSpaceBetween)`
  gap: 25px;
  box-shadow: 0px 4px 4px 0px #bdbdbd80;
  padding: 15px 50px;
  border-radius: 8px;
  p {
    font-size: 14px;
  }
`
