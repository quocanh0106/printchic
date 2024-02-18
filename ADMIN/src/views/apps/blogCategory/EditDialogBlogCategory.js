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
import { CircularProgress, MenuItem } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { updateCategoryBlog } from 'src/store/apps/categoryBlog'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()

  // ** States
  const [files, setFiles] = useState()
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      clearErrors("file")
      setFiles(Object.assign(acceptedFiles[0]))
    }
  })

  const {
    control,
    setValue,
    reset,
    clearErrors,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    id: 0,
    bannerImg: '',
    title: '',
    description: '',
    status: '',
  })

  useEffect(() => {
    setValue('title', rowData.title)
    setValue('parentCategory', rowData.parentCategory)
    setValue('description', rowData.description)
    setValue('handleUrl', rowData.handleUrl)
    setValue('metaDescription', rowData.metaDescription)
    setFiles(rowData.bannerImg)
  }, [rowData])

  const handleClose = () => {
    setVisible(false)
  }

  const callBackSubmit = (data) => {
    if (data.success) {
      setVisible(false)
      toast.success('Update category blog created successfully', {
        duration: 2000
      })
    } else {
      toast.error(data.message, {
        duration: 2000
      })
    }
    reset()
    setLoading(false)
  }

  const onSubmit = (value) => {
    if (files) {
      setLoading(true)
      const formData = new FormData();
      formData.append("categoryBlogId", rowData._id);
      formData.append("title", value.title);
      formData.append("handleUrl", value.handleUrl);
      formData.append("metaDescription", value.metaDescription);
      formData.append("description", value.description);
      typeof files === "string" || formData.append("file", files);
      dispatch(updateCategoryBlog({ formData, callBackSubmit }))
    } else {
      setError('file', { type: 'custom', message: 'This field is required' })
    }
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
            Edit Blog Category
          </Typography>
        </Box>

        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='handleUrl'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Handle URL'
                    required
                    onChange={onChange}
                    placeholder='Enter Handle URL'
                    error={Boolean(errors.handleUrl)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.handleUrl && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='metaDescription'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Meta Description'
                    required
                    onChange={onChange}
                    placeholder='Enter Meta Description'
                    error={Boolean(errors.metaDescription)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.metaDescription && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
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
                    placeholder='Enter title'
                    error={Boolean(errors.title)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.title && { helperText: 'This field is required' })}
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
                    error={Boolean(errors.description)}
                    aria-describedby='validation-basic-textarea'
                    {...(errors.description && { helperText: 'This field is required' })}
                  />
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
                {
                  errors.file ? <Typography sx={{ color: 'red' }}>This field is required</Typography> : <></>
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
          Update
        </Button>
        <Button variant='tonal' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogEditCard
