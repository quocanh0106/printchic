// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** React Imports
import { Fade } from '@mui/material'
import { forwardRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCategoryBlog } from 'src/store/apps/categoryBlog'

const TableHeader = props => {
  // ** State

  const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
  })

  // ** Props
  const { plan, handlePlanChange, handleFilter, value, setVisible, query } = props
  const dispatch = useDispatch()

  const searchProductCategory = () => {
    dispatch(fetchCategoryBlog({ ...query, search: value.trim() }))
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
