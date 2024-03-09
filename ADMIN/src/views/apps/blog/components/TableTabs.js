// ** React Imports
import { forwardRef, useCallback, useEffect, useState } from 'react'

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
import { useRouter } from 'next/router'
import OptionsMenu from 'src/@core/components/option-menu'
import { deleteTag, fetchTag, updateTag } from 'src/store/apps/tag'
import TableHeaderTabs from './TableHeaderTabs'
import { useSnackbar } from 'notistack'
import { Button, Dialog, DialogContent, Fade, IconButton } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import styled from '@emotion/styled'

// ** Components Imports


const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const TableTabs = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [createDialog, setOpenCreateDialog] = useState(false)
  const [editDialog, setOpenEditDialog] = useState(false)
  const [rowData, setRowData] = useState({})
  const [openDialogCreateTag, setOpenDialogCreateTag] = useState(false);

    // handle tag
    const [newTags, setNewTags] = useState({
      tagId: '',
      titleUK: '',
      titleUS: '',
      titleFR: '',
      titleDE: '',
    });
    const [errorsTag, setErrorsTag] = useState({
      titleUK: false,
      titleUS: false,
      titleFR: false,
      titleDE: false,
    });

  const [query, setQuery] = useState({
    page: 1,
    search: ''
  })

  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const store = useSelector(state => state.tag)

  useEffect(() => {
    dispatch(fetchTag())
  }, [])

  const callBackSubmitDel = (data) => {
    if (data.success) {
      enqueueSnackbar('Delete tag successfully!!!', { variant: 'success' })
      dispatch(fetchTag())
    } else {
      if (data.statusCode == 10905) {
        data.errors.forEach(ele => {
          enqueueSnackbar(`${ele} of blog already exists!`, { variant: 'error' });
        })
      } else {
        enqueueSnackbar(`${data.message}`, { variant: 'error' });
      }
    }
    setLoading(false)
  }

  const columns = [
    {
      flex: 0.17,
      minWidth: 50,
      field: 'id',
      headerName: 'Tag ID',
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
      headerName: 'title',
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
      headerName: 'Created At',
      field: 'createdAt',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.createdAt}
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
                    setNewTags({
                      tagId: row?._id,
                      titleUK: row?.titleUK,
                      titleUS: row?.titleUS,
                      titleFR: row?.titleFR,
                      titleDE: row?.titleDE,
                    })
                    setOpenDialogCreateTag(true)
                  }
                }
              },
              {
                text: 'Delete',
                icon: <Icon icon='tabler:trash' fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    dispatch(deleteTag({tagId: row._id, callBackSubmit: callBackSubmitDel}))
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

  const callBackSubmitUpdateTag = (data) => {
    if (data.success) {
      setOpenDialogCreateTag(false)
      dispatch(fetchTag())
      enqueueSnackbar('Update Tag created successfully', { variant: 'success' })
    } else {
      if (data.statusCode == 10905) {
        data.errors.forEach(ele => {
          enqueueSnackbar(`${ele} of tag already exists!`, { variant: 'error' });
        })
      } else {
        enqueueSnackbar(`${data.message}`, { variant: 'error' });
      }
    }
    setLoading(false)
  }

  const handleSubmitNewTag = () => {
    let tempErrorTag = {}
    if (!newTags.titleUK) {
      tempErrorTag.titleUK = true
    }
    if (!newTags.titleUS) {
      tempErrorTag.titleUS = true
    }
    if (!newTags.titleFR) {
      tempErrorTag.titleFR = true
    }
    if (!newTags.titleDE) {
      tempErrorTag.titleDE = true
    }

    if (tempErrorTag.titleUK || tempErrorTag.titleUS || tempErrorTag.titleFR || tempErrorTag.titleDE) {
      setErrorsTag(tempErrorTag)
    } else {
      let formData = newTags

      dispatch(updateTag({ formData, callBackSubmit: callBackSubmitUpdateTag }))
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeaderTabs query={query} plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} setVisible={setOpenCreateDialog} />
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
      <Dialog
        fullWidth
        open={openDialogCreateTag}
        scroll='body'
        maxWidth='sm'
        onClose={() => setOpenDialogCreateTag(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setOpenDialogCreateTag(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
        >
          <CustomCloseButton onClick={() => setOpenDialogCreateTag(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h2' sx={{ mb: 3 }}>
              Update Tags
            </Typography>
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={newTags.titleUK}
              label={`Tag UK`}
              required
              onChange={(e) => {
                if (e.target.value && errorsTag.titleUK) {
                  setErrorsTag({ ...errorsTag, titleUK: false })
                }
                let tempNewTags = { ...newTags }
                setNewTags({ ...tempNewTags, titleUK: e.target.value })
              }}
              error={Boolean(errorsTag.titleUK)}
              aria-describedby='validation-basic-first-name'
              {...(errorsTag.titleUK && { helperText: 'This field is required' })}
            />
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={newTags.titleUS}
              label={`Tag US`}
              required
              onChange={(e) => {
                if (e.target.value && errorsTag.titleUS) {
                  setErrorsTag({ ...errorsTag, titleUS: false })
                }
                let tempNewTags = { ...newTags }
                setNewTags({ ...tempNewTags, titleUS: e.target.value })
              }}
              error={Boolean(errorsTag.titleUS)}
              aria-describedby='validation-basic-first-name'
              {...(errorsTag.titleUS && { helperText: 'This field is required' })}
            />
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={newTags.titleFR}
              label={`Tag FR`}
              required
              onChange={(e) => {
                if (e.target.value && errorsTag.titleFR) {
                  setErrorsTag({ ...errorsTag, titleFR: false })
                }
                let tempNewTags = { ...newTags }
                setNewTags({ ...tempNewTags, titleFR: e.target.value })
              }}
              error={Boolean(errorsTag.titleFR)}
              aria-describedby='validation-basic-first-name'
              {...(errorsTag.titleFR && { helperText: 'This field is required' })}
            />
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={newTags.titleDE}
              label={`Tag DE`}
              required
              onChange={(e) => {
                if (e.target.value && errorsTag.titleDE) {
                  setErrorsTag({ ...errorsTag, titleDE: false })
                }
                let tempNewTags = { ...newTags }
                setNewTags({ ...tempNewTags, titleDE: e.target.value })
              }}
              error={Boolean(errorsTag.titleDE)}
              aria-describedby='validation-basic-first-name'
              {...(errorsTag.titleDE && { helperText: 'This field is required' })}
            />
          </Box>
        </DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mb: 3, py: 3 }}>
          <Button variant='tonal' color='secondary' onClick={() => setOpenDialogCreateTag(false)}>
            Cancel
          </Button>
          <Button sx={{ ml: 20 }} variant='contained' onClick={handleSubmitNewTag}>
            Update Tag
          </Button>
        </Box>
      </Dialog>
    </Grid>
  )
}

export default TableTabs
