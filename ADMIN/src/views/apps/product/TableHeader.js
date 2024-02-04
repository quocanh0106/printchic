// ** MUI Imports
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import DatePicker from 'react-datepicker'

import { styled } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** React Imports
import { useEffect, useCallback, useRef,forwardRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

// ** Styled Component
const CustomInput = forwardRef((props, ref) => {
    return <CustomTextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})
const TableHeader = (props, {popperPlacement}) => {
  // ** State
  const [createDialog, setOpenCreateDialog] = useState(false)
  const [editDialog, setOpenEditDialog] = useState(false)
  const [date, setDate] = useState(new Date())

  // ** Props
  const { plan, handlePlanChange, handleFilter, value } = props



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
      <Box className='w-100' sx={{ display: 'flex',flexDirection:'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'end' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search for product'
          onChange={e => handleFilter(e.target.value)}
        />
        <CustomTextField
          select
          value={plan}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search by Category'
          defaultValue='Select Plan'
          SelectProps={{ displayEmpty: true, value: plan, onChange: e => handlePlanChange(e) }}
        >
          <MenuItem value=''>Status</MenuItem>
          <MenuItem value='basic'>Basic</MenuItem>
          <MenuItem value='company'>Company</MenuItem>
          <MenuItem value='enterprise'>Enterprise</MenuItem>
          <MenuItem value='team'>Team</MenuItem>
        </CustomTextField>
        <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date => setDate(date)}
              />
        <CustomTextField
          select
          value={plan}
          sx={{ mr: 4, mb: 2 }}
          defaultValue='Status'
          SelectProps={{ displayEmpty: true, value: plan, onChange: e => handlePlanChange(e) }}
        >
          <MenuItem value=''>Status</MenuItem>
          <MenuItem value='basic'>Basic</MenuItem>
          <MenuItem value='company'>Company</MenuItem>
          <MenuItem value='enterprise'>Enterprise</MenuItem>
          <MenuItem value='team'>Team</MenuItem>
        </CustomTextField>
        <Button
          sx={{ color: 'white', backgroundColor: '#7367F0', mb: 2, mr: 2 }}
          onClick={() => searchProductCategory()}
        >
          Search
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
