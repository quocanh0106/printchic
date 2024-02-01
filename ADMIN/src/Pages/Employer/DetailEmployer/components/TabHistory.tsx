import { Divider, Pagination } from '@mui/material'
import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { FlexBox, FlexBoxAlignCenter, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { HRReduxActions } from '~/ReduxSaga/HR/HRRedux'
import { Colors } from '~/Themes'
import { statusHistory } from '../config'
import { findLabelByValueInOptions } from '~/Utils'
import Utilities from '~/Utils/Util'
import { formatDate } from '~/Utils/DateTimeUtil'

function ListByDay({ dataItem }: any) {
  return (
    <div>
      <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ color: Colors.primary }}>
        {dataItem?.dateKeeping}
      </CustomText>
      <Divider />
      {dataItem?.documents.map((ele: any) => (
        <FlexBoxSpaceBetween style={{ margin: '30px 0' }}>
          <FlexBox style={{ gap: 30 }}>
            <CustomText type={TEXT_TYPE.primary_16_400} customStyle={{ color: Colors.darkGrey }}>
              {ele?.createdAt.split(' ')[1]}
            </CustomText>
            <p>{findLabelByValueInOptions(statusHistory, ele.type, 'value', 'label')}</p>
          </FlexBox>
          <p>{Utilities.numberWithCommas(ele?.value.price)} VNĐ</p>
        </FlexBoxSpaceBetween>
      ))}
    </div>
  )
}

function TabHistory({ id }: any) {
  const dispatch = useAppDispatch()
  const { listHistory } = useAppSelector((state: RootState) => state.hr)
  const [queryParams, setQueryParams] = useState<any>({})
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(HRReduxActions.ListHistoryHRRequest({ id, page: currentPage, queryParams }))
  }, [currentPage, queryParams])

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('event', event)
    setCurrentPage(newPage)
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<{ search: string; date: any }> = (values) => {
    console.log('values', values)
    setQueryParams({ createdAt: formatDate(values?.date, 'YYYY-MM-DD') })
  }

  return (
    <div>
      <div>
        <CustomText block type={TEXT_TYPE.primary_16_700} customStyle={{ margin: '5px 0 15px 0' }}>
          Lọc theo ngày
        </CustomText>
        <FlexBoxAlignCenter style={{ gap: 20, marginBottom: '40px' }}>
          <FormInput
            control={control}
            type={typeInputComponent.InputDate}
            name={'date'}
            label={'Ngày'}
            errorMessage={errors['date']?.message || ''}
            sx={{ marginBottom: '50px' }}
            width={'200px'}
          />
          <CustomBtn onClick={handleSubmit(onSubmit)} width={'170px'} text='Tìm kiếm' />
        </FlexBoxAlignCenter>
      </div>
      {listHistory?.items?.length > 0 ? (
        <>
          {listHistory?.items?.map((ele: any) => <ListByDay dataItem={ele} />)}
          <PaginationContainer>
            <Pagination
              sx={{
                '& .MuiPaginationItem-previousNext': {
                  color: Colors.primary
                },
                '& .MuiPaginationItem-root': {
                  color: Colors.primary
                },
                '& .Mui-selected': {
                  color: `${Colors.white} !important`,
                  background: `${Colors.primary} !important`,
                  '&:hover': {
                    background: `${Colors.primary} !important`
                  }
                }
              }}
              count={listHistory?.paginator?.pageCount}
              variant='outlined'
              shape='rounded'
              onChange={handleChangePage}
            />
          </PaginationContainer>
        </>
      ) : (
        <CustomText type={TEXT_TYPE.primary_20_400}>Không có bản ghi nào</CustomText>
      )}
    </div>
  )
}

export default TabHistory

const PaginationContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
`
