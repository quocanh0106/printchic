import { styled } from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBox, FlexBoxAlignCenter, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { Colors, Images } from '~/Themes'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { convertGenderToText } from '~/Utils'
import CustomDialog from '~/Components/CustomDialog/CustomDialog'
import { CandidateReduxActions } from '~/ReduxSaga/Candidate/CandidateRedux'
import { useAppDispatch } from '~/Hooks/useAppSelector'

function InfoCandidate({ setValue, value, detailCandidate }: any) {
  const dispatch = useAppDispatch()
  const [openDialogBlockUser, setOpenDialogBlockUser] = React.useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('event', event)
    setValue(newValue)
  }

  const handleCloseDialogBlockUser = () => {
    setOpenDialogBlockUser(false)
  }

  const handleConfirmBlock = () => {
    dispatch(
      CandidateReduxActions.BlockUserCandidateRequest({
        userObjId: detailCandidate._id,
        status: detailCandidate.status
      })
    )
    handleCloseDialogBlockUser()
  }

  return (
    <div>
      <InfoCandidateContainer>
        {/* info and button function */}
        <FlexBoxSpaceBetween style={{ alignItems: 'flex-start' }}>
          {/* Information */}
          <FlexBox>
            <img width={'180px'} src={Images.avatar} alt='#' />
            <div style={{ marginLeft: 15 }}>
              <div style={{ marginBottom: '35px' }}>
                <CustomText type={TEXT_TYPE.primary_24_700} customStyle={{ color: Colors.white, marginRight: 15 }}>
                  {detailCandidate.fullName || 'api null'}
                </CustomText>
                <img style={{ marginBottom: '-3px' }} width={'111px'} src={Images.activeText} alt='#' />
              </div>
              <FlexBoxAlignCenter>
                <div>
                  <FlexBoxAlignCenter style={{ marginBottom: '5px' }}>
                    <CustomText
                      type={TEXT_TYPE.secondary_20_700}
                      customStyle={{ color: Colors.white, marginLeft: 5, width: '120px' }}
                    >
                      Giới tính
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
                      {convertGenderToText(detailCandidate.gender)}
                    </CustomText>
                  </FlexBoxAlignCenter>
                  <FlexBoxAlignCenter style={{ marginBottom: '5px' }}>
                    <CustomText
                      type={TEXT_TYPE.secondary_20_700}
                      customStyle={{ color: Colors.white, marginLeft: 5, width: '120px' }}
                    >
                      Ngày sinh
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
                      {detailCandidate.dob || ''}
                    </CustomText>
                  </FlexBoxAlignCenter>
                  <FlexBoxAlignCenter style={{ marginBottom: '5px' }}>
                    <CustomText
                      type={TEXT_TYPE.secondary_20_700}
                      customStyle={{ color: Colors.white, marginLeft: 5, width: '120px' }}
                    >
                      Địa chỉ
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
                      {detailCandidate?.countryObjId?.countryName || 'api null'}
                    </CustomText>
                  </FlexBoxAlignCenter>
                </div>
                <div style={{ marginLeft: '15vw' }}>
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
                      {detailCandidate.phoneNumber || 'api null'}
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
                      {detailCandidate.fb || ''}
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
                      {detailCandidate.zalo || ''}
                    </CustomText>
                  </FlexBoxAlignCenter>
                </div>
              </FlexBoxAlignCenter>
            </div>
          </FlexBox>
          {/* Button function */}
          <FlexBox>
            <BtnFunction onClick={() => setOpenDialogBlockUser(true)}>
              <ImgIcon
                src={detailCandidate.status === 'ACTIVE' ? Images.blockUserIcon : Images.unlockUserIcon}
                alt='#'
              />
              {detailCandidate.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa'}
            </BtnFunction>
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
              <Tab label='CV' />
            </Tabs>
          </AppBar>
        </Box>
      </InfoCandidateContainer>
      <CustomDialog
        open={openDialogBlockUser}
        onClose={handleCloseDialogBlockUser}
        onConfirm={handleConfirmBlock}
        title={status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
        content={
          status === 'ACTIVE'
            ? 'Bạn có chắc chắn muốn khóa tài khoản này không?'
            : 'Bạn có chắc chắn muốn mở khóa tài khoản này không?'
        }
      />
    </div>
  )
}

export default InfoCandidate

const InfoCandidateContainer = styled.div`
  background: #092c4c;
  border-radius: 8px;
  padding: 20px;
`

const BtnFunction = styled(FlexBox)`
  background: white;
  margin: 0 10px;
  padding: 10px 20px;
  border-radius: 8px;
  align-items: center;
  img {
    margin-right: 10px;
  }
`

const ImgIcon = styled.img`
  width: 16px;
  margin: 0 10px -2px 0;
`
