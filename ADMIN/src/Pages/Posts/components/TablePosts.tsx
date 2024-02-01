import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomTable from '~/Components/CustomTable/CustomTable'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { FlexBoxEnd } from '~/Components/StyleComponents'
import {
  dataKeys,
  dataKeysReject,
  listDialog,
  listStatusPost,
  styleHeader,
  tableHeader,
  tableHeaderReject
} from '../config'
import { POST_FIELD_NAME } from '../fieldName'
import { SearchPostsSchema, SubmitReasonSchema } from '../schema'
import ActionColumn from './ActionColumn'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { PostsReduxActions } from '~/ReduxSaga/Posts/PostsRedux'
import Utilities from '~/Utils/Util'
import { RootState } from '~/Config/ReduxConfig/Store'
import { formatDate } from '~/Utils/DateTimeUtil'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'

interface TablePostsProps {
  status: any
}

function TablePosts({ status }: TablePostsProps) {
  console.log('status', status)
  const dispatch = useAppDispatch()
  const { listPosts } = useAppSelector((state: RootState) => state.posts)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useState({})
  const [currentDialog, setCurrentDialog] = useState<number>(listDialog.EXTEND)
  const [currentSelectId, setCurrentSelectId] = useState<string>('')
  const [openDialog, setOpenDialog] = useState(false)
  const [updateDateTable, setUpdateDataTable] = useState<boolean>(false)

  useEffect(() => {
    dispatch(
      PostsReduxActions.getListPostsRequest({
        status: Utilities.getKeyByValue(listStatusPost, status),
        page: currentPage,
        searchParams
      })
    )
  }, [currentPage, searchParams, updateDateTable])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit',
    resolver: yupResolver(openDialog && currentDialog === listDialog.REJECT ? SubmitReasonSchema : SearchPostsSchema)
  })
  const onSubmit: SubmitHandler<any> = (values) => {
    if (openDialog && currentDialog === listDialog.REJECT) {
      dispatch(
        PostsReduxActions.acceptOrRejectPostsRequest({
          postObjId: currentSelectId,
          reason: values[POST_FIELD_NAME.REASON],
          isApprove: false,
          callBackSuccess
        })
      )
      setOpenDialog(false)
    } else {
      setSearchParams({
        status: Utilities.getKeyByValue(listStatusPost, status),
        search: values.search,
        createdAt: formatDate(values?.createdAt, 'YYYY-MM-DD')
      })
    }
  }

  const handleOpenDialog = (typeDialog: number, id: string) => {
    setCurrentDialog(typeDialog)
    setCurrentSelectId(id)
    setOpenDialog(true)
  }

  const callBackSuccess = () => {
    setUpdateDataTable(!updateDateTable)
  }

  const dataTable = useMemo(() => {
    const tempListPosts = new Array(listPosts?.length).fill({})
    listPosts?.items?.forEach((ele: any, index: number) => {
      tempListPosts[index] = {
        id: (
          <div onClick={() => navigate(`/posts/detail/${ele._id}`)} key={ele._id}>
            <CustomText type={TEXT_TYPE.primary_16_400} customStyle={{ textDecoration: 'underline' }}>
              {ele._id}
            </CustomText>
          </div>
        ),
        title: ele.title,
        employerName: ele.createdBy.fullName,
        phoneNumber: ele.createdBy.phoneNumber,
        reason: ele.reason,
        candidateNumber: ele.candidateNumber ? ele.candidateNumber : 0,
        viewNumber: ele.viewNumber ? ele.viewNumber : 0,
        createdAt: ele.createdAt,
        updatedAt: ele.updatedAt,
        action: <ActionColumn id={ele._id} status={status} handleOpenDialog={handleOpenDialog} />
      }
    })
    return tempListPosts
  }, [listPosts])

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

  const handleDialog = (status: number) => {
    switch (status) {
      case listDialog.EXTEND:
        return {
          title: 'Gia hạn',
          description: <DesExtendComponent />,
          onConfirm: () => {
            console.log('gia han')
            setUpdateDataTable(!updateDateTable)
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
                postObjId: currentSelectId,
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
            console.log('het han dang bai')
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

  return (
    <div>
      <FlexBoxEnd style={{ gap: 20, marginBottom: '30px' }}>
        <FormInput
          control={control}
          type={typeInputComponent.InputText}
          name={POST_FIELD_NAME.SEARCH}
          label={'Tìm kiếm'}
          placeholder={'Tìm kiếm theo tên, ID, số điện thoại'}
          errorMessage={errors[POST_FIELD_NAME.SEARCH]?.message || ''}
          sx={{
            width: '450px'
          }}
        />
        <FormInput
          control={control}
          type={typeInputComponent.InputDate}
          name={POST_FIELD_NAME.CREATED_AT}
          label={'Ngày tạo'}
          placeholder={'Ngày tạo'}
          errorMessage={errors[POST_FIELD_NAME.CREATED_AT]?.message || ''}
          sx={{
            width: '150px'
          }}
        />
        <CustomBtn width={'200px'} onClick={handleSubmit(onSubmit)} text={'Tìm kiếm'} />
      </FlexBoxEnd>
      <CustomTable
        setCurrentPage={setCurrentPage}
        data={dataTable}
        headerCells={status === 3 ? tableHeaderReject : tableHeader}
        styleHeader={styleHeader}
        dataKeys={status === 3 ? dataKeysReject : dataKeys}
        pageCount={listPosts?.paginator?.pageCount}
      />
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

export default TablePosts
