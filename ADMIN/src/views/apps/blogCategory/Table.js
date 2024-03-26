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

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/apps/blogCategory/TableHeader'

// ** Components Imports
import AddDialogProduct from './AddDialogBlogCategory'
import DialogEditCard from './edit/FormEdit'
import { deleteCategoryBlog, fetchCategoryBlog } from 'src/store/apps/categoryBlog'
import { useRouter } from 'next/router'


const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [createDialog, setOpenCreateDialog] = useState(false)
  const [editDialog, setOpenEditDialog] = useState(false)
  const [rowData, setRowData] = useState({})

  const router = useRouter()

  const [query, setQuery] = useState({
    page: 1,
    search: ''
  })

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.categoryBlog)

  useEffect(() => {
    dispatch(fetchCategoryBlog())
  }, [dispatch])


  const columns = [
    {
      flex: 0.18,
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
      field: 'handleUrl',
      minWidth: 170,
      headerName: 'Handle URL',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.handleUrlUS}
            </Typography>
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
      headerName: 'descriptionUS',
      field: 'Description',
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
      field: 'metaDescription',
      headerName: 'Meta Description',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.metaDescriptionUS}
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
                    router.push(`/apps/category-blog/edit/${row._id}`)
                  }
                }
              },
              {
                text: 'Preview',
                icon: <Icon icon='icon-park-outline:preview-open' fontSize={20} />,
                menuItemProps: {
                  onClick: () => openInNewTab(`${process.env.NEXT_PUBLIC_USER_API}/${row?._id}`)
                }
              },
              {
                text: 'Blog list',
                icon: <Icon icon='eos-icons:product-classes' fontSize={20} />
              },
              {
                text: 'Delete',
                icon: <Icon icon='tabler:trash' fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    dispatch(deleteCategoryBlog(row._id))
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
          <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} setVisible={setOpenCreateDialog} query={query} />
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
