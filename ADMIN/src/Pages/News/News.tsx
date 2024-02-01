import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomTable from '~/Components/CustomTable/CustomTable'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { FlexBoxEnd, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { Images } from '~/Themes'
import { LoginSchema } from '../Auth/schema'
import ActionColumn from './components/ActionColumn'
import { dataKeys, tableHeader } from './config'
import { NEWS_FIELD_NAME } from './fieldName'
import { useNavigate } from 'react-router-dom'
import { NewsReduxActions } from '~/ReduxSaga/News/NewsRedux'
import { RootState } from '~/Config/ReduxConfig/Store'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
function News() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { listNews } = useAppSelector((state: RootState) => state.news)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(NewsReduxActions.getListNewsRequest({ currentPage }))
  }, [currentPage])

  const {
    control,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema)
  })

  const dataTable = useMemo(() => {
    const tempListCandidate = new Array(listNews?.items).fill({})
    listNews?.items?.forEach((ele: any, index: number) => {
      tempListCandidate[index] = {
        id: (
          <div onClick={() => navigate(`/news/detail/${ele._id}`)}>
            <CustomText type={TEXT_TYPE.primary_16_400} customStyle={{ textDecoration: 'underline' }}>
              {ele._id}
            </CustomText>
          </div>
        ),
        title: ele.title,
        createDate: ele.createdAt,
        updateDate: ele.updatedAt,
        status: ele.status,
        action: <ActionColumn id={ele.id} />
      }
    })
    return tempListCandidate
  }, [listNews])

  // add breadcrumbs
  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'QUẢN LÝ TIN TỨC' }))
  }, [dispatch])

  return (
    <div>
      <FlexBoxSpaceBetween>
        <FlexBoxEnd style={{ gap: 20, marginBottom: '30px' }}>
          <FormInput
            control={control}
            type={typeInputComponent.InputText}
            name={NEWS_FIELD_NAME.SEARCH}
            label={'Tìm kiếm'}
            placeholder={'Tìm kiếm theo tiêu đề'}
            errorMessage={errors[NEWS_FIELD_NAME.SEARCH]?.message || ''}
            sx={{
              width: '350px'
            }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputSelect}
            name={NEWS_FIELD_NAME.STATUS}
            label={'Trạng thái'}
            placeholder={'Trạng thái'}
            errorMessage={errors[NEWS_FIELD_NAME.STATUS]?.message || ''}
            sx={{
              width: '150px'
            }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputSelect}
            name={NEWS_FIELD_NAME.DATE}
            label={'Ngày tạo'}
            placeholder={'Ngày tạo'}
            errorMessage={errors[NEWS_FIELD_NAME.DATE]?.message || ''}
            sx={{
              width: '150px'
            }}
          />
          <CustomBtn width={'150px'} text={'Tìm kiếm'} />
        </FlexBoxEnd>
        <CustomBtn
          onClick={() => navigate('/news/create')}
          startIcon={<img style={{ marginRight: '10px' }} width='30px' src={Images.addMoneyIcon} alt='addMoreIcon' />}
          width='200px'
          colorButton='yellow'
          text={'Tin tức mới'}
        />
      </FlexBoxSpaceBetween>
      <CustomTable
        setCurrentPage={setCurrentPage}
        data={dataTable}
        headerCells={tableHeader}
        dataKeys={dataKeys}
        pageCount={10}
      />
    </div>
  )
}

export default News
