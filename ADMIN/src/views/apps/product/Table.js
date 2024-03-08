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

// ** Utils Import

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/product/TableHeader'
import { deleteProduct, fetchProduct } from 'src/store/apps/product'
import { useRouter } from 'next/router'
import { openInNewTab } from 'src/utils'

// ** Components Imports


const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [createDialog, setOpenCreateDialog] = useState(false)
  const [editDialog, setOpenEditDialog] = useState(false)
  const [rowData, setRowData] = useState({})

  const [query, setQuery] = useState({
    page: 1,
    search: ''
  })

  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const store = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchProduct())
  }, [])


  const columns = [
    {
      flex: 0.17,
      minWidth: 50,
      field: 'id',
      headerName: 'Product ID',
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
      field: 'categoryProductId',
      minWidth: 170,
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.categoryProductId?.titleUS}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 120,
      headerName: 'Product Name',
      field: 'titleUS',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.titleUS}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'createdAt',
      headerName: 'Create date',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.createdAt}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.status}
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
                icon: <Icon icon='tabler:edit' fontSize={20} />,
                menuItemProps: {
                  onClick: () => router.replace(`/apps/product/edit/${row._id}`)
                }
              },
              {
                text: 'Preview',
                icon: <Icon icon='icon-park-outline:preview-open' fontSize={20} />,
                menuItemProps: {
                  onClick: () => openInNewTab(`${process.env.NEXT_PUBLIC_URL_USER}/product/${row?.id}`)
                }
              },
              // {
              //   text: row.isPublic ? 'Set to Private' : 'Set to Public',
              //   icon: <Icon icon={row.isPublic ? 'dashicons:hidden' : 'zondicons:view-show'} fontSize={20} />
              // },
              {
                text: 'Delete',
                icon: <Icon icon='tabler:trash' fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    dispatch(deleteProduct(row._id))
                  }
                }
              },
            ]}
          />
        </Box>
      )
    }
  ]

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
          <TableHeader query={query} plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} setVisible={setOpenCreateDialog} />
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
    </Grid>
  )
}

export default UserList
