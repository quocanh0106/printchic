// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports

// ** Util Import

// ** Styled Component Imports

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import { CircularProgress, MenuItem, fabClasses } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'src/@core/components/icon'
import { addCategoryProduct, fetchEvents } from 'src/store/apps/categoryProduct'
import toast from 'react-hot-toast'

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

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const DialogAddCard = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.categoryProduct)
  
  // ** States
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const handleClose = () => {
    setVisible(false)
  }

  const callBackSubmit = (data) => {
    console.log('data',data)
    if (data.success) {
      setVisible(false)
      toast.success('New category product created successfully', {
        duration: 2000
      })
    } else {
      toast.error(data.message, {
        duration: 2000
      })
    }
    reset()
    setFiles([])
    setLoading(false)
  }

  const onSubmit = (value) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("parentCategory", value.parentCategory);
    formData.append("file", files[0]);
    dispatch(addCategoryProduct({ formData, callBackSubmit }))
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    dob: null,
    email: '',
    radio: '',
    select: '',
    lastName: '',
    password: '',
    textarea: '',
    firstName: '',
    checkbox: false
  })

  const img = files.map(file => (
    <Box key={file.name} sx={{ position: 'relative' }}>
      <CustomCloseButton onClick={() => setFiles([])}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <img width={'100%'} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
    </Box>
  ))

  return (
    <Dialog
      fullWidth
      open={visible}
      maxWidth='sm'
      scroll='body'
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <CustomCloseButton onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h3' sx={{ mb: 3 }}>
            Add New Product Category
          </Typography>
        </Box>

        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Title'
                    required
                    onChange={onChange}
                    placeholder='Leonard'
                    error={Boolean(errors.firstName)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.firstName && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    required
                    {...field}
                    label='Description'
                    error={Boolean(errors.textarea)}
                    aria-describedby='validation-basic-textarea'
                    {...(errors.textarea && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='parentCategory'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='Parent category'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    aria-describedby='validation-basic-select'
                    {...(errors.select && { helperText: 'This field is required' })}
                  >
                    {
                      store.data.map(ele => <MenuItem key={ele._id} value={ele._id}>{ele.title}</MenuItem>)
                    }
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box>
                <Box>
                  <Typography>
                    Banner image
                  </Typography>
                  {
                    files.length ? img :
                      <Button  {...getRootProps({ className: 'dropzone' })} variant='contained' sx={{ mr: 1 }}>
                        <input {...getInputProps()} />
                        Upload
                      </Button>
                  }
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'right',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 1 }} onClick={handleSubmit(onSubmit)}>
          {loading ? (
            <CircularProgress
              sx={{
                color: 'common.white',
                width: '20px !important',
                height: '20px !important',
                mr: theme => theme.spacing(2)
              }}
            />
          ) : null}
          Create
        </Button>
        <Button variant='tonal' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAddCard
