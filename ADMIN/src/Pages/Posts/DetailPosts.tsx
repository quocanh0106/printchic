import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { FlexBox, FlexBoxEnd } from '~/Components/StyleComponents'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { PostsReduxActions } from '~/ReduxSaga/Posts/PostsRedux'
import BasicInfo from './components/detail/BasicInfo'
import DetailContent from './components/detail/DetailContent'
import DetailRecruitment from './components/detail/DetailRecruitment'
import ExaminationInfo from './components/detail/ExaminationInfo'
import ListImages from './components/detail/ListImages'
import RequiredInfo from './components/detail/RequiredInfo'
import { listDialog } from './config'
import { POST_FIELD_NAME } from './fieldName'
import { SearchPostsSchema, SubmitReasonSchema } from './schema'
import { RootState } from '~/Config/ReduxConfig/Store'

function DetailPosts() {
  const dispatch = useAppDispatch()
  const params = useParams()
  const [currentDialog, setCurrentDialog] = useState<number>(listDialog.EXTEND)
  const [openDialog, setOpenDialog] = useState(false)
  const { postDetail } = useAppSelector((state: RootState) => state.posts)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(openDialog && currentDialog === listDialog.REJECT ? SubmitReasonSchema : SearchPostsSchema)
  })

  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'CHI TIẾT BÀI ĐĂNG' }))
  }, [dispatch])

  useEffect(() => {
    dispatch(PostsReduxActions.getPostDetailRequest({ postObjId: params.id }))
  }, [])

  const callBackSuccess = () => {
    dispatch(PostsReduxActions.getPostDetailRequest({ postObjId: params.id }))
  }

  const handleOpenDialog = (typeDialog: number) => {
    setCurrentDialog(typeDialog)
    setOpenDialog(true)
  }

  const DesExtendComponent = () => {
    return (
      <>
        <CustomText block>
          Để gia hạn thêm 1 tháng cho bài tuyển dụng, nhà tuyển dụng này sẽ bị trừ{' '}
          <CustomText type={TEXT_TYPE.primary_16_700}>10.000đ</CustomText> vào tài khoản.
        </CustomText>
        <CustomText block customStyle={{ marginTop: '25px' }}>
          Bạn có đồng ý không?{' '}
        </CustomText>
      </>
    )
  }

  const DesRejectComponent = () => {
    return (
      <>
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={POST_FIELD_NAME.REASON}
          label={'Lý do từ chối'}
          placeholder={'Nhập lý do từ chối'}
          errorMessage={errors[POST_FIELD_NAME.REASON]?.message || ''}
        />
      </>
    )
  }

  const onSubmit: SubmitHandler<any> = (values) => {
    if (openDialog && currentDialog === listDialog.REJECT) {
      dispatch(
        PostsReduxActions.acceptOrRejectPostsRequest({
          postObjId: params.id,
          reason: values[POST_FIELD_NAME.REASON],
          isApprove: false,
          callBackSuccess
        })
      )
      setOpenDialog(false)
    } else {
      console.log('asd')
    }
  }

  const handleDialog = (status: number) => {
    switch (status) {
      case listDialog.EXTEND:
        return {
          title: 'Gia hạn',
          description: <DesExtendComponent />,
          onConfirm: () => {
            dispatch(
              PostsReduxActions.extendPostsRequest({
                postObjId: params.id,
                callBackSuccess
              })
            )
            setOpenDialog(false)
          }
        }
      case listDialog.REJECT:
        return {
          title: 'Từ chối',
          description: <DesRejectComponent />,
          onConfirm: handleSubmit(onSubmit)
        }
      case listDialog.ACCEPT:
        return {
          title: 'Phê duyệt',
          description: 'Bạn có đồng ý phê duyệt cho bài tuyển dụng này không?',
          onConfirm: () => {
            dispatch(
              PostsReduxActions.acceptOrRejectPostsRequest({
                postObjId: params.id,
                isApprove: true,
                callBackSuccess
              })
            )
            setOpenDialog(false)
          }
        }
      case listDialog.EXPIRE:
        return {
          title: 'Hết hạn bài đăng',
          description: 'Bạn có đồng ý chuyển bài đăng về trạng thái “Đã hết hạn” không?',
          onConfirm: () => {
            dispatch(
              PostsReduxActions.expiredPostsRequest({
                postObjId: params.id,
                callBackSuccess
              })
            )
            setOpenDialog(false)
          }
        }

      default:
        return {
          title: 'lỗi?',
          description: 'lỗi?',
          onConfirm: () => {
            console.log('phe duyet')
            setOpenDialog(false)
          }
        }
    }
  }

  const listBtn = (type: string | undefined) => {
    switch (type) {
      case 'ACTIVE':
        return (
          <>
            <CustomBtn
              onClick={() => handleOpenDialog(listDialog.EXPIRE)}
              width={'150px'}
              type='outlined'
              text={'Đã hết hạn'}
            />
          </>
        )
      case 'WAITING_ACCEPTED':
        return (
          <>
            <CustomBtn
              onClick={() => handleOpenDialog(listDialog.REJECT)}
              width={'150px'}
              type='outlined'
              text={'Từ chối'}
            />
            <CustomBtn onClick={() => handleOpenDialog(listDialog.ACCEPT)} width={'150px'} text={'Phê duyệt'} />
          </>
        )
      case 'INACTIVE':
        return (
          <CustomBtn
            onClick={() => handleOpenDialog(listDialog.EXTEND)}
            width={'150px'}
            type='outlined'
            text={'Gia hạn'}
          />
        )
      case 'REJECTED':
        return <></>
      default:
        break
    }
  }

  return (
    <div>
      <FlexBoxEnd style={{ justifyContent: 'flex-end', gap: 20, marginBottom: '20px' }}>
        {listBtn(postDetail?.status)}
      </FlexBoxEnd>
      <FlexBox style={{ gap: 20 }}>
        <div style={{ width: '33%' }}>
          <BasicInfo />
          <ListImages />
        </div>
        <div style={{ width: '67%' }}>
          <DetailRecruitment />
          <DetailContent />
          <RequiredInfo />
          <ExaminationInfo />
        </div>
      </FlexBox>
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={handleDialog(currentDialog).title}
        content={handleDialog(currentDialog).description}
        onConfirm={handleDialog(currentDialog).onConfirm}
      />
    </div>
  )
}

export default DetailPosts
