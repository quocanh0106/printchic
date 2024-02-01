import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '~/Components'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import CustomTable from '~/Components/CustomTable/CustomTable'
import { typeInputComponent, typeTextInput } from '~/Components/FormInput/helper'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import ActionColumn from './components/ActionColumn'
import { dataKeys, tableHeader } from './config'
import { PRICE_SETTING_FIELD_NAME } from './fieldName'
import { yupResolver } from '@hookform/resolvers/yup'
import { editPriceSchema } from './schema'
import { RootState } from '~/Config/ReduxConfig/Store'
import { SettingPricesReduxActions } from '~/ReduxSaga/SettingPrices/SettingPricesRedux'

function PricesSetting() {
  /* Selector data from store */
  const { listConfigs } = useAppSelector((state: RootState) => state.setting_prices)
  // const { isRefresh } = useAppSelector((state: RootState) => state.setting_prices)
  /*  */

  const dispatch = useAppDispatch()
  const [openDialog, setOpenDialog] = useState(false)
  const [dataSelectedRow, setDataSelectedRow] = useState<any>({})
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    dispatch(SettingPricesReduxActions.getListConfigsRequest({ page: currentPage }))
  }, [currentPage])

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(editPriceSchema)
  })

  const openDialogEditPrice = (data: any) => {
    setOpenDialog(true)
    setDataSelectedRow(data)
    // set value to form edit price
    setValue(PRICE_SETTING_FIELD_NAME.CONTENT, data[PRICE_SETTING_FIELD_NAME.CONTENT])
    setValue(PRICE_SETTING_FIELD_NAME.PRICE, data[PRICE_SETTING_FIELD_NAME.PRICE])
    setValue(PRICE_SETTING_FIELD_NAME.UNIT, data[PRICE_SETTING_FIELD_NAME.UNIT])
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const onSubmit: SubmitHandler<any> = (values) => {
    const params = {
      ...values,
      configObjId: dataSelectedRow?._id
    }
    dispatch(SettingPricesReduxActions.updateSettingPricesRequest({ body: params }))
    setOpenDialog(false)
    dispatch(SettingPricesReduxActions.getListConfigsRequest({ page: currentPage }))
  }
  const CustomDialogContent = () => {
    return (
      <div>
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={PRICE_SETTING_FIELD_NAME.CONTENT}
          label={'Nôi dung giá'}
          errorMessage={errors[PRICE_SETTING_FIELD_NAME.CONTENT]?.message || ''}
          sx={{ marginBottom: '40px' }}
          disabled
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={PRICE_SETTING_FIELD_NAME.PRICE}
          label={'Giá trị'}
          placeholder={'Nhập giá trị'}
          errorMessage={errors[PRICE_SETTING_FIELD_NAME.PRICE]?.message || ''}
          typeInput={typeTextInput.decimal}
          sx={{ marginBottom: '40px' }}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={PRICE_SETTING_FIELD_NAME.UNIT}
          label={'Đơn vị'}
          placeholder={'Nhập đơn vị'}
          errorMessage={errors[PRICE_SETTING_FIELD_NAME.UNIT]?.message || ''}
          sx={{ marginBottom: '20px' }}
          disabled
        />
      </div>
    )
  }

  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'CÀI ĐẶT GIÁ TIỀN' }))
  }, [dispatch])

  const dataTable = useMemo(() => {
    const dataListConfig = listConfigs?.items || []
    const tempItems = new Array(dataListConfig?.length).fill({})
    dataListConfig?.forEach((ele: any, index: number) => {
      tempItems[index] = {
        id: ele.id,
        content: ele.configName,
        value: ele.value,
        unit: ele.unit,
        action: <ActionColumn data={ele} openDialogEditPrice={openDialogEditPrice} />
      }
    })
    return tempItems
  }, [listConfigs])

  return (
    <div>
      <CustomTable
        setCurrentPage={setCurrentPage}
        data={dataTable}
        headerCells={tableHeader}
        dataKeys={dataKeys}
        pageCount={listConfigs?.paginator?.pageCount || 1}
      />
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={`Chỉnh sửa giá tiền cho id ${dataSelectedRow?.id}`}
        content={<CustomDialogContent />}
        onConfirm={handleSubmit(onSubmit)}
      />
    </div>
  )
}

export default PricesSetting
