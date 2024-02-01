import { AppBar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { CommonReduxActions } from '~/ReduxSaga/Common/CommonRedux'
import { Colors } from '~/Themes'
import TablePosts from './components/TablePosts'
import { listStatusPost } from './config'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function Posts() {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  useEffect(() => {
    dispatch(CommonReduxActions.setDataBreadcrumbs({ text: 'QUẢN LÝ BÀI ĐĂNG' }))
  }, [dispatch])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('event', event)
    setValue(newValue)
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

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <div>
      <Box
        sx={{
          '& .MuiButtonBase-root': {
            background: Colors.white,
            opacity: 1
          },
          '& .MuiPaper-root': {
            boxShadow: 'unset'
          },
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
                background: 'white',
                height: 'unset'
              },
              '& .MuiButtonBase-root': {
                textTransform: 'none',
                color: '#BDBDBD',
                fontSize: '16px',
                borderBottom: `5px solid #BDBDBD`
              },
              '& .MuiTab-root.Mui-selected': {
                color: Colors.primary,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '16px',
                borderBottom: `5px solid ${Colors.primary}`
              },
              'button:focus': {
                outline: 'unset'
              }
            }}
          >
            <Tab label='Chờ phê duyệt' />
            <Tab label='Đang hoạt động' />
            <Tab label='Đã hết hạn' />
            <Tab label='Từ chối' />
          </Tabs>
        </AppBar>
      </Box>
      <SwipeableViews
        style={{ padding: '20px 0 0 0' }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TablePosts status={listStatusPost.WAITING_ACCEPTED} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TablePosts status={listStatusPost.ACTIVE} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <TablePosts status={listStatusPost.INACTIVE} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <TablePosts status={listStatusPost.REJECTED} />
        </TabPanel>
      </SwipeableViews>
    </div>
  )
}

export default Posts
