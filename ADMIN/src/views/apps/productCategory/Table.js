// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports

// ** Utils Import

// ** Actions Imports

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/productCategory/TableHeader'

// ** Components Imports
import { Switch } from 'antd'
import { useRouter } from 'next/router'
import { deleteCategoryProduct, fetchEvents, updateTopCategoryProduct } from 'src/store/apps/categoryProduct'
import AddDialogProduct from './AddDialogProduct'
import DialogEditCard from './EditDialogProduct'


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
  const store = useSelector(state => state.categoryProduct)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  const callBackSubmit = (data, setIsChecked) => {
    if (data.success) {
      toast.success('Successfully updated category product trends', {
        duration: 2000
      })
    } else {
      toast.error(`${data.message}`, {
        duration: 2000
      })
      setIsChecked(false)
    }
  }

  const handleSwitchTop = (isTopBlog, data, setIsChecked) => {
    setIsChecked(isTopBlog)
    const formData = { categoryProductId: data._id, isTop: isTopBlog, updateTrending: true }
    dispatch(updateTopCategoryProduct({ formData, callBackSubmit, setIsChecked }))
  }

  const columns = [
    {
      flex: 0.18,
      minWidth: 50,
      field: '_id',
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
      field: 'titleUS',
      minWidth: 170,
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.titleUS}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.3,
      minWidth: 120,
      headerName: 'Description',
      field: 'descriptionUS',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.descriptionUS}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'childCategory',
      headerName: 'Child Category',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {store?.data?.find(ele => ele._id == row.childCategory)?.titleUS}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'isTop',
      headerName: 'Trending',
      renderCell: ({ row }) => {
        // eslint-disable-next-line
        const [isChecked, setIsChecked] = useState()

        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            <Switch defaultValue={row?.isTop} value={isChecked} onChange={(checked) => handleSwitchTop(checked, row, setIsChecked)} />
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
                  onClick: () => {
                    router.push(`/apps/category-product/edit/${row._id}`)
                  }
                }
              },
              {
                text: 'Delete',
                icon: <Icon icon='tabler:trash' fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    dispatch(deleteCategoryProduct(row._id))
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
          <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} setVisible={setOpenCreateDialog} query={query} setQuery={setQuery} />
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
      <DialogEditCard visible={editDialog} setVisible={setOpenEditDialog} rowData={rowData} />
    </Grid>
  )
}

export default UserList
