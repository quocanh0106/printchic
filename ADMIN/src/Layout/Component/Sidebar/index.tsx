import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxColumnCenter, FlexBoxSpaceBetween } from '~/Components/StyleComponents'
import { Colors, Images } from '~/Themes'
// import { handleLogout } from '~/api/interceptors'
import { IconLogoutContainer, Item, ItemSetting, ListItem } from './style'
import { handleLogout } from '~/api/interceptors'
import { AuthReduxActions } from '~/ReduxSaga/Auth/AuthRedux'
import { useAppDispatch } from '~/Hooks/useAppSelector'

function Sidebar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState<number>()

  useEffect(() => {
    const fullUrl = window.location.href
    const pathname = extractTextFromUrl(fullUrl)
    switch (pathname) {
      case 'employer':
        setIsActive(2)
        break
      case 'candidate':
        setIsActive(3)
        break
      case 'news':
        setIsActive(4)
        break
      case 'setting-price':
        setIsActive(5)
        break
      case 'setting-adv':
        setIsActive(6)
        break
      case 'setting-cv':
        setIsActive(7)
        break
      case 'setting-password':
        setIsActive(8)
        break
      case 'posts':
        setIsActive(9)
        break
      case 'setting-program':
        setIsActive(10)
        break

      default:
        setIsActive(1)
        break
    }
  }, [])

  const extractTextFromUrl = (url: string) => {
    // Split the URL by '/' and get the last segment
    const segments = url.split('/')
    return segments[segments.length - 1]
  }

  // const navigate = useNavigate()
  const handleLogoutSideBar = async () => {
    await handleLogout()
    dispatch(AuthReduxActions.loginFailed({}))
    navigate('/login')
  }
  const handleActiveSidebar = (value: number) => {
    setIsActive(value)
  }

  return (
    <>
      <FlexBoxColumnCenter style={{ marginTop: 40 }}>
        <img width={'130px'} src={Images.logo} alt='logo' />
      </FlexBoxColumnCenter>
      <ListItem>
        <Link to='/'>
          <Item isActive={isActive === 1} onClick={() => handleActiveSidebar(1)}>
            <FlexBoxSpaceBetween>
              {/* {isActive === 1 ? <DashboardIconActive /> : <DashboardIcon />} */}
              <CustomText
                type={TEXT_TYPE.primary_16_700}
                customStyle={{ color: isActive === 1 ? Colors.white : Colors.primary }}
              >
                Trang chủ
              </CustomText>
            </FlexBoxSpaceBetween>
          </Item>
        </Link>

        <Link to={'/employer'}>
          <Item isActive={isActive === 2} onClick={() => handleActiveSidebar(2)}>
            <FlexBoxSpaceBetween>
              {/* {isActive === 2 ? <MenuIconActive /> : <MenuIcon />} */}
              <CustomText
                type={TEXT_TYPE.primary_16_700}
                customStyle={{ color: isActive === 2 ? Colors.white : Colors.primary }}
              >
                Nhà tuyển dụng
              </CustomText>
            </FlexBoxSpaceBetween>
          </Item>
        </Link>

        <Link to={'/candidate'}>
          <Item isActive={isActive === 3} onClick={() => handleActiveSidebar(3)}>
            <FlexBoxSpaceBetween>
              {/* {isActive === 3 ? <OrderIconActive /> : <OrderIcon />} */}
              <CustomText
                type={TEXT_TYPE.primary_16_700}
                customStyle={{ color: isActive === 3 ? Colors.white : Colors.primary }}
              >
                Ứng viên
              </CustomText>
            </FlexBoxSpaceBetween>
          </Item>
        </Link>

        <Link to={'/posts'}>
          <Item isActive={isActive === 9} onClick={() => handleActiveSidebar(9)}>
            <FlexBoxSpaceBetween>
              {/* {isActive === 9 ? <OrderIconActive /> : <OrderIcon />} */}
              <CustomText
                type={TEXT_TYPE.primary_16_700}
                customStyle={{ color: isActive === 9 ? Colors.white : Colors.primary }}
              >
                Bài đăng
              </CustomText>
            </FlexBoxSpaceBetween>
          </Item>
        </Link>

        <Link to={'/news'}>
          <Item isActive={isActive === 4} onClick={() => handleActiveSidebar(4)}>
            <FlexBoxSpaceBetween>
              {/* {isActive === 4 ? <StaffIconActive /> : <StaffIcon />} */}
              <CustomText
                type={TEXT_TYPE.primary_16_700}
                customStyle={{ color: isActive === 4 ? Colors.white : Colors.primary }}
              >
                Tin tức
              </CustomText>
            </FlexBoxSpaceBetween>
          </Item>
        </Link>

        <Link to={'/setting'}>
          <Item isActive={isActive === -1} onClick={() => handleActiveSidebar(5)}>
            <FlexBoxSpaceBetween>
              {/* {isActive === 5 ? <SettingIconActive /> : <SettingIcon />} */}
              <CustomText type={TEXT_TYPE.primary_16_700}>Cài đặt</CustomText>
            </FlexBoxSpaceBetween>
          </Item>
        </Link>
        <Link to={'/setting-price'}>
          <ItemSetting isActive={isActive === 5} onClick={() => handleActiveSidebar(5)}>
            <FlexBoxSpaceBetween style={{ marginLeft: '17px' }}>
              <CustomText type={isActive === 5 ? TEXT_TYPE.white_16_600 : TEXT_TYPE.primary_16_400}>
                <img
                  width='5px'
                  src={isActive === 5 ? Images.dotWhiteIcon : Images.dotIcon}
                  style={{ margin: '0 2px 3px 0' }}
                  alt='dot'
                />{' '}
                Giá Tiền
              </CustomText>
            </FlexBoxSpaceBetween>
          </ItemSetting>
        </Link>
        <Link to={'/setting-adv'}>
          <ItemSetting isActive={isActive === 6} onClick={() => handleActiveSidebar(6)}>
            <FlexBoxSpaceBetween style={{ marginLeft: '17px' }}>
              <CustomText type={isActive === 6 ? TEXT_TYPE.white_16_600 : TEXT_TYPE.primary_16_400}>
                <img
                  width='5px'
                  src={isActive === 6 ? Images.dotWhiteIcon : Images.dotIcon}
                  style={{ margin: '0 4px 3px 0' }}
                  alt='dot'
                />
                Quảng cáo hình ảnh
              </CustomText>
            </FlexBoxSpaceBetween>
          </ItemSetting>
        </Link>
        <Link to={'/setting-cv'}>
          <ItemSetting isActive={isActive === 7} onClick={() => handleActiveSidebar(7)}>
            <FlexBoxSpaceBetween style={{ marginLeft: '17px' }}>
              <CustomText type={isActive === 7 ? TEXT_TYPE.white_16_600 : TEXT_TYPE.primary_16_400}>
                <img
                  width='5px'
                  src={isActive === 7 ? Images.dotWhiteIcon : Images.dotIcon}
                  style={{ margin: '0 4px 3px 0' }}
                  alt='dot'
                />
                Template CV mẫu
              </CustomText>
            </FlexBoxSpaceBetween>
          </ItemSetting>
        </Link>
        <Link to={'/setting-password'}>
          <ItemSetting isActive={isActive === 8} onClick={() => handleActiveSidebar(8)}>
            <FlexBoxSpaceBetween style={{ marginLeft: '17px' }}>
              <CustomText type={isActive === 8 ? TEXT_TYPE.white_16_600 : TEXT_TYPE.primary_16_400}>
                <img
                  width='5px'
                  src={isActive === 8 ? Images.dotWhiteIcon : Images.dotIcon}
                  style={{ margin: '0 4px 3px 0' }}
                  alt='dot'
                />
                Đổi mật khẩu
              </CustomText>
            </FlexBoxSpaceBetween>
          </ItemSetting>
        </Link>
        <Link to={'/setting-program'}>
          <ItemSetting isActive={isActive === 10} onClick={() => handleActiveSidebar(10)}>
            <FlexBoxSpaceBetween style={{ marginLeft: '17px' }}>
              <CustomText type={isActive === 10 ? TEXT_TYPE.white_16_600 : TEXT_TYPE.primary_16_400}>
                <img
                  width='5px'
                  src={isActive === 10 ? Images.dotWhiteIcon : Images.dotIcon}
                  style={{ margin: '0 4px 3px 0' }}
                  alt='dot'
                />
                Chương trình
              </CustomText>
            </FlexBoxSpaceBetween>
          </ItemSetting>
        </Link>
      </ListItem>
      <IconLogoutContainer onClick={handleLogoutSideBar}>
        <CustomBtn
          width={'170px'}
          startIcon={<img src={Images.logoutIcon} alt='#s' />}
          type='outlined'
          text='Đăng xuất'
        />
      </IconLogoutContainer>
    </>
  )
}

export default Sidebar
