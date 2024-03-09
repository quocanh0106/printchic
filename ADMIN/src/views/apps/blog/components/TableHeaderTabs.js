// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** React Imports
import { Grid } from '@mui/material'
import { forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { fetchTag } from 'src/store/apps/tag'

const TableHeaderTabs = props => {
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

  // ** Props
  const { plan, handlePlanChange, handleFilter, value, setVisible, query } = props
  const dispatch = useDispatch()

  const searchProductCategory = () => {
    dispatch(fetchTag({ ...query, search: value.trim() }))
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
            <Grid item xs={10} sm={10}>
            <CustomTextField
                value={value}
                fullWidth
                placeholder='Search for name'
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
                {/* <Box
                  component={Link}
                  href='/apps/blog/create'
                >
                <Button variant='contained' onClick={() => setVisible(true)}>
                  Create
                </Button>
                </Box> */}
              </div>
            </Grid>
          </Grid>

        </form>
      </DatePickerWrapper>
    </Box>
  )
}

export default TableHeaderTabs
