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
import { LANG, LANG_OBJECT } from 'src/constant'
import { SnackbarProvider, useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();
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
      clearErrors("file")
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const handleClose = () => {
    setVisible(false)
  }
  
  const {
    control,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const callBackSubmit = (data) => {
    console.log('data',data)
    if (data.success) {
      setVisible(false)
      reset()
      setFiles([])
      toast.success('New category product created successfully', {
        duration: 3000
      })
    } else {
      if(data.statusCode == 10505) {
        data.errors.forEach(ele => {
          enqueueSnackbar(`${ele} of product category already exists!`, { variant : 'error' });
        })
      } else {
        toast.error(data.message, {
          duration: 3000
        })
      }
    }

    setLoading(false)
  }

  const onSubmit = (value) => {
    console.log('value',value)
    if(files[0]) {
      setLoading(true)
      const formData = new FormData();
      LANG.forEach(ele => {
        formData.append(`title${ele.value}`, value[`title${ele.value}`]);
        formData.append(`description${ele.value}`, value[`description${ele.value}`]);
      })
      formData.append("parentCategory", value.parentCategory);
      formData.append("file", files[0]);
      dispatch(addCategoryProduct({ formData, callBackSubmit }))
    } else {
      setError('file', { type: 'custom', message: 'This field is required' })
    }
  }

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
                name={`title${LANG_OBJECT.UK}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={`Title ${LANG_OBJECT.UK}`}
                    required
                    onChange={onChange}
                    error={Boolean(errors[`title${LANG_OBJECT.UK}`])}
                    aria-describedby='validation-basic-first-name'
                    {...(errors[`title${LANG_OBJECT.UK}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name={`title${LANG_OBJECT.US}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={`Title ${LANG_OBJECT.US}`}
                    required
                    onChange={onChange}
                    error={Boolean(errors[`title${LANG_OBJECT.US}`])}
                    aria-describedby='validation-basic-first-name'
                    {...(errors[`title${LANG_OBJECT.US}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name={`title${LANG_OBJECT.FR}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={`Title ${LANG_OBJECT.FR}`}
                    required
                    onChange={onChange}
                    error={Boolean(errors[`title${LANG_OBJECT.FR}`])}
                    aria-describedby='validation-basic-first-name'
                    {...(errors[`title${LANG_OBJECT.FR}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name={`title${LANG_OBJECT.DE}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label={`Title ${LANG_OBJECT.DE}`}
                    required
                    onChange={onChange}
                    error={Boolean(errors[`title${LANG_OBJECT.DE}`])}
                    aria-describedby='validation-basic-first-name'
                    {...(errors[`title${LANG_OBJECT.DE}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            {/* description */}
            <Grid item xs={12}>
              <Controller
                name={`description${LANG_OBJECT.UK}`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    required
                    {...field}
                    label={`Description ${LANG_OBJECT.UK}`}
                    error={Boolean(errors[`description${LANG_OBJECT.UK}`])}
                    aria-describedby='validation-basic-textarea'
                    {...(errors[`description${LANG_OBJECT.UK}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={`description${LANG_OBJECT.US}`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    required
                    {...field}
                    label={`Description ${LANG_OBJECT.US}`}
                    error={Boolean(errors[`description${LANG_OBJECT.US}`])}
                    aria-describedby='validation-basic-textarea'
                    {...(errors[`description${LANG_OBJECT.US}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={`description${LANG_OBJECT.FR}`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    required
                    {...field}
                    label={`Description ${LANG_OBJECT.FR}`}
                    error={Boolean(errors[`description${LANG_OBJECT.FR}`])}
                    aria-describedby='validation-basic-textarea'
                    {...(errors[`description${LANG_OBJECT.FR}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={`description${LANG_OBJECT.DE}`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    rows={4}
                    fullWidth
                    multiline
                    required
                    {...field}
                    label={`Description ${LANG_OBJECT.DE}`}
                    error={Boolean(errors[`description${LANG_OBJECT.DE}`])}
                    aria-describedby='validation-basic-textarea'
                    {...(errors[`description${LANG_OBJECT.DE}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='parentCategory'
                control={control}
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
                    aria-describedby='validation-basic-select'
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
                {
                  errors.file ? <Typography sx={{color: 'red'}}>This field is required</Typography> : <></>
                }
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
