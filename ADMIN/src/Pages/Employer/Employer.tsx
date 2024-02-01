import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import CustomTable from '~/Components/CustomTable/CustomTable'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent, typeTextInput } from '~/Components/FormInput/helper'
import { FlexBoxAlignCenter, FlexBoxEnd, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { HRReduxActions } from '~/ReduxSaga/HR/HRRedux'
import { findLabelByValueInOptions } from '~/Utils'
import AccountColumn from './components/AccountColumn'
import ActionColumn from './components/ActionColumn'
import { dataKeys, listStatus, styleHeader, tableHeader } from './config'
import { EMPLOYER_FIELD_NAME } from './fieldName'
import { SearchEmployerSchema, rechargeSchema } from './schema'
import { Colors, Images } from '~/Themes'
function Employer() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { listHR } = useAppSelector((state: RootState) => state.hr)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentUserClick, setCurrentUserClick] = useState('')
  const [searchParams, setSearchParams] = useState({})
  const [openDialog, setOpenDialog] = useState(false)

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const CustomDialogContent = () => {
    const userData = listHR?.items.find((ele: any) => ele._id === currentUserClick)
    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm<any>({
      mode: 'onSubmit',
      resolver: yupResolver(rechargeSchema)
    })

    console.log('errors', errors)

    const onSubmit: SubmitHandler<any> = (values) => {
      dispatch(
        HRReduxActions.HRRechargeRequest({
          userObjId: currentUserClick,
          chargingMoney: values.chargingMoney,
          from: 'list'
        })
      )
      handleCloseDialog()
    }

    return (
      <div>
        <div>
          <FormInput
            control={control}
            disabled
            type={typeInputComponent.InputText}
            name={EMPLOYER_FIELD_NAME.EMPLOYER}
            label={'Nhà tuyển dụng'}
            value={userData.fullName}
            errorMessage={errors[EMPLOYER_FIELD_NAME.EMPLOYER]?.message || ''}
            sx={{ marginBottom: '40px' }}
          />
          <FormInput
            control={control}
            disabled
            type={typeInputComponent.InputText}
            value={userData.phoneNumber}
            name={EMPLOYER_FIELD_NAME.PHONE_NUMBER}
            label={'Số điện thoại'}
            errorMessage={errors[EMPLOYER_FIELD_NAME.PHONE_NUMBER]?.message || ''}
            sx={{ marginBottom: '40px' }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputText}
            typeInput={typeTextInput.decimal}
            name={EMPLOYER_FIELD_NAME.RECHARGE}
            label={'Số tiền cần nạp'}
            placeholder={'Nhập số tiền cần nạp'}
            errorMessage={errors[EMPLOYER_FIELD_NAME.RECHARGE]?.message || ''}
            sx={{ marginBottom: '20px' }}
          />
        </div>
        <FlexBoxEnd style={{ justifyContent: 'end', gap: 30 }}>
          <CustomBtn width='80px' onClick={handleCloseDialog} type='outlined' text={'Hủy'} />
          <CustomBtn width='80px' onClick={handleSubmit(onSubmit)} text={'OK'} />
        </FlexBoxEnd>
      </div>
    )
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(SearchEmployerSchema)
  })

  const onSubmit: SubmitHandler<any> = (values) => {
    setSearchParams({
      status: values.status,
      search: values.search
    })
  }

  const dataTable = useMemo(() => {
    const tempListHR = new Array(listHR?.length).fill({})
    listHR?.items?.forEach((ele: any, index: number) => {
      tempListHR[index] = {
        id: (
          <div onClick={() => navigate(`/employer/detail/${ele._id}`)}>
            <CustomText type={TEXT_TYPE.primary_16_400} customStyle={{ textDecoration: 'underline' }}>
              {ele._id}
            </CustomText>
          </div>
        ),
        employer: ele.fullName,
        phone: ele.phoneNumber,
        account: (
          <AccountColumn
            fund={ele.availableFund}
            id={ele._id}
            setOpenDialog={setOpenDialog}
            setCurrentUserClick={setCurrentUserClick}
          />
        ),
        workNumber: 'API rỗng',
        status: (
          <FlexBoxAlignCenter>
            {findLabelByValueInOptions(listStatus, ele.status, 'value', 'label')}
            {ele?.isTopHr == 'Yes' && <img width={30} src={Images.iconTopHR} style={{ marginLeft: 10 }} />}
          </FlexBoxAlignCenter>
        ),
        action: (
          <ActionColumn
            id={ele._id}
            isTopHr={ele?.isTopHr == 'Yes' ? true : false}
            status={ele.status}
            setOpenDialog={setOpenDialog}
            setCurrentUserClick={setCurrentUserClick}
          />
        )
      }
    })
    console.log('tempListHRtempListHRtempListHR', tempListHR)
    return tempListHR
  }, [listHR])

  console.log('dataTabledataTable', dataTable)

  // add breadcrumbs
  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'QUẢN LÝ NHÀ TUYỂN DỤNG' }))
  }, [])

  useEffect(() => {
    dispatch(HRReduxActions.HRRequest({ type: 'HR', page: currentPage, searchParams }))
  }, [currentPage, searchParams])

  return (
    <div>
      <FlexBoxSpaceBetween>
        <FlexBoxEnd style={{ gap: 20, marginBottom: '30px' }}>
          <FormInput
            control={control}
            type={typeInputComponent.InputText}
            name={EMPLOYER_FIELD_NAME.SEARCH}
            label={'Tìm kiếm'}
            placeholder={'Tìm kiếm theo tên, ID, số điện thoại'}
            errorMessage={errors[EMPLOYER_FIELD_NAME.SEARCH]?.message || ''}
            sx={{
              width: '350px'
            }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputSelect}
            name={EMPLOYER_FIELD_NAME.STATUS}
            label={'Trạng thái'}
            placeholder={'Trạng thái'}
            errorMessage={errors[EMPLOYER_FIELD_NAME.STATUS]?.message || ''}
            sx={{
              width: '200px'
            }}
            options={[
              {
                label: 'Đang hoạt động',
                value: 'ACTIVE'
              },
              {
                label: 'Đã bị khóa',
                value: 'INACTIVE'
              }
            ]}
          />
          <CustomBtn width={'170px'} onClick={handleSubmit(onSubmit)} text={'Tìm kiếm'} />
        </FlexBoxEnd>
        <CustomBtn
          colorButton='yellow'
          sx={{ background: Colors.secondary, textAlign: 'right' }}
          startIcon={<img width={20} src={Images.iconTopWhite} />}
          width={'170px'}
          onClick={handleSubmit(onSubmit)}
          text={'Lọc TOP'}
        />
      </FlexBoxSpaceBetween>
      <CustomTable
        data={dataTable}
        pageCount={listHR?.paginator?.pageCount}
        headerCells={tableHeader}
        dataKeys={dataKeys}
        setCurrentPage={setCurrentPage}
        styleHeader={styleHeader}
      />
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title='Nạp tiền'
        content={<CustomDialogContent />}
        hideSubmitBtn
        hideCancelBtn
      />
    </div>
  )
}

export default Employer
