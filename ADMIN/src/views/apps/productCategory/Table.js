// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/productCategory/TableHeader'

// ** Components Imports
import AddDialogProduct from './AddDialogProduct'

// ** Vars
const userRoleObj = {
  editor: { icon: 'tabler:edit', color: 'info' },
  author: { icon: 'tabler:user', color: 'warning' },
  admin: { icon: 'tabler:device-laptop', color: 'error' },
  maintainer: { icon: 'tabler:chart-pie-2', color: 'success' },
  subscriber: { icon: 'tabler:circle-check', color: 'primary' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}


const columns = [
  {
    flex: 0.05,
    minWidth: 50,
    field: 'Id',
    headerName: 'No',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row.id}
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    field: 'category',
    minWidth: 170,
    headerName: 'Category',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin='light'
            sx={{ mr: 4, width: 30, height: 30 }}
            color={userRoleObj[row.category].color || 'primary'}
          >
            <Icon icon={userRoleObj[row.category].icon} />
          </CustomAvatar>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.category}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 120,
    headerName: 'description',
    field: 'Description',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.description}
        </Typography>
      )
    }
  },
  {
    flex: 0.25,
    minWidth: 190,
    field: 'parentCategory',
    headerName: 'Parent Category',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.parentCategory}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <OptionsMenu
          menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
          iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
          options={[
            {
              text: 'Edit',
              icon: <Icon icon='tabler:edit' fontSize={20} />
            },
            {
              text: 'Delete',
              icon: <Icon icon='tabler:trash' fontSize={20} />
            },
          ]}
        />
      </Box>
    )
  }
]

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [createDialog, setOpenCreateDialog] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  useEffect(() => {
    dispatch(
      fetchData({
        role: '',
        q: value,
        status: '',
        currentPlan: plan
      })
    )
  }, [dispatch, plan, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange}  setVisible={setOpenCreateDialog}/>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={store.data}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      <AddDialogProduct visible={createDialog} setVisible={setOpenCreateDialog} />
    </Grid>
  )
}

export default UserList
