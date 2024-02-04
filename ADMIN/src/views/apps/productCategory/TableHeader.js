// ** MUI Imports
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import MuiDialog from '@mui/material/Dialog'
import { styled, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import TextField from '@mui/material/TextField'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** React Imports
import { useEffect, useCallback, useRef, useState } from 'react'

const TableHeader = props => {
  // ** State
  const [createDialog, setOpenCreateDialog]  = useState(false)
  const [categoryName, setCategoryName] = useState('')
  // ** Hooks & Vars
  const theme = useTheme()

  // ** Props
  const { plan, handlePlanChange, handleFilter, value } = props
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'))

  const searchProductCategory = () => {
    console.log('searchching')
  }
  
  // ** Styled Dialog component
const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)'
  },
  '& .MuiDialog-paper': {
    overflow: 'hidden',
    '&:not(.MuiDialog-paperFullScreen)': {
      height: '100%',
      maxHeight: 550
    }
  }
})

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
      }}
    >
      <Box className='w-100' sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent:'end' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search for category'
          onChange={e => handleFilter(e.target.value)}
        />
        <CustomTextField
          select
          value={plan}
          sx={{ mr: 4, mb: 2 }}
          defaultValue='Select Plan'
          SelectProps={{ displayEmpty: true, value: plan, onChange: e => handlePlanChange(e) }}
        >
          <MenuItem value=''>Status</MenuItem>
          <MenuItem value='basic'>Basic</MenuItem>
          <MenuItem value='company'>Company</MenuItem>
          <MenuItem value='enterprise'>Enterprise</MenuItem>
          <MenuItem value='team'>Team</MenuItem>
        </CustomTextField>
        <Button sx={{color:'white', backgroundColor:'#7367F0',  mb: 2, mr: 2 }} onClick={() => searchProductCategory()}>
            Search
        </Button>
        <Button sx={{color:'white', backgroundColor:'#7367F0',  mb: 2 }} onClick={()=>setOpenCreateDialog(true)}>
            Create
        </Button>
      </Box>
      {createDialog && (
          <Dialog fullWidth open={createDialog} fullScreen={fullScreenDialog} onClose={() => setOpenCreateDialog(false)}>
            <Box sx={{ top: 0, width: '100%', position: 'sticky' }}>
            <TextField
                value={categoryName}      
              />
            </Box>
          </Dialog>
        )}
    </Box>
  )
}

export default TableHeader
