/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import CustomTable from '~/Components/CustomTable/CustomTable'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { FlexBoxColumn, FlexBoxEnd, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { AdvReduxActions } from '~/ReduxSaga/Adv/AdvRedux'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { Images } from '~/Themes'
import { getBase64FromFile, getImageBlobFromURL } from '~/Utils'
import ActionColumn from './components/ActionColumn'
import { dataKeys, styleHeader, tableHeader } from './config'
import { PROGRAM_SETTING_FIELD_NAME } from './fieldName'
import { SearchAdvSettingSchema } from './schema'

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
let countInput = 1

function ProgramSetting() {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentIdAdv, setcurrentIdProgram] = useState('')
  const fileInputRef: any = useRef(null)
  const [searchParams, setSearchParams] = useState({})

  const { listProgram } = useAppSelector((state: RootState) => state.adv)

  useEffect(() => {
    dispatch(AdvReduxActions.getListProgramRequest({ page: currentPage, searchParams }))
  }, [currentPage, searchParams])

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setcurrentIdProgram('')
  }

  const CustomDialogContent = () => {
    const [fileUpload, setFileUpload] = useState<any>('')
    const [listCity, setListCity] = useState<any>([1])
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
      unregister,
      setError,
      reset,
      formState: { errors }
    } = useForm<any>({
      mode: 'onSubmit'
    })

    const getImage = async () => {
      if (currentIdAdv) {
        const detailProgram = listProgram?.items?.find((ele: any) => ele._id == currentIdAdv)
        let fileFormImage
        await getImageBlobFromURL(detailProgram.logo)
          .then((file) => {
            fileFormImage = file
          })
          .catch((error) => {
            console.error('An error occurred:', error)
          })
        setValue('cityName', detailProgram.countryName)
        const tempListCity: any = []
        detailProgram?.cities?.map((ele: any, index: number) => {
          tempListCity.push(index + 1)
          setValue(`city-${index + 1}`, ele.cityName)
        })
        countInput = detailProgram?.cities?.length
        setListCity(tempListCity)
        setFileUpload(fileFormImage)
      } else {
        reset()
      }
    }

    useEffect(() => {
      getImage()
    }, [listProgram])

    const hasEmptyStringValue = (obj: { [key: string]: string }) => {
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key) && obj[key] === '') {
          return true // Found an empty string value
        }
      }
      return false // No empty string values found
    }

    const removeAndReturnValues = (obj: any) => {
      delete obj['cityName']

      // Extract and return the values as an array
      const valuesArray: string[] = Object.values(obj)
      return valuesArray
    }

    const onSubmit: SubmitHandler<any> = (values) => {
      if (!values.cityName) {
        setError('cityName', { type: 'custom', message: 'Không được để trống trường này' })
      } else if (hasEmptyStringValue(values)) {
        toast.error('Bạn cần nhập đủ hết các ô thành phố')
      } else if (!fileUpload) {
        toast.error('Bạn cần thêm ảnh icon chương trình')
      } else {
        const formData: any = new FormData()
        formData.append('countryName', values.cityName)
        if (removeAndReturnValues(values).length === 1) {
          // If there's only one value, convert it to an array
          const data: any = removeAndReturnValues(values)[0]
          formData.append('cities', [data])
        } else {
          // If there are multiple values, append them directly
          removeAndReturnValues(values).forEach((value) => {
            formData.append('cities', value)
          })
        }
        if (currentIdAdv) {
          formData.append('countryObjId', currentIdAdv)
        }
        formData.append('image', fileUpload)
        dispatch(AdvReduxActions.createProgramRequest({ formData: formData, currentIdAdv: currentIdAdv }))
        handleCloseDialog()
      }
    }

    const handleAddCityInput = (index: number) => {
      countInput++
      const tempListCity = JSON.parse(JSON.stringify(listCity))
      tempListCity.splice(index + 1, 0, countInput.toString())
      setListCity(tempListCity)
    }

    const handleRemoveCityInput = (name: string) => {
      const tempListCity = JSON.parse(JSON.stringify(listCity))
      const indexItem = tempListCity.indexOf(name)
      tempListCity.splice(indexItem, 1)
      unregister(`city-${name}`)
      setListCity(tempListCity)
    }

    return (
      <div>
        <FlexBoxColumn style={{ gap: 15, marginBottom: 15 }}>
          <FormInput
            control={control}
            type={typeInputComponent.InputText}
            name={'cityName'}
            label={'Tên chương trình'}
            errorMessage={errors['cityName']?.message || ''}
            sx={{ marginBottom: '20px' }}
          />
        </FlexBoxColumn>
        {listCity?.map((ele: string, index: number) => (
          <FlexBoxSpaceBetween key={ele}>
            <FlexBoxColumn style={{ gap: 15, marginBottom: 15, width: '100%' }}>
              <FormInput
                control={control}
                type={typeInputComponent.InputText}
                name={`city-${ele}`}
                label={index === 0 && 'Thành phố'}
                placeholder={`Nhập tên thành phố số ${index + 1}`}
                errorMessage={errors[`city-${ele}`]?.message || ''}
              />
            </FlexBoxColumn>
            <FlexBoxSpaceBetween style={{ minWidth: '60px', alignItems: 'center', marginBottom: index === 0 ? 0 : 15 }}>
              <img src={Images.circlePlus} alt='icon' width={30} onClick={() => handleAddCityInput(index)} />
              <img
                src={index === 0 ? Images.disableMinus : Images.circleMinus}
                alt='icon'
                width={30}
                onClick={() => index !== 0 && handleRemoveCityInput(ele)}
              />
            </FlexBoxSpaceBetween>
          </FlexBoxSpaceBetween>
        ))}
        <CustomText block type={TEXT_TYPE.primary_16_700}>
          Icon chương trình *
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
    setSearchParams({
      search: values.search
    })
  }

  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'CÀI ĐẶT CHƯƠNG TRÌNH' }))
  }, [dispatch])

  const getNameCity = (arrayCity: any) => {
    const resultName: any = []
    arrayCity.forEach((ele: any, index: number) => {
      if (ele && index < 5) {
        resultName.push(ele.cityName)
      }
    })
    return resultName.join(', ')
  }

  const dataTable = useMemo(() => {
    const tempItems = new Array(listProgram?.items?.length).fill({})
    listProgram?.items?.forEach((ele: any, index: number) => {
      tempItems[index] = {
        id: ele._id,
        cities: getNameCity(ele.cities),
        countryName: ele.countryName,
        createdAt: ele.createdAt,
        action: <ActionColumn id={ele._id} setOpenDialog={setOpenDialog} setcurrentIdProgram={setcurrentIdProgram} />
      }
    })
    return tempItems
  }, [listProgram])

  return (
    <div>
      <FlexBoxSpaceBetween>
        <FlexBoxEnd style={{ gap: 20, marginBottom: '30px' }}>
          <FormInput
            control={control}
            type={typeInputComponent.InputText}
            name={PROGRAM_SETTING_FIELD_NAME.SEARCH}
            label={'Tìm kiếm'}
            placeholder={'Tìm kiếm theo tiêu đề'}
            errorMessage={errors[PROGRAM_SETTING_FIELD_NAME.SEARCH]?.message || ''}
            sx={{
              width: '450px'
            }}
          />
          <CustomBtn width={'200px'} onClick={handleSubmit(onSubmit)} text={'Tìm kiếm'} />
        </FlexBoxEnd>
        <FlexBoxEnd style={{ gap: 20, margin: '0 0 10px 50px' }}>
          <CustomBtn
            startIcon={<img style={{ marginRight: '10px' }} width='30px' src={Images.addMoneyIcon} alt='addMoreIcon' />}
            width='220px'
            colorButton='yellow'
            text={'Tạo mới'}
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
        pageCount={listProgram?.paginator?.pageCount}
      />
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={currentIdAdv ? 'Cập nhật chương trình' : 'Thêm mới chương trình'}
        content={<CustomDialogContent />}
        hideSubmitBtn
        hideCancelBtn
        width='700px'
      />
    </div>
  )
}

export default ProgramSetting
