// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { LANG } from '../../../constant/index'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports

// ** Utils Import

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Button, CircularProgress, Divider, IconButton, MenuItem } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import styled from '@emotion/styled'
import { Controller, useForm } from 'react-hook-form'
import { fetchEventsSetting, updateSetting } from 'src/store/apps/setting'
import toast from 'react-hot-toast'

const UserList = () => {
  // ** State
  const [files, setFiles] = useState()
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    siteName: '',
    metaTitle: '',
    metaDescription: '',
    headTag: '',
    footerTag: '',
    headEmbedAll: '',
    headTagAll: '',
    footerTagAll: '',
    language: 'VN'
  })
  const dispatch = useDispatch()
  const store = useSelector(state => state.setting)

  useEffect(() => {
    setValue('language', store.data.language)
    setValue('siteName', store.data.siteName)
    setValue('metaTitle', store.data.metaTitle)
    setValue('metaDescription', store.data.metaDescription)
    setValue('headTag', store.data.headTag)
    setValue('footerTag', store.data.footerTag)
    setValue('headEmbedAll', store.data.headEmbedAll)
    setValue('headTagAll', store.data.headTagAll)
    setValue('footerTagAll', store.data.footerTagAll)
    setFiles(store.data.imageFeature)
  }, [store])

  useEffect(() => {
    dispatch(
      fetchEventsSetting()
    )
  }, [dispatch])


  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(Object.assign(acceptedFiles[0]))
    }
  })

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

  const img = <Box sx={{ position: 'relative' }}>
    <CustomCloseButton onClick={() => setFiles()}>
      <Icon icon='tabler:x' fontSize='1.25rem' />
    </CustomCloseButton>
    {
      typeof files === "string" ?
        <img width={'70%'} className='single-file-image' src={files} />
        :
        <img width={'70%'} key={files?.name} alt={files?.name} className='single-file-image' src={files ? URL.createObjectURL(files) : ''} />
    }
  </Box>

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('Update setting successfully', {
        duration: 2000
      })
      const anchor = document.querySelector('body')
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      toast.error(data.message, {
        duration: 2000
      })
    }
    setLoading(false)
  }

  const onSubmit = (values) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("settingId", store.data._id);
    formData.append("siteName", values.siteName);
    formData.append("metaTitle", values.metaTitle);
    formData.append("metaDescription", values.metaDescription);

    formData.append("headTag", values.headTag);
    formData.append("footerTag", values.footerTag);
    formData.append("headEmbedAll", values.headEmbedAll);
    formData.append("headTagAll", values.headTagAll);
    formData.append("footerTagAll", values.footerTagAll);
    formData.append("language", values.language);

    typeof files === "string" || formData.append("file", files);
    dispatch(updateSetting({ formData, callBackSubmit }))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ p: 4 }}>
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Site name
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='siteName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    placeholder='Site name'
                    error={Boolean(errors.siteName)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.siteName && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Meta Title
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='metaTitle'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    placeholder='Meta Title'
                    error={Boolean(errors.metaTitle)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.metaTitle && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Meta Description
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='metaDescription'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    placeholder='Meta Description'
                    error={Boolean(errors.metaDescription)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.metaDescription && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Head Tag
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='headTag'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    placeholder='Head Tag'
                    error={Boolean(errors.headTag)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTag && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Footer Tag
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='footerTag'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    placeholder='Footer Tag'
                    error={Boolean(errors.footerTag)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTag && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Head Embed All
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='headEmbedAll'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    placeholder='Head Embed All'
                    error={Boolean(errors.headEmbedAll)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headEmbedAll && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Head Tag All
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='headTagAll'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    placeholder='Head Tag All'
                    error={Boolean(errors.headTagAll)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagAll && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Footer Tag All
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='footerTagAll'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    placeholder='Footer Tag All'
                    error={Boolean(errors.footerTagAll)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagAll && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Divider sx={{ mb: 2 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Language
              </Typography>
            </Grid>
            <Grid item xs={8} sm={8}>
              <Controller
                name='language'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=""
                    SelectProps={{
                      value: value || "",
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.language)}
                    aria-describedby='validation-basic-select'
                    {...(errors.language && { helperText: 'This field is required' })}
                  >
                    <MenuItem value="">None</MenuItem>
                    {
                      LANG.map(ele => <MenuItem key={ele.value} value={ele.value}>{ele?.label}</MenuItem>)
                    }
                  </CustomTextField>
                )}
              />

            </Grid>
          </Grid>
        </Card>
        <Card sx={{ mt: 5 }}>
          <Box sx={{ my: 5, ml: 5 }}>
            <Typography variant='h4' noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize', mb: 5 }}>
              Image feature
            </Typography>
            <Box>
              {
                files ? img :
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
        <Button variant='contained' sx={{ mt: 5 }} onClick={handleSubmit(onSubmit)}>
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
          Save
        </Button>
      </Box>

    </Grid>
  )
}

export default UserList
