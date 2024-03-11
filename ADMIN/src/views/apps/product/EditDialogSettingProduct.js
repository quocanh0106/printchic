// ** React Imports
import { forwardRef, useState } from 'react'

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
import { CircularProgress, MenuItem } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { addCategoryBlog } from 'src/store/apps/categoryBlog'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { LANG, LANG_OBJECT } from 'src/constant'
import { useSnackbar } from 'notistack'

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

const EditDialogSettingProduct = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  // ** States
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors }
  } = useForm({
    id: 0,
    bannerImg: '',
    title: '',
    description: '',
    status: '',
  })

  const handleClose = () => {
    setVisible(false)
  }

  const callBackSubmit = (data) => {
    console.log('data', data)
    if (data.success) {
      reset()
      setFiles([])
      setVisible(false)
      toast.success('New category blog created successfully', {
        duration: 3000
      })
    } else {
      if(data.statusCode == 10605) {
        data.errors.forEach(ele => {
          enqueueSnackbar(`${ele} of blog category already exists!`, { variant : 'error' });
        })
      } else {
        enqueueSnackbar(data?.message, { variant : 'error' });
      }
    }
    setLoading(false)
  }

  const onSubmit = (value) => {
      setLoading(true)
      const formData = new FormData();
      LANG.forEach(ele => {
        formData.append(`processingTime${ele.value}`, value[`processingTime${ele.value}`]);
        formData.append(`shippingTime${ele.value}`, value[`shippingTime${ele.value}`]);
        formData.append(`templateProduct${ele.value}`, value[`templateProduct${ele.value}`]);
      })
      dispatch(addCategoryBlog({ formData, callBackSubmit }))
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
      maxWidth='lg'
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
            Edit Setting Product
          </Typography>
        </Box>

        <form>
        <Typography variant='h5' sx={{ mb: 3 }}>
        Average Est. Processing Time
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={6}>
              <Controller
                name='processingTimeUK'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Average Est. Processing Time UK'
                    required
                    onChange={onChange}
                    placeholder='Enter Average Est. Processing Time UK'
                    error={Boolean(errors.processingTimeUK)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.processingTimeUK && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='processingTimeUS'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Average Est. Processing Time US'
                    required
                    onChange={onChange}
                    placeholder='Enter Average Est. Processing Time'
                    error={Boolean(errors.processingTimeUS)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.processingTimeUS && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='processingTimeFR'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Average Est. Processing Time FR'
                    required
                    onChange={onChange}
                    placeholder='Enter Average Est. Processing Time'
                    error={Boolean(errors.processingTimeFR)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.processingTimeFR && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='processingTimeDE'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Average Est. Processing Time DE'
                    required
                    onChange={onChange}
                    placeholder='Enter Average Est. Processing Time'
                    error={Boolean(errors.processingTimeDE)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.processingTimeDE && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Typography variant='h5' sx={{ mt: 10, mb: 3 }}>
        Average Est. Shipping Time
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={6}>
              <Controller
                name='shippingTimeUK'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                  rows={4}
                  multiline
                    fullWidth
                    value={value}
                    label='Average Est. Shipping Time UK'
                    required
                    onChange={onChange}
                    placeholder='Enter Average Est. Shipping Time UK'
                    error={Boolean(errors.shippingTimeUK)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.shippingTimeUK && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='shippingTimeUS'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                  rows={4}
                  multiline
                    fullWidth
                    value={value}
                    label='Average Est. Shipping Time US'
                    required
                    onChange={onChange}
                    placeholder='Enter Average Est. Shipping Time'
                    error={Boolean(errors.shippingTimeUS)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.shippingTimeUS && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='shippingTimeFR'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                  rows={4}
                  multiline
                    fullWidth
                    value={value}
                    label='Average Est. Shipping Time FR'
                    required
                    onChange={onChange}
                    placeholder='Enter Average Est. Shipping Time'
                    error={Boolean(errors.shippingTimeFR)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.shippingTimeFR && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='shippingTimeDE'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                  rows={4}
                  multiline
                    fullWidth
                    value={value}
                    label='Average Est. Shipping Time DE'
                    required
                    onChange={onChange}
                    placeholder='Enter Average Est. Shipping Time'
                    error={Boolean(errors.shippingTimeDE)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.shippingTimeDE && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Typography variant='h5' sx={{ mt: 10, mb: 3 }}>
        Template Product
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={6}>
              <Controller
                name='templateProductUK'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Template Product UK'
                    required
                    onChange={onChange}
                    placeholder='Enter Template Product UK'
                    error={Boolean(errors.templateProductUK)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.templateProductUK && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='templateProductUS'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Template Product US'
                    required
                    onChange={onChange}
                    placeholder='Enter Template Product'
                    error={Boolean(errors.templateProductUS)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.templateProductUS && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='templateProductFR'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Template Product FR'
                    required
                    onChange={onChange}
                    placeholder='Enter Template Product'
                    error={Boolean(errors.templateProductFR)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.templateProductFR && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Controller
                name='templateProductDE'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Template Product DE'
                    required
                    onChange={onChange}
                    placeholder='Enter Template Product'
                    error={Boolean(errors.templateProductDE)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.templateProductDE && { helperText: 'This field is required' })}
                  />
                )}
              />
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

export default EditDialogSettingProduct
