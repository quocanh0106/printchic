import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import moment from 'moment'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import CustomTable from '~/Components/CustomTable/CustomTable'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent, typeTextInput } from '~/Components/FormInput/helper'
import { FlexBoxColumn, FlexBoxEnd, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import useWindowDimensions from '~/Hooks/useWindowDimensions'
import { AdvReduxActions } from '~/ReduxSaga/Adv/AdvRedux'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { Images } from '~/Themes'
import { getBase64FromFile, getImageBlobFromURL } from '~/Utils'
import Utilities from '~/Utils/Util'
import ActionColumn from './components/ActionColumn'
import { dataKeys, styleHeader, tableHeader } from './config'
import { ADV_SETTING_CREATE_FIELD_NAME, ADV_SETTING_FIELD_NAME } from './fieldName'
import { SearchAdvSettingSchema, createAdvSchema } from './schema'

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

function AdvSetting() {
  const dispatch = useAppDispatch()
  const { width } = useWindowDimensions()
  const [currentPage, setCurrentPage] = useState(1)
  console.log('currentPage', currentPage)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentIdAdv, setcurrentIdAdv] = useState('')
  const fileInputRef: any = useRef(null)

  const { listAdv, listPackage } = useAppSelector((state: RootState) => state.adv)

  useEffect(() => {
    dispatch(AdvReduxActions.getListAdvRequest({}))
    dispatch(AdvReduxActions.getListPackageRequest({}))
  }, [])

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setcurrentIdAdv('')
  }

  const CustomDialogContent = () => {
    const [fileUpload, setFileUpload] = useState<any>('')
    const handleButtonClick = () => {
      // Trigger the file input element when the button is clicked
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }

    const handleFileChange = (e: any) => {
      const selectedFile = e.target.files[0]

      if (selectedFile) {
        // Define an array of allowed image MIME types
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'] // Add more as needed

        if (!allowedImageTypes.includes(selectedFile.type)) {
          // Invalid file type
          toast.error('Please select a valid image file (JPEG, PNG, GIF, SVG, etc.).')
          return
        }

        if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
          // File size exceeds the maximum allowed size
          toast.error('File size exceeds the maximum allowed size (5MB).')
          return
        }

        // You can now handle the selected image file.
        setFileUpload(selectedFile)
      }
    }

    const {
      control,
      handleSubmit,
      setValue,
      getValues,
      reset,
      formState: { errors }
    } = useForm<any>({
      mode: 'onSubmit',
      resolver: yupResolver(createAdvSchema)
    })

    const getImage = async () => {
      if (currentIdAdv) {
        const detailAdv = listAdv?.items?.find((ele: any) => ele._id == currentIdAdv)
        let fileFormImage
        await getImageBlobFromURL(detailAdv.image)
          .then((file) => {
            fileFormImage = file
          })
          .catch((error) => {
            console.error('An error occurred:', error)
          })
        setValue(ADV_SETTING_CREATE_FIELD_NAME.POSITION_ADV_MODAl, detailAdv.position)
        setValue(ADV_SETTING_CREATE_FIELD_NAME.PACKAGE_ADV_MODAL, detailAdv.configObjId)
        setValue(ADV_SETTING_CREATE_FIELD_NAME.REVENUE_MODAL, detailAdv.revenue)
        setValue(ADV_SETTING_CREATE_FIELD_NAME.NAME_ADV_MODAL, detailAdv.advertisementName)
        setValue(ADV_SETTING_CREATE_FIELD_NAME.LINK_URL_MODAL, detailAdv.url)
        setValue(ADV_SETTING_CREATE_FIELD_NAME.START_DATE_MODAL, detailAdv.startDate)
        setValue(ADV_SETTING_CREATE_FIELD_NAME.END_DATE_MODAL, detailAdv.endDate)
        setFileUpload(fileFormImage)
      } else {
        reset()
      }
    }

    useEffect(() => {
      getImage()
    }, [currentIdAdv])

    const onSubmit: SubmitHandler<any> = (values) => {
      if (fileUpload) {
        const formData = new FormData()
        if (currentIdAdv) {
          formData.append('advertisementObjId', currentIdAdv)
          formData.append('advertisementName', values[ADV_SETTING_CREATE_FIELD_NAME.NAME_ADV_MODAL])
          formData.append('url', values[ADV_SETTING_CREATE_FIELD_NAME.LINK_URL_MODAL])
          formData.append('image', fileUpload)
        } else {
          formData.append('position', values[ADV_SETTING_CREATE_FIELD_NAME.POSITION_ADV_MODAl])
          formData.append('configObjId', values[ADV_SETTING_CREATE_FIELD_NAME.PACKAGE_ADV_MODAL])
          formData.append('revenue', values[ADV_SETTING_CREATE_FIELD_NAME.REVENUE_MODAL])
          formData.append('advertisementName', values[ADV_SETTING_CREATE_FIELD_NAME.NAME_ADV_MODAL])
          formData.append('url', values[ADV_SETTING_CREATE_FIELD_NAME.LINK_URL_MODAL])
          formData.append('startDate', values[ADV_SETTING_CREATE_FIELD_NAME.START_DATE_MODAL])
          formData.append('endDate', values[ADV_SETTING_CREATE_FIELD_NAME.END_DATE_MODAL])
          formData.append('image', fileUpload)
        }
        dispatch(AdvReduxActions.createAdvRequest({ formData: formData, currentIdAdv: currentIdAdv }))
        handleCloseDialog()
      } else {
        toast.error('Bạn cần thêm ảnh bìa quảng cáo')
      }
    }

    return (
      <div>
        <FlexBoxColumn style={{ gap: 15, marginBottom: 15 }}>
          <FlexBoxSpaceBetween style={{ gap: 15 }}>
            <FormInput
              fullWidth
              control={control}
              type={typeInputComponent.InputSelect}
              name={ADV_SETTING_CREATE_FIELD_NAME.PACKAGE_ADV_MODAL}
              label={'Gói quảng cáo *'}
              placeholder={'Chọn gói quảng cáo'}
              errorMessage={errors[ADV_SETTING_CREATE_FIELD_NAME.PACKAGE_ADV_MODAL]?.message || ''}
              options={listPackage?.map((ele: any) => {
                return {
                  label: ele.configName,
                  value: ele._id
                }
              })}
              onChangeCallBack={() => {
                const currentData = listPackage?.find(
                  (ele: any) => ele._id == getValues(ADV_SETTING_CREATE_FIELD_NAME.PACKAGE_ADV_MODAL)
                )
                setValue(ADV_SETTING_CREATE_FIELD_NAME.POSITION_ADV_MODAl, currentData.detail.position)
                setValue(ADV_SETTING_CREATE_FIELD_NAME.REVENUE_MODAL, currentData.value)
                setValue(ADV_SETTING_CREATE_FIELD_NAME.START_DATE_MODAL, moment().format('YYYY-MM-DD'))
                switch (currentData?.detail.timeUnit) {
                  case 'hours':
                    setValue(
                      ADV_SETTING_CREATE_FIELD_NAME.END_DATE_MODAL,
                      moment()
                        .add(currentData?.detail?.time, 'hours')
                        .format('YYYY-MM-DD')
                    )
                    break
                  case 'week':
                    setValue(
                      ADV_SETTING_CREATE_FIELD_NAME.END_DATE_MODAL,
                      moment()
                        .add(currentData?.detail?.time * 7, 'days')
                        .format('YYYY-MM-DD')
                    )

                    break
                  case 'month':
                    setValue(
                      ADV_SETTING_CREATE_FIELD_NAME.END_DATE_MODAL,
                      moment()
                        .add(currentData?.detail?.time, 'months')
                        .format('YYYY-MM-DD')
                    )

                    break

                  default:
                    break
                }
              }}
            />
            <FormInput
              fullWidth
              disabled
              control={control}
              type={typeInputComponent.InputText}
              name={ADV_SETTING_CREATE_FIELD_NAME.POSITION_ADV_MODAl}
              label={'Vị trí quảng cáo *'}
              placeholder={'Chọn vị trí quảng cáo'}
              errorMessage={errors[ADV_SETTING_CREATE_FIELD_NAME.POSITION_ADV_MODAl]?.message || ''}
            />
          </FlexBoxSpaceBetween>
          <FormInput
            control={control}
            disabled
            type={typeInputComponent.InputText}
            typeInput={typeTextInput.decimal}
            name={ADV_SETTING_CREATE_FIELD_NAME.REVENUE_MODAL}
            label={'Doanh thu'}
            errorMessage={errors[ADV_SETTING_CREATE_FIELD_NAME.REVENUE_MODAL]?.message || ''}
            sx={{ marginBottom: '20px' }}
          />
          <FlexBoxSpaceBetween style={{ gap: 15 }}>
            <FormInput
              fullWidth
              control={control}
              type={typeInputComponent.InputText}
              name={ADV_SETTING_CREATE_FIELD_NAME.NAME_ADV_MODAL}
              label={'Tên quảng cáo *'}
              placeholder={'Nhập tên quảng cáo'}
              errorMessage={errors[ADV_SETTING_CREATE_FIELD_NAME.NAME_ADV_MODAL]?.message || ''}
            />
            <FormInput
              fullWidth
              control={control}
              type={typeInputComponent.InputText}
              name={ADV_SETTING_CREATE_FIELD_NAME.LINK_URL_MODAL}
              label={'URL quảng cáo *'}
              placeholder={'Nhập URL quảng cáo'}
              errorMessage={errors[ADV_SETTING_CREATE_FIELD_NAME.LINK_URL_MODAL]?.message || ''}
            />
          </FlexBoxSpaceBetween>
          <FlexBoxSpaceBetween style={{ gap: 15 }}>
            <FormInput
              fullWidth
              control={control}
              disabled
              type={typeInputComponent.InputText}
              name={ADV_SETTING_CREATE_FIELD_NAME.START_DATE_MODAL}
              label={'Ngày bắt đầu'}
              errorMessage={errors[ADV_SETTING_CREATE_FIELD_NAME.START_DATE_MODAL]?.message || ''}
            />
            <FormInput
              fullWidth
              control={control}
              disabled
              type={typeInputComponent.InputText}
              name={ADV_SETTING_CREATE_FIELD_NAME.END_DATE_MODAL}
              label={'Ngày kết thúc'}
              errorMessage={errors[ADV_SETTING_CREATE_FIELD_NAME.END_DATE_MODAL]?.message || ''}
            />
          </FlexBoxSpaceBetween>
        </FlexBoxColumn>
        <CustomText block type={TEXT_TYPE.primary_16_700}>
          Ảnh bìa quảng cáo *
        </CustomText>
        <CustomText block type={TEXT_TYPE.darkGrey_16_400}>
          Số lượng ảnh tối đa: 1{' '}
        </CustomText>
        <CustomText block type={TEXT_TYPE.darkGrey_16_400}>
          Dung lượng tối đa: 5MB
        </CustomText>
        <CustomText block type={TEXT_TYPE.darkGrey_16_400}>
          Định dạng file: .jpg, .jpeg .png
        </CustomText>
        <CustomText block type={TEXT_TYPE.darkGrey_16_400}>
          Kích thước khuyên dùng: 600 x 800 px
        </CustomText>
        <Box py={1}>
          <input
            accept='image/jpeg, image/png'
            style={{ display: 'none' }}
            id='image-upload'
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {fileUpload ? (
            <div style={{ width: '60%', position: 'relative' }}>
              <img
                width={'30px'}
                onClick={() => setFileUpload('')}
                style={{ position: 'absolute', right: 10, top: 10 }}
                src={Images.deleteIcon}
                alt='image'
              />
              <img width={'100%'} style={{ borderRadius: '8px' }} src={getBase64FromFile(fileUpload)} alt='image' />
            </div>
          ) : (
            <CustomBtn onClick={handleButtonClick} text={'Chọn ảnh'} width={'150px'} />
          )}
        </Box>
        <FlexBoxEnd style={{ justifyContent: 'end', gap: 30, marginTop: 30 }}>
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
    resolver: yupResolver(SearchAdvSettingSchema)
  })

  const onSubmit: SubmitHandler<any> = (values: any) => {
    console.log('value', values)
  }

  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'CÀI ĐẶT QUẢNG CÁO' }))
  }, [dispatch])

  const dataTable = useMemo(() => {
    const tempItems = new Array(listAdv?.items?.length).fill({})
    listAdv?.items?.forEach((ele: any, index: number) => {
      tempItems[index] = {
        id: ele.id,
        name: ele.advertisementName,
        positionAdv: ele.position,
        packageAdv: listPackage?.find((pack: any) => pack._id === ele.configObjId)?.configName,
        startTime: ele.startDate,
        endTime: ele.endDate,
        status: ele.status,
        revenue: Utilities.numberWithCommas(ele.revenue) + ' VNĐ',
        action: <ActionColumn id={ele.id} setOpenDialog={setOpenDialog} setcurrentIdAdv={setcurrentIdAdv} />
      }
    })
    return tempItems
  }, [listAdv, listPackage])

  return (
    <div>
      <FlexBoxSpaceBetween style={{ flexDirection: width < 1700 ? 'column' : 'row' }}>
        <FlexBoxEnd style={{ gap: 20, marginBottom: '30px' }}>
          <FormInput
            control={control}
            type={typeInputComponent.InputText}
            name={ADV_SETTING_FIELD_NAME.SEARCH}
            label={'Tìm kiếm'}
            placeholder={'Tìm kiếm theo tiêu đề'}
            errorMessage={errors[ADV_SETTING_FIELD_NAME.SEARCH]?.message || ''}
            sx={{
              width: '200px'
            }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputSelect}
            name={ADV_SETTING_FIELD_NAME.POSITION_ADV}
            label={'Vị trí quảng cáo'}
            placeholder={'Vị trí quảng cáo'}
            errorMessage={errors[ADV_SETTING_FIELD_NAME.POSITION_ADV]?.message || ''}
            sx={{
              width: '150px'
            }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputSelect}
            name={ADV_SETTING_FIELD_NAME.PACKAGE_ADV}
            label={'Gói quảng cáo'}
            placeholder={'Gói quảng cáo'}
            errorMessage={errors[ADV_SETTING_FIELD_NAME.PACKAGE_ADV]?.message || ''}
            sx={{
              width: '150px'
            }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputSelect}
            name={ADV_SETTING_FIELD_NAME.STATUS}
            label={'Trạng thái'}
            placeholder={'Trạng thái'}
            errorMessage={errors[ADV_SETTING_FIELD_NAME.STATUS]?.message || ''}
            sx={{
              width: '150px'
            }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputDate}
            name={ADV_SETTING_FIELD_NAME.START_DATE}
            label={'Ngày bắt đầu'}
            errorMessage={errors[ADV_SETTING_FIELD_NAME.START_DATE]?.message || ''}
            sx={{
              marginBottom: '50px',
              width: '120px'
            }}
          />
          <FormInput
            control={control}
            type={typeInputComponent.InputDate}
            name={ADV_SETTING_FIELD_NAME.END_DATE}
            label={'Ngày kết thúc'}
            errorMessage={errors[ADV_SETTING_FIELD_NAME.END_DATE]?.message || ''}
            sx={{
              marginBottom: '50px',
              width: '120px'
            }}
          />
        </FlexBoxEnd>
        <FlexBoxEnd style={{ gap: 20, margin: '0 0 10px 50px' }}>
          <CustomBtn width={'150px'} text={'Tìm kiếm'} onClick={handleSubmit(onSubmit)} />
          <CustomBtn
            startIcon={<img style={{ marginRight: '10px' }} width='30px' src={Images.addMoneyIcon} alt='addMoreIcon' />}
            width='220px'
            colorButton='yellow'
            text={'Quảng cáo mới'}
            onClick={() => setOpenDialog(true)}
          />
        </FlexBoxEnd>
      </FlexBoxSpaceBetween>
      <CustomTable
        setCurrentPage={setCurrentPage}
        data={dataTable}
        styleHeader={styleHeader}
        headerCells={tableHeader}
        dataKeys={dataKeys}
        pageCount={1}
      />
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={currentIdAdv ? 'Cập nhật quảng cáo' : 'Thêm mới quảng cáo'}
        content={<CustomDialogContent />}
        hideSubmitBtn
        hideCancelBtn
        width='700px'
      />
    </div>
  )
}

export default AdvSetting
