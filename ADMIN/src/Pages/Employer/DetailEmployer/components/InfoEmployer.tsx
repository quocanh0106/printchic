import { yupResolver } from '@hookform/resolvers/yup'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { FormInput } from '~/Components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent, typeTextInput } from '~/Components/FormInput/helper'
import { FlexBox, FlexBoxAlignCenter, FlexBoxEnd, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { HRReduxActions } from '~/ReduxSaga/HR/HRRedux'
import { Colors, Images } from '~/Themes'
import Utilities from '~/Utils/Util'
import { EMPLOYER_FIELD_NAME } from '../../fieldName'
import { rechargeSchema } from '../../schema'
import { useState } from 'react'

function InfoEmployer({ setValue, value }: any) {
  const dispatch = useAppDispatch()
  const { detailHR } = useAppSelector((state: RootState) => state.hr)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('event', event)
    setValue(newValue)
  }
  const [openDialog, setOpenDialog] = useState(false)
  const [openTopHrDialog, setOpenTopHrDialog] = useState(false)
  const [openDialogBlockUser, setOpenDialogBlockUser] = useState(false)

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleCloseDialogBlockUser = () => {
    setOpenDialogBlockUser(false)
  }

  const handleConfirmBlock = () => {
    dispatch(HRReduxActions.BlockUserHRRequest({ userObjId: detailHR._id, status: detailHR.status }))
    handleCloseDialogBlockUser()
  }

  const handleTopHr = () => {
    dispatch(
      HRReduxActions.TopHRRequest({ userObjId: detailHR._id, isTopHR: detailHR?.isTopHr == 'Yes' ? true : false })
    )
    setOpenTopHrDialog(false)
  }

  const CustomDialogContent = () => {
    const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm<any>({
      mode: 'onSubmit',
      resolver: yupResolver(rechargeSchema)
    })

    const onSubmit: SubmitHandler<any> = (values) => {
      dispatch(
        HRReduxActions.HRRechargeRequest({
          userObjId: detailHR._id,
          chargingMoney: values.chargingMoney,
          from: 'detail'
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
            value={detailHR.fullName}
            errorMessage={errors[EMPLOYER_FIELD_NAME.EMPLOYER]?.message || ''}
            sx={{ marginBottom: '40px' }}
          />
          <FormInput
            control={control}
            disabled
            type={typeInputComponent.InputText}
            value={detailHR.phoneNumber}
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

  return (
    <InfoEmployerContainer>
      {/* info and button function */}
      <FlexBoxSpaceBetween style={{ alignItems: 'flex-start' }}>
        {/* Information */}
        <FlexBox>
          <img width={'180px'} src={Images.avatar} alt='#' />
          <div style={{ marginLeft: 15 }}>
            <div>
              <CustomText type={TEXT_TYPE.primary_24_700} customStyle={{ color: Colors.white, marginRight: 15 }}>
                {detailHR.fullName || 'api null'}
              </CustomText>
              <img style={{ margin: '0 15px -4px 0' }} width={'27px'} src={Images.checkedIcon} alt='#' />
              <img
                style={{ marginBottom: '-3px' }}
                width={detailHR?.status === 'ACTIVE' ? '111px' : '75px'}
                src={detailHR?.status === 'ACTIVE' ? Images.activeText : Images.blockText}
                alt='#'
              />
            </div>
            <div style={{ margin: '7px 0' }}>
              <CustomText type={TEXT_TYPE.secondary_20_700}>
                Số dư: {Utilities.numberWithCommas(detailHR.availableFund || 0)} VNĐ
              </CustomText>
            </div>
            <div>
              <FlexBoxAlignCenter style={{ marginBottom: '5px' }}>
                <img src={Images.phoneIcon} alt='#' />
                <CustomText
                  type={TEXT_TYPE.secondary_20_700}
                  customStyle={{ color: Colors.white, marginLeft: 5, width: '120px' }}
                >
                  Điện thoại
                </CustomText>
                <CustomText
                  type={TEXT_TYPE.primary_18_700}
                  customStyle={{
                    color: Colors.white,
                    fontWeight: '400',
                    borderLeft: '1px solid white',
                    paddingLeft: '5px'
                  }}
                >
                  {detailHR.phoneNumber || 'api null'}
                </CustomText>
              </FlexBoxAlignCenter>
              <FlexBoxAlignCenter style={{ marginBottom: '5px' }}>
                <img src={Images.facebookIcon} alt='#' />
                <CustomText
                  type={TEXT_TYPE.secondary_20_700}
                  customStyle={{ color: Colors.white, marginLeft: 5, width: '120px' }}
                >
                  Facebook
                </CustomText>
                <CustomText
                  type={TEXT_TYPE.primary_18_700}
                  customStyle={{
                    color: Colors.white,
                    fontWeight: '400',
                    borderLeft: '1px solid white',
                    paddingLeft: '5px'
                  }}
                >
                  {detailHR.fb || 'api null'}
                </CustomText>
              </FlexBoxAlignCenter>
              <FlexBoxAlignCenter style={{ marginBottom: '5px' }}>
                <img src={Images.zaloIcon} alt='#' />
                <CustomText
                  type={TEXT_TYPE.secondary_20_700}
                  customStyle={{ color: Colors.white, marginLeft: 5, width: '120px' }}
                >
                  Zalo
                </CustomText>
                <CustomText
                  type={TEXT_TYPE.primary_18_700}
                  customStyle={{
                    color: Colors.white,
                    fontWeight: '400',
                    borderLeft: '1px solid white',
                    paddingLeft: '5px'
                  }}
                >
                  {detailHR.zalo || 'api null'}
                </CustomText>
              </FlexBoxAlignCenter>
            </div>
          </div>
        </FlexBox>
        {/* Button function */}
        <FlexBox>
          <BtnFunction onClick={() => setOpenDialogBlockUser(true)}>
            <img
              width='24px'
              src={detailHR?.status === 'ACTIVE' ? Images.blockUserIcon : Images.unlockUserIcon}
              alt='#'
            />
            <p>{detailHR?.status === 'ACTIVE' ? 'Khóa tài khoản' : 'mở khóa tài khoản'}</p>
          </BtnFunction>
          <BtnFunction onClick={() => setOpenDialog(true)}>
            <img width='24px' src={Images.depositIcon} alt='#' />
            <p>Nạp tiền</p>
          </BtnFunction>
          <BtnFunction onClick={() => setOpenTopHrDialog(true)}>
            <img width='24px' src={detailHR?.isTopHr == 'Yes' ? Images.removeTop : Images.addTop} alt='#' />
            <p>{detailHR?.isTopHr == 'Yes' ? 'Bỏ top' : 'TOP Trang chủ'}</p>
          </BtnFunction>
          <div></div>
        </FlexBox>
      </FlexBoxSpaceBetween>
      <Box
        sx={{
          '& .MuiButtonBase-root': {
            background: Colors.primary,
            opacity: 1
          },
          marginTop: '35px',
          width: '100%'
        }}
      >
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='fullWidth'
            sx={{
              '& .MuiTabs-indicator': {
                background: 'white'
              },
              '& .MuiButtonBase-root': {
                textTransform: 'capitalize',
                color: 'white',
                fontSize: '16px'
              },
              '& .MuiTab-root.Mui-selected': {
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: '16px'
              },
              'button:focus': {
                outline: 'unset'
              }
            }}
          >
            <Tab label='Thông tin chung' />
            <Tab label='Danh sách bài đăng' />
            <Tab label='Danh sách ứng viên đã mua' />
            <Tab label='Lịch sử nạp tiền' />
          </Tabs>
        </AppBar>
      </Box>
      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title='Nạp tiền'
        content={<CustomDialogContent />}
        hideSubmitBtn
        hideCancelBtn
      />
      <CustomDialog
        open={openDialogBlockUser}
        onClose={handleCloseDialogBlockUser}
        onConfirm={handleConfirmBlock}
        title={detailHR?.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
        content={
          detailHR?.status === 'ACTIVE'
            ? 'Bạn có chắc chắn muốn khóa tài khoản này không?'
            : 'Bạn có chắc chắn muốn mở khóa tài khoản này không?'
        }
      />
      <CustomDialog
        open={openTopHrDialog}
        title={detailHR?.isTopHr == 'Yes' ? 'TOP Trang chủ' : 'Bỏ TOP Trang chủ'}
        content={
          detailHR?.isTopHr == 'Yes'
            ? 'Bạn có chắc chắn muốn bỏ TOP trang chủ không?'
            : 'Bạn có chắc chắn muốn để tài khoản này ở TOP trang chủ không?'
        }
        onClose={() => setOpenTopHrDialog(false)}
        onConfirm={handleTopHr}
      />
    </InfoEmployerContainer>
  )
}

export default InfoEmployer

const InfoEmployerContainer = styled.div`
  background: #092c4c;
  border-radius: 8px;
  padding: 20px;
`

const BtnFunction = styled(FlexBox)`
  background: white;
  margin: 0 10px;
  color: ${Colors.primary};
  padding: 10px 20px;
  border-radius: 8px;
  align-items: center;
  img {
    margin-right: 10px;
  }
`
