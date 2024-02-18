// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** React Imports
import { Grid } from '@mui/material'
import { forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Link from 'next/link'

const TableHeader = props => {
  // ** State

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

  const searchProductCategory = () => {
    dispatch(fetchEvents({...query, search: value.trim()}))
  }

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  // ** Props
  const { plan, handlePlanChange, handleFilter, value, setVisible } = props

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
            <Grid item xs={6} sm={4}>
              <Controller
                name='search'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Search for Product'
                    onChange={onChange}
                    placeholder='Search Product name, ID'
                    error={Boolean(errors.firstName)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.firstName && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2} sm={2}>
              <Controller
                name='categoryName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue='ALL'
                    label='Search by Category'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    aria-describedby='validation-basic-select'
                    {...(errors.select && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='ALL'>All</MenuItem>
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={2} sm={2}>
              <Controller
                name='dob'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    onChange={e => onChange(e)}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomInput
                        value={value}
                        onChange={onChange}
                        label='Date of Birth'
                        error={Boolean(errors.dob)}
                        aria-describedby='validation-basic-dob'
                        {...(errors.dob && { helperText: 'This field is required' })}
                      />
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={2} sm={2}>
              <Controller
                name='status'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue='ALL'
                    label='Status'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    aria-describedby='validation-basic-select'
                    {...(errors.select && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='ALL'>All</MenuItem>
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={2} sm={2}>
              <div style={{ height: '100%', display: 'flex', alignItems: 'self-end' }}>
                <Button
                  sx={{ mr: 2 }}
                  variant='contained'
                  onClick={handleSubmit(onsubmit)}
                >
                  Search
                </Button>
                <Box
                  component={Link}
                  href='/apps/product/create'
                >
                  <Button variant='contained' onClick={() => setVisible(true)}>
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
