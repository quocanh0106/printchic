import { useEffect } from 'react'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxAlignCenter } from '~/Components/StyleComponents'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { DashboardReduxActions } from '~/ReduxSaga/Dashboard/DashboardRedux'
import { Images } from '~/Themes'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import RevenueCard from './components/RevenueCard'
import StaticCard from './components/StaticCard'

function Dashboard() {
  const dispatch = useAppDispatch()
  const { userData, revenueData } = useAppSelector((state: RootState) => state.dashboard)

  // add breadcrumbs
  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'TRANG CHỦ' }))
  }, [])

  // call api
  useEffect(() => {
    dispatch(DashboardReduxActions.userDataRequest())
    dispatch(DashboardReduxActions.revenueDataRequest())
  }, [])

  const checkPercentAndTrend = (preMonth: number, inMonth: number) => {
    if (preMonth === 0) {
      preMonth = 1
    }
    if (inMonth === 0) {
      preMonth = 1
    }
    if (inMonth >= preMonth) {
      return {
        trend: false,
        percent: Number((((inMonth - preMonth) / preMonth) * 100).toFixed(2))
      }
    } else {
      return {
        trend: true,
        percent: Number((((inMonth - preMonth) / preMonth) * 100).toFixed(2))
      }
    }
  }

  return (
    <div>
      <div>
        <CustomText type={TEXT_TYPE.primary_20_700}>Số liệu tổng quan</CustomText>
        <FlexBoxAlignCenter style={{ gap: 30, marginTop: '15px' }}>
          <StaticCard number={userData?.totalRecruiters} name={'Nhà tuyển dụng'} imgIcon={Images.ntdIcon} />
          <StaticCard number={userData?.totalCandidates} name={'Ứng viên'} imgIcon={Images.uvIcon} />
        </FlexBoxAlignCenter>
      </div>
      <div style={{ marginTop: '30px' }}>
        <CustomText type={TEXT_TYPE.primary_20_700}>Số liệu tháng này</CustomText>
        <FlexBoxAlignCenter style={{ gap: 30, marginTop: '15px' }}>
          <StaticCard
            number={userData?.recruitersRegisterInMonth}
            name={'Nhà tuyển dụng đăng kí'}
            imgIcon={Images.ntdRegisterIcon}
            percent={
              checkPercentAndTrend(userData?.recruitersRegisterPrevMonth, userData?.recruitersRegisterInMonth).percent
            }
            isDown={
              checkPercentAndTrend(userData?.recruitersRegisterPrevMonth, userData?.recruitersRegisterInMonth).trend
            }
          />
          <StaticCard
            number={userData?.candidatesRegisterInMonth}
            name={'Ứng viên đăng kí'}
            imgIcon={Images.uvRegisterIcon}
            percent={
              checkPercentAndTrend(userData?.candidatesRegisterPrevMonth, userData?.candidatesRegisterInMonth).percent
            }
            isDown={
              checkPercentAndTrend(userData?.candidatesRegisterPrevMonth, userData?.candidatesRegisterInMonth).trend
            }
          />
          <StaticCard
            number={userData?.totalPostsInMonth}
            name={'Số bài đăng'}
            imgIcon={Images.postIcon}
            percent={checkPercentAndTrend(userData?.totalPostsPrevMonth, userData?.totalPostsInMonth).percent}
            isDown={checkPercentAndTrend(userData?.totalPostsPrevMonth, userData?.totalPostsInMonth).trend}
          />
        </FlexBoxAlignCenter>
      </div>
      <div style={{ marginTop: '30px' }}>
        <CustomText type={TEXT_TYPE.primary_20_700}>Doanh thu tháng này</CustomText>
        <FlexBoxAlignCenter style={{ gap: 30, marginTop: '15px' }}>
          <div style={{ width: 'calc(100% - 330px)' }}>
            <RevenueCard
              number={revenueData?.totalRevenueInMonth}
              name={'Tổng doanh thu'}
              imgChartIcon={Images.chartOrangeIcon}
              percent={
                checkPercentAndTrend(revenueData?.totalRevenuePrevMonth, revenueData?.totalRevenueInMonth).percent
              }
              isDown={checkPercentAndTrend(revenueData?.totalRevenuePrevMonth, revenueData?.totalRevenueInMonth).trend}
            />
            <FlexBoxAlignCenter style={{ marginTop: 15, gap: 20 }}>
              <RevenueCard
                number={revenueData?.chargingHistoriesInMonth}
                name={'NTD nạp tiền'}
                percent={
                  checkPercentAndTrend(revenueData?.chargingHistoriesPrevMonth, revenueData?.chargingHistoriesInMonth)
                    .percent
                }
                isDown={
                  checkPercentAndTrend(revenueData?.chargingHistoriesPrevMonth, revenueData?.chargingHistoriesInMonth)
                    .trend
                }
              />
              <RevenueCard
                number={revenueData?.chargingAdvertisementsInMonth}
                name={'Quảng cáo'}
                percent={
                  checkPercentAndTrend(
                    revenueData?.chargingAdvertisementsPrevMonth,
                    revenueData?.chargingAdvertisementsInMonth
                  ).percent
                }
                isDown={
                  checkPercentAndTrend(
                    revenueData?.chargingAdvertisementsPrevMonth,
                    revenueData?.chargingAdvertisementsInMonth
                  ).trend
                }
              />
            </FlexBoxAlignCenter>
          </div>
          <div>
            <PieChart
              id={1}
              ntd={revenueData?.chargingHistoriesInMonth}
              adv={revenueData?.chargingAdvertisementsInMonth}
            />
          </div>
        </FlexBoxAlignCenter>
      </div>
      <div style={{ marginTop: '30px' }}>
        <CustomText type={TEXT_TYPE.primary_20_700}>Doanh thu tháng trước</CustomText>
        <FlexBoxAlignCenter style={{ gap: 30, marginTop: '15px' }}>
          <div style={{ width: 'calc(100% - 330px)' }}>
            <RevenueCard
              number={revenueData?.totalRevenuePrevMonth}
              name={'Tổng doanh thu'}
              imgChartIcon={Images.chartBlueIcon}
            />
            <FlexBoxAlignCenter style={{ marginTop: 15, gap: 20 }}>
              <RevenueCard number={revenueData?.chargingHistoriesPrevMonth} name={'NTD nạp tiền'} />
              <RevenueCard number={revenueData?.chargingAdvertisementsPrevMonth} name={'Quảng cáo'} />
            </FlexBoxAlignCenter>
          </div>
          <div>
            <PieChart
              id={2}
              ntd={revenueData?.chargingHistoriesPrevMonth}
              adv={revenueData?.chargingAdvertisementsPrevMonth}
            />
          </div>
        </FlexBoxAlignCenter>
      </div>
      <div style={{ marginTop: '30px' }}>
        <BarChart />
      </div>
    </div>
  )
}

export default Dashboard
