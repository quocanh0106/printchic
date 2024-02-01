import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { HRReduxActions } from '~/ReduxSaga/HR/HRRedux'
import InfoEmployer from './components/InfoEmployer'
import TabHistory from './components/TabHistory'
import TabInfo from './components/TabInfo'
import TabListCandidate from './components/TabListCandidate'
import TabListPost from './components/TabListPost'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function DetailEmployer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  // add breadcrumbs
  useEffect(() => {
    dispatch(
      CommonReduxActions.setDataBreadcrumbs({
        text: 'CHI TIẾT NHÀ TUYỂN DỤNG',
        isShowBackIcon: true,
        backFunc: () => navigate('/employer')
      })
    )
  }, [])

  useEffect(() => {
    dispatch(HRReduxActions.DetailHRRequest({ id }))
  }, [])

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  return (
    <>
      <InfoEmployer setValue={setValue} value={value} />
      <SwipeableViews
        style={{ padding: '20px 0 0 0' }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TabInfo />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TabListPost id={id} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TabListCandidate />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <TabHistory id={id} />
        </TabPanel>
      </SwipeableViews>
    </>
  )
}

export default DetailEmployer
