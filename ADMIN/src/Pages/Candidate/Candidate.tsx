import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomTable from '~/Components/CustomTable/CustomTable'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { FlexBoxEnd } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { CandidateReduxActions } from '~/ReduxSaga/Candidate/CandidateRedux'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import ActionColumn from './components/ActionColumn'
import { dataKeys, listCountry, listStatus, tableHeader } from './config'
import { CANDIDATE_FIELD_NAME } from './fieldName'
import { SearchCandidateSchema } from './schema'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { useNavigate } from 'react-router-dom'
import { findLabelByValueInOptions } from '~/Utils'
function Candidate() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { listCandidate } = useAppSelector((state: RootState) => state.candidate)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useState({})

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(SearchCandidateSchema)
  })

  const onSubmit: SubmitHandler<any> = (values) => {
    console.log('value', values)
    setSearchParams({
      status: values.status,
      search: values.search,
      countryObjId: values.country
    })
  }

  const dataTable = useMemo(() => {
    const tempListCandidate = new Array(listCandidate?.length).fill({})
    listCandidate?.items?.forEach((ele: any, index: number) => {
      tempListCandidate[index] = {
        id: (
          <div onClick={() => navigate(`/candidate/detail/${ele._id}`)}>
            <CustomText type={TEXT_TYPE.primary_16_400} customStyle={{ textDecoration: 'underline' }}>
              {ele._id}
            </CustomText>
          </div>
        ),
        employer: ele.fullName,
        phone: ele.phoneNumber,
        gender: ele.gender,
        country: ele.country,
        status: findLabelByValueInOptions(listStatus, ele.status, 'value', 'label'),
        action: <ActionColumn id={ele._id} status={ele.status} />
      }
    })
    return tempListCandidate
  }, [listCandidate])

  // add breadcrumbs
  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'QUẢN LÝ ỨNG VIÊN' }))
  }, [dispatch])

  useEffect(() => {
    dispatch(CandidateReduxActions.CandidateRequest({ type: 'CANDIDATE', page: currentPage, searchParams }))
  }, [currentPage, searchParams])

  return (
    <div>
      <FlexBoxEnd style={{ gap: 20, marginBottom: '30px' }}>
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={CANDIDATE_FIELD_NAME.SEARCH}
          label={'Tìm kiếm'}
          placeholder={'Tìm kiếm theo tên, ID, số điện thoại'}
          errorMessage={errors[CANDIDATE_FIELD_NAME.SEARCH]?.message || ''}
          sx={{
            width: '450px'
          }}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputSelect}
          name={CANDIDATE_FIELD_NAME.STATUS}
          label={'Trạng thái'}
          placeholder={'Trạng thái'}
          errorMessage={errors[CANDIDATE_FIELD_NAME.STATUS]?.message || ''}
          sx={{
            width: '150px'
          }}
          options={listStatus}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputSelect}
          name={CANDIDATE_FIELD_NAME.COUNTRY}
          label={'Quốc gia quan tâm'}
          placeholder={'Quốc gia quan tâm'}
          errorMessage={errors[CANDIDATE_FIELD_NAME.COUNTRY]?.message || ''}
          sx={{
            width: '150px'
          }}
          options={listCountry}
        />
        <CustomBtn width={'200px'} onClick={handleSubmit(onSubmit)} text={'Tìm kiếm'} />
      </FlexBoxEnd>
      <CustomTable
        setCurrentPage={setCurrentPage}
        data={dataTable}
        headerCells={tableHeader}
        dataKeys={dataKeys}
        pageCount={listCandidate?.paginator?.pageCount}
      />
    </div>
  )
}

export default Candidate
