// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** React Imports
import { Grid } from '@mui/material'
import { forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { fetchProduct } from 'src/store/apps/product'

const TableHeader = props => {
  // ** State
  const [openModalSettingProduct, setOpenModalSettingProduct] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    search: '',
    categoryName: '',
    date: '',
    status: '',
  })

  const dispatch = useDispatch()
  
  const searchProductCategory = () => {
    dispatch(fetchProduct({ ...query, search: value.trim() }))
  }

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  // ** Props
  const { plan, handlePlanChange, handleFilter, value, setVisible, query, setOpenEditSettingProDialog } = props

  const onsubmit = (values) => {
    console.log('searchching', values)
  }

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
      }}
    >
      <DatePickerWrapper>
        <form>
          <Grid container spacing={5}>
            <Grid item xs={9} sm={9}>
              <CustomTextField
                value={value}
                fullWidth
                placeholder='Search for category'
                onChange={e => handleFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <div style={{ height: '100%', display: 'flex', alignItems: 'self-end' }}>
                <Button
                  sx={{ mr: 2 }}
                  variant='contained'
                  onClick={() => searchProductCategory()}
                >
                  Search
                </Button>
                <Button
                  sx={{ mr: 2 }}
                  variant='contained'
                  onClick={() => setOpenEditSettingProDialog(true)}
                >
                  Setting
                </Button>
                <Box
                  component={Link}
                  href='/apps/product/create'
                >
                  <Button variant='contained'>
                    Create
                  </Button>
                </Box>
              </div>
            </Grid>
          </Grid>
        </form>
      </DatePickerWrapper>
    </Box>
  )
}

export default TableHeader
