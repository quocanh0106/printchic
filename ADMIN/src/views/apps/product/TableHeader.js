// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** React Imports
import { Grid } from '@mui/material'
import Link from 'next/link'
import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { fetchProduct } from 'src/store/apps/product'

const TableHeader = props => {

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
            <Grid item xs={10} sm={10}>
              <CustomTextField
                value={value}
                fullWidth
                placeholder='Search for category'
                onChange={e => handleFilter(e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={2}>
              <div style={{ height: '100%', display: 'flex', alignItems: 'self-end' }}>
                <Button
                  sx={{ mr: 2 }}
                  variant='contained'
                  onClick={() => searchProductCategory()}
                >
                  Search
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
