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
import { MenuItem } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'

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

const DialogEditCard = ({ visible, setVisible, rowData }) => {
  // ** States
  const [files, setFiles] = useState()

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      console.log(Object.assign(acceptedFiles[0]))
      setFiles(Object.assign(acceptedFiles[0]))
    }
  })

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    id: 0,
    parentCategory: '',
    bannerImg: '',
    title: '',
    description: '',
    status: '',
  })

  useEffect(() => {
    setValue('title', rowData.title)
    setValue('parentCategory', rowData.parentCategory)
    setValue('description', rowData.description)
    setFiles(rowData.bannerImg)
  }, [rowData])

  const handleClose = () => {
    setVisible(false)
  }

  const onSubmit = (value) => {
    console.log('value', value)
  }

  const img = <Box sx={{ position: 'relative' }}>
    <CustomCloseButton onClick={() => setFiles()}>
      <Icon icon='tabler:x' fontSize='1.25rem' />
    </CustomCloseButton>
    {
      typeof files === "string" ?
      <img width={'100%'} className='single-file-image' src={files} />
      :
    <img width={'100%'} key={files?.name} alt={files?.name} className='single-file-image' src={files ? URL.createObjectURL(files) : ''} />
    }
  </Box>

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
          Edit Product Category
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
                  label='Parent Category'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.select)}
                  aria-describedby='validation-basic-select'
                  {...(errors.select && { helperText: 'This field is required' })}
                >
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='USA'>USA</MenuItem>
                  <MenuItem value='Australia'>Australia</MenuItem>
                  <MenuItem value='Germany'>Germany</MenuItem>
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
                  files ? img :
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
        Create
      </Button>
      <Button variant='tonal' color='secondary' onClick={handleClose}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
)
}

export default DialogEditCard