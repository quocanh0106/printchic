/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import { FlexBoxEnd, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { NewsReduxActions } from '~/ReduxSaga/News/NewsRedux'
import { getImageBlobFromURL } from '~/Utils'
import ImageNews from './components/CreateEdit/ImageNews'
import MainText from './components/CreateEdit/MainText'
import StatusNews from './components/CreateEdit/StatusNews'
import { NEWS_FIELD_NAME } from './fieldName'
import { createNewsSchema } from './schema'

function CreateUpdateNews() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const [fileUploadThumbnail, setFileUploadThumbnail] = useState<any>('')
  const [fileUploadBanner, setFileUploadBanner] = useState<any>('')
  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(createNewsSchema)
  })

  const { handleSubmit, setValue } = methods
  const { detailNews } = useAppSelector((state: RootState) => state.news)
  useEffect(() => {
    if (params.id) {
      setValue(NEWS_FIELD_NAME.IMAGE_1, detailNews.image)
      setValue(NEWS_FIELD_NAME.IMAGE_2, detailNews.banner)
      setValue('content', detailNews.content)
      setValue('title', detailNews.title)
    }
  }, [params, detailNews])
  useEffect(() => {
    if (params.id) {
      getImageBlobFromURL(detailNews.banner)
        .then((file) => {
          setFileUploadBanner(file)
        })
        .catch((error) => {
          console.error('An error occurred:', error)
        })
      getImageBlobFromURL(detailNews.image)
        .then((file) => {
          setFileUploadThumbnail(file)
        })
        .catch((error) => {
          console.error('An error occurred:', error)
        })
    }
  }, [params, detailNews])

  const onSubmit: SubmitHandler<any> = (values) => {
    const formData = new FormData()
    if (params.id) {
      formData.append('newObjId', params.id)
    }
    formData.append('title', values[NEWS_FIELD_NAME.TITLE])
    formData.append('content', values[NEWS_FIELD_NAME.CONTENT])
    formData.append('image', fileUploadThumbnail)
    formData.append('banner', fileUploadBanner)
    dispatch(NewsReduxActions.createNewsRequest({ formData: formData, id: params.id }))
  }

  // add breadcrumbs
  useEffect(() => {
    dispatch(
      CommonReduxActions.setDataBreadcrumbs({
        text: 'THÊM TIN TỨC MỚI',
        isShowBackIcon: true,
        backFunc: () => navigate('/news')
      })
    )
  }, [dispatch, navigate])

  useEffect(() => {
    if (params.id) dispatch(NewsReduxActions.getInfoNewsRequest(params.id))
  }, [params])

  return (
    <FormProvider {...methods}>
      <FlexBoxSpaceBetween style={{ alignItems: 'start' }}>
        <div style={{ width: '30%' }}>
          <StatusNews />
          <ImageNews
            fileUploadThumbnail={fileUploadThumbnail}
            setFileUploadThumbnail={setFileUploadThumbnail}
            fileUploadBanner={fileUploadBanner}
            setFileUploadBanner={setFileUploadBanner}
          />
        </div>
        <div style={{ width: '68%' }}>
          <MainText />
          <FlexBoxEnd style={{ justifyContent: 'end', gap: 20, marginTop: 30 }}>
            <CustomBtn type={'outlined'} text={'Hủy'} width={'100px'} />
            <CustomBtn type={'contained'} text={'Lưu'} onClick={handleSubmit(onSubmit)} width={'100px'} />
          </FlexBoxEnd>
        </div>
      </FlexBoxSpaceBetween>
    </FormProvider>
  )
}

export default CreateUpdateNews
