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
import CustomTextField from 'src/@core/components/mui/text-field'
import { Button, IconButton, MenuItem } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import styled from '@emotion/styled'

// ** Custom Components Imports

const dataFake = [
  {
    id: 1,
    description: 'Site name',
    listOptions: []
  },
  {
    id: 2,
    description: 'Meta Title',
    listOptions: []
  },
  {
    id: 3,
    description: 'Meta Description',
    listOptions: []
  },
  {
    id: 4,
    description: 'Head tag for Homepage',
    listOptions: []
  },
  {
    id: 5,
    description: 'Footer tag for Homepage',
    listOptions: []
  },
  {
    id: 6,
    description: 'Header for all',
    listOptions: []
  },
  {
    id: 7,
    description: 'Default language',
    listOptions: []
  },
]

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState([])
  const [value, setValue] = useState('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [files, setFiles] = useState([])

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

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const columns = [
    {
      flex: 0.05,
      minWidth: 50,
      field: 'id',
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
      field: 'description',
      minWidth: 170,
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.description}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 190,
      field: 'parentCategory',
      headerName: 'Value',
      renderCell: (row) => {
        return (
          <CustomTextField
            select
            fullWidth
            value={plan}
            defaultValue='Select Plan'
            SelectProps={{ displayEmpty: true, value: plan, onChange: e => handlePlanChange(e) }}
          >
            <MenuItem value=''>Status</MenuItem>
            <MenuItem value='basic'>Basic</MenuItem>
            <MenuItem value='company'>Company</MenuItem>
            <MenuItem value='enterprise'>Enterprise</MenuItem>
            <MenuItem value='team'>Team</MenuItem>
          </CustomTextField>
        )
      }
    }
  ]

  const CustomCloseButton = styled(IconButton)(({ theme }) => ({
    top: 0,
    right: '30%',
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

  const img = files.map(file => (
    <Box sx={{ position: 'relative' }}>
      <CustomCloseButton onClick={() => setFiles([])}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <img width={'70%'} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
    </Box>
  ))

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={dataFake}
            columns={columns}
          />
        </Card>
        <Card sx={{ mt: 5 }}>
          <Box sx={{ my: 5, ml: 5 }}>
            <Typography variant='h4' noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize', mb: 5 }}>
              Image feature
            </Typography>
            <Box>
              {
                files.length ? img :
                  <Button  {...getRootProps({ className: 'dropzone' })} variant='contained' sx={{ mr: 1 }}>
                    <input {...getInputProps()} />
                    Upload
                  </Button>
              }
            </Box>
          </Box>
        </Card>
      </Grid>
      <Box sx={{ width: '100%', textAlign: 'right' }}>
        <Button variant='contained' sx={{ mt: 5 }}>
          Save
        </Button>
      </Box>

    </Grid>
  )
}

export default UserList
