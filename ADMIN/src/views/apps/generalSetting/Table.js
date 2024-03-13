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

    LANG.forEach(ele => {
      setValue(`siteName${ele.value}`, store.data[`siteName${ele.value}`]);
      setValue(`metaTitle${ele.value}`, store.data[`metaTitle${ele.value}`]);
      setValue(`metaDescription${ele.value}`, store.data[`metaDescription${ele.value}`]);
      setValue(`headTag${ele.value}`, store.data[`headTag${ele.value}`]);
      setValue(`footerTag${ele.value}`, store.data[`footerTag${ele.value}`]);
      setValue(`headEmbedAll${ele.value}`, store.data[`headEmbedAll${ele.value}`]);
      setValue(`headTagAll${ele.value}`, store.data[`headTagAll${ele.value}`]);
      setValue(`footerTagAll${ele.value}`, store.data[`footerTagAll${ele.value}`]);
    })

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

    LANG.forEach(ele => {
      formData.append(`siteName${ele.value}`, values[`siteName${ele.value}`]);
      formData.append(`metaTitle${ele.value}`, values[`metaTitle${ele.value}`]);
      formData.append(`metaDescription${ele.value}`, values[`metaDescription${ele.value}`]);
      formData.append(`headTag${ele.value}`, values[`headTag${ele.value}`]);
      formData.append(`footerTag${ele.value}`, values[`footerTag${ele.value}`]);
      formData.append(`headEmbedAll${ele.value}`, values[`headEmbedAll${ele.value}`]);
      formData.append(`headTagAll${ele.value}`, values[`headTagAll${ele.value}`]);
      formData.append(`footerTagAll${ele.value}`, values[`footerTagAll${ele.value}`]);
    })

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
            <Grid container xs={12} sm={12} spacing={6}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='siteNameUK'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      label='Site name UK'
                      onChange={onChange}
                      placeholder='Site name UK'
                      error={Boolean(errors.siteNameUK)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.siteNameUK && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='siteNameUS'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      label='Site name US'
                      onChange={onChange}
                      placeholder='Site name US'
                      error={Boolean(errors.siteNameUS)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.siteNameUS && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='siteNameFR'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      label='Site name FR'
                      onChange={onChange}
                      placeholder='Site name FR'
                      error={Boolean(errors.siteNameFR)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.siteNameFR && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='siteNameDE'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      label='Site name DE'
                      onChange={onChange}
                      placeholder='Site name DE'
                      error={Boolean(errors.siteNameDE)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.siteNameDE && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Meta Title
              </Typography>
            </Grid>
            <Grid container xs={12} sm={12} spacing={6}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='metaTitleUK'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      label='Meta Title UK'
                      onChange={onChange}
                      placeholder='Meta Title UK'
                      error={Boolean(errors.metaTitleUK)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaTitleUK && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>

                <Controller
                  name='metaTitleUS'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      label='Meta Title US'
                      onChange={onChange}
                      placeholder='Meta Title US'
                      error={Boolean(errors.metaTitleUS)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaTitleUS && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>

                <Controller
                  name='metaTitleFR'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      label='Meta Title FR'
                      onChange={onChange}
                      placeholder='Meta Title FR'
                      error={Boolean(errors.metaTitleFR)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaTitleFR && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>

                <Controller
                  name='metaTitleDE'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      label='Meta Title DE'
                      onChange={onChange}
                      placeholder='Meta Title DE'
                      error={Boolean(errors.metaTitleDE)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaTitleDE && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Meta Description
              </Typography>
            </Grid>
            <Grid container xs={12} sm={12} spacing={6}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='metaDescriptionUK'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      onChange={onChange}
                      label='Meta Description UK'
                      placeholder='Meta Description UK'
                      error={Boolean(errors.metaDescriptionUK)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaDescriptionUK && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='metaDescriptionUS'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      onChange={onChange}
                      label='Meta Description US'
                      placeholder='Meta Description US'
                      error={Boolean(errors.metaDescriptionUS)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaDescriptionUS && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='metaDescriptionFR'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      onChange={onChange}
                      label='Meta Description FR'
                      placeholder='Meta Description FR'
                      error={Boolean(errors.metaDescriptionFR)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaDescriptionFR && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='metaDescriptionDE'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value || ""}
                      required
                      onChange={onChange}
                      label='Meta Description DE'
                      placeholder='Meta Description DE'
                      error={Boolean(errors.metaDescriptionDE)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaDescriptionDE && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Head Tag
              </Typography>
            </Grid>
            <Grid container xs={12} sm={12} spacing={6}>              
            <Grid item xs={6} sm={6}>
              
              <Controller
                name='headTagUK'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Tag UK'
                    placeholder='Head Tag UK'
                    error={Boolean(errors.headTagUK)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagUK && { helperText: 'This field is required' })}
                  />
                )}
              />              
              </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headTagUS'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Tag US'
                    placeholder='Head Tag US'
                    error={Boolean(errors.headTagUS)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagUS && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headTagFR'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Tag FR'
                    placeholder='Head Tag FR'
                    error={Boolean(errors.headTagFR)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagFR && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headTagDE'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Tag DE'
                    placeholder='Head Tag DE'
                    error={Boolean(errors.headTagDE)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagDE && { helperText: 'This field is required' })}
                  />
                )}
              />
                </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Footer Tag
              </Typography>
            </Grid>
            <Grid container xs={12} sm={12} spacing={6}>              
            <Grid item xs={6} sm={6}>
              
              <Controller
                name='footerTagUK'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Footer Tag UK'
                    placeholder='Footer Tag UK'
                    error={Boolean(errors.footerTagUK)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagUK && { helperText: 'This field is required' })}
                  />
                )}
              />              
              </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='footerTagUS'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Footer Tag US'
                    placeholder='Footer Tag US'
                    error={Boolean(errors.footerTagUS)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagUS && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='footerTagFR'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Footer Tag FR'
                    placeholder='Footer Tag FR'
                    error={Boolean(errors.footerTagFR)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagFR && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='footerTagDE'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Footer Tag DE'
                    placeholder='Footer Tag DE'
                    error={Boolean(errors.footerTagDE)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagDE && { helperText: 'This field is required' })}
                  />
                )}
              />
                </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Head Embed All
              </Typography>
            </Grid>
            <Grid container xs={12} sm={12} spacing={6}>              
            <Grid item xs={6} sm={6}>
              
              <Controller
                name='headEmbedAllUK'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Embed All UK'
                    placeholder='Head Embed All UK'
                    error={Boolean(errors.headEmbedAllUK)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headEmbedAllUK && { helperText: 'This field is required' })}
                  />
                )}
              />              
              </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headEmbedAllUS'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Embed All US'
                    placeholder='Head Embed All US'
                    error={Boolean(errors.headEmbedAllUS)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headEmbedAllUS && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headEmbedAllFR'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Embed All FR'
                    placeholder='Head Embed All FR'
                    error={Boolean(errors.headEmbedAllFR)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headEmbedAllFR && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headEmbedAllDE'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Embed All DE'
                    placeholder='Head Embed All DE'
                    error={Boolean(errors.headEmbedAllDE)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headEmbedAllDE && { helperText: 'This field is required' })}
                  />
                )}
              />
                </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Head Tag All
              </Typography>
            </Grid>
            <Grid container xs={12} sm={12} spacing={6}>              
            <Grid item xs={6} sm={6}>
              
              <Controller
                name='headTagAllUK'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Tag All UK'
                    placeholder='Head Tag All UK'
                    error={Boolean(errors.headTagAllUK)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagAllUK && { helperText: 'This field is required' })}
                  />
                )}
              />              
              </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headTagAllUS'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Tag All US'
                    placeholder='Head Tag All US'
                    error={Boolean(errors.headTagAllUS)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagAllUS && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headTagAllFR'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Tag All FR'
                    placeholder='Head Tag All FR'
                    error={Boolean(errors.headTagAllFR)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagAllFR && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='headTagAllDE'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Head Tag All DE'
                    placeholder='Head Tag All DE'
                    error={Boolean(errors.headTagAllDE)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.headTagAllDE && { helperText: 'This field is required' })}
                  />
                )}
              />
                </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Grid container xs={12}>
            <Grid item xs={4} sm={4}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Footer Tag All
              </Typography>
            </Grid>
            <Grid container xs={12} sm={12} spacing={6}>              
            <Grid item xs={6} sm={6}>
              
              <Controller
                name='footerTagAllUK'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Footer Tag All UK'
                    placeholder='Footer Tag All UK'
                    error={Boolean(errors.footerTagAllUK)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagAllUK && { helperText: 'This field is required' })}
                  />
                )}
              />              
              </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='footerTagAllUS'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Footer Tag All US'
                    placeholder='Footer Tag All US'
                    error={Boolean(errors.footerTagAllUS)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagAllUS && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='footerTagAllFR'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Footer Tag All FR'
                    placeholder='Footer Tag All FR'
                    error={Boolean(errors.footerTagAllFR)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagAllFR && { helperText: 'This field is required' })}
                  />
                )}
              />              
                </Grid>
              <Grid item xs={6} sm={6}>
                
              <Controller
                name='footerTagAllDE'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value || ""}
                    required
                    onChange={onChange}
                    label='Footer Tag All DE'
                    placeholder='Footer Tag All DE'
                    error={Boolean(errors.footerTagAllDE)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.footerTagAllDE && { helperText: 'This field is required' })}
                  />
                )}
              />
                </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 5 }} />
          <Grid container xs={12}>
            <Grid item xs={1} sm={1}>
              <Typography variant='h5' noWrap sx={{ mb: 5 }}>
                Language
              </Typography>
            </Grid>
            <Grid item xs={11} sm={11}>
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
