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
import Link from 'next/link'

const TableHeader = props => {
  // ** State

  const Transition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
  })

  // ** Props
  const { plan, handlePlanChange, handleFilter, value, setVisible, query,setOpenEditSettingProDialog } = props
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
        <Box
          component={Link}
          href='/apps/category-blog/import-excel'
        >
          <Button sx={{ width: '135px' }} variant='contained'>
            Import excel
          </Button>
        </Box>
        <Box
          component={Link}
          href='/apps/category-blog/create'
        >
          <Button sx={{ width: '135px' }} variant='contained'>
          Create
          </Button>
        </Box>
        {/* <Button variant='contained' onClick={() => setVisible(true)}>
          Create
        </Button> */}
      </div>
    </Box>
  )
}

export default TableHeader
