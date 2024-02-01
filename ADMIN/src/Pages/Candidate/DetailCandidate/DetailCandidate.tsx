import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { useAppDispatch, useAppSelector } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import InfoCandidate from './components/InfoCandidate'
import TabInfo from './components/TabInfo'
import TabListCV from './components/TabListCV'
import { CandidateReduxActions } from '~/ReduxSaga/Candidate/CandidateRedux'
import { useParams } from 'react-router-dom'
import { RootState } from '~/Config/ReduxConfig/Store'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function DetailCandidate() {
  const { detailCandidate } = useAppSelector((state: RootState) => state.candidate)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const theme = useTheme()
  const [value, setValue] = React.useState(0)

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
  // add breadcrumbs
  useEffect(() => {
    dispatch(
      CommonReduxActions.setDataBreadcrumbs({
        text: 'CHI TIẾT ỨNG VIÊN',
        isShowBackIcon: true,
        backFunc: () => navigate('/candidate')
      })
    )
  }, [])

  useEffect(() => {
    dispatch(CandidateReduxActions.DetailCandidateRequest({ id }))
  }, [])

  return (
    <>
      <InfoCandidate detailCandidate={detailCandidate} setValue={setValue} value={value} />
      <SwipeableViews
        style={{ padding: '20px 0 0 0' }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TabInfo detailCandidate={detailCandidate} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TabListCV />
        </TabPanel>
      </SwipeableViews>
    </>
  )
}

export default DetailCandidate
