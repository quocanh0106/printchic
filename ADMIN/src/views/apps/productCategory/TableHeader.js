// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { fetchEvents } from 'src/store/apps/categoryProduct'
import Link from 'next/link'

// ** React Imports

const TableHeader = props => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** Props
  const { plan, handlePlanChange, handleFilter, value, setVisible, query } = props

  const searchProductCategory = () => {
    dispatch(fetchEvents({ ...query, search: value.trim() }))
  }

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
      }}
    >
      <div style={{ display: 'flex', gap: 20 }}>
        <CustomTextField
          value={value}
          fullWidth
          placeholder='Search for category'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button
          variant='contained'
          onClick={() => searchProductCategory()}
        >
          Search
        </Button>
        <Box
          component={Link}
          href='/apps/category-product/create'
        >
          <Button sx={{ width: '135px' }} variant='contained'>
            Create
          </Button>
        </Box>
      </div>
    </Box>
  )
}

export default TableHeader
