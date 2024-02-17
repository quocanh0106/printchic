// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { fetchEvents } from 'src/store/apps/categoryProduct'

// ** React Imports

const TableHeader = props => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** Props
  const { plan, handlePlanChange, handleFilter, value, setVisible, query } = props

  const searchProductCategory = () => {
    dispatch(fetchEvents({...query, search: value.trim()}))
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
        <Button variant='contained' onClick={() => setVisible(true)}>
          Create
        </Button>
      </div>
    </Box>
  )
}

export default TableHeader
