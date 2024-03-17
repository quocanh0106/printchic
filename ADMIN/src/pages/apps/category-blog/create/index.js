import PageHeader from 'src/@core/components/page-header'

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
import { useRouter } from 'next/router'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports

// ** Util Import

// ** Styled Component Imports

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import { CircularProgress, Card, Divider } from '@mui/material'
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
  right: '20%',
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

const BlogCategoryComponent = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  // ** States
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const [listFAQ, setListFAQ] = useState([
    {
      questionUK: '',
      questionUS: '',
      questionFR: '',
      questionDE: '',
      answerUK: '',
      answerUS: '',
      answerFR: '',
      answerDE: '',
    }
  ]);

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

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    getValues,
    formState: { errors }
  } = useForm({
    id: 0,
    bannerImg: '',
    title: '',
    description: '',
    status: '',
  })

  const handleAddFAQ = () => {
    let tempListFAQ = JSON.parse(JSON.stringify(listFAQ))
    tempListFAQ.push({
      questionUK: '',
      questionUS: '',
      questionFR: '',
      questionDE: '',
      answerUK: '',
      answerUS: '',
      answerFR: '',
      answerDE: '',
    })
    setListFAQ(tempListFAQ)
  }

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('New category blog created successfully', {
        duration: 3000
      })
      router.replace('/apps/category-blog/')
    } else {
      if (data.statusCode == 10605) {
        data.errors.forEach(ele => {
          enqueueSnackbar(`${ele} of blog category already exists!`, { variant: 'error' });
        })
      } else {
        enqueueSnackbar(data?.message, { variant: 'error' });
      }
    }
    setLoading(false)
  }

  const onSubmit = (value) => {
    if (files[0]) {
      setLoading(true)
      
      const tempListFAQ = listFAQ.map((ele, index) => {
        LANG.map(language => {
          ele[`question${language.value}`] = getValues(`question_${index + 1}${language.value}`);
          ele[`answer${language.value}`] = getValues(`answer_${index + 1}${language.value}`);
        })

        return ele
      })
      const formData = new FormData();
      LANG.forEach(ele => {
        formData.append(`title${ele.value}`, value[`title${ele.value}`]);
        formData.append(`description${ele.value}`, value[`description${ele.value}`]);
        formData.append(`handleUrl${ele.value}`, value[`handleUrl${ele.value}`]);
        formData.append(`metaDescription${ele.value}`, value[`metaDescription${ele.value}`]);
      })

      formData.append("faq", JSON.stringify(tempListFAQ));
      formData.append("file", files[0]);
      dispatch(addCategoryBlog({ formData, callBackSubmit }))
    } else {
      setError('file', { type: 'custom', message: 'This field is required' })
    }
  }

  const img = files.map(file => (
    <Box key={file.name} sx={{ position: 'relative' }}>
      <CustomCloseButton onClick={() => setFiles([])}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <img width={'80%'} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
    </Box>
  ))

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            Blog Category
          </Typography>
        }
      />
      <Grid item xs={12}>
        <form>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Handle URL
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='handleUrlUK'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Handle URL UK'
                      required
                      onChange={onChange}
                      placeholder='Enter Handle URL UK'
                      error={Boolean(errors.handleUrlUK)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.handleUrlUK && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='handleUrlUS'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Handle URL US'
                      required
                      onChange={onChange}
                      placeholder='Enter Handle URL US'
                      error={Boolean(errors.handleUrlUS)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.handleUrlUS && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='handleUrlFR'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Handle URL FR'
                      required
                      onChange={onChange}
                      placeholder='Enter Handle URL FR'
                      error={Boolean(errors.handleUrlFR)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.handleUrlFR && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='handleUrlDE'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Handle URL DE'
                      required
                      onChange={onChange}
                      placeholder='Enter Handle URL DE'
                      error={Boolean(errors.handleUrlDE)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.handleUrlDE && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2, mt: 5 }}>
              Meta description
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='metaDescriptionUK'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Meta Description UK'
                      required
                      onChange={onChange}
                      placeholder='Enter Meta Description UK'
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
                      value={value}
                      label='Meta DescriptionUS'
                      required
                      onChange={onChange}
                      placeholder='Enter Meta DescriptionUS'
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
                      value={value}
                      label='Meta Description FR'
                      required
                      onChange={onChange}
                      placeholder='Enter Meta Description FR'
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
                      value={value}
                      label='Meta Description DE'
                      required
                      onChange={onChange}
                      placeholder='Enter Meta Description DE'
                      error={Boolean(errors.metaDescriptionDE)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.metaDescriptionDE && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2, mt: 5 }}>
              Title
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
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
              <Grid item xs={6} sm={6}>
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
              <Grid item xs={6} sm={6}>
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
              <Grid item xs={6} sm={6}>
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
            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>
              FAQ
            </Typography>
            {
              listFAQ.map((ele, index) =>
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    Question - {index + 1}
                  </Typography>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <Controller
                        name={`question_${index + 1}${LANG_OBJECT.UK}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label={`question ${LANG_OBJECT.UK}`}
                            required
                            onChange={onChange}
                            error={Boolean(errors[`question_${index + 1}${LANG_OBJECT.UK}`])}
                            aria-describedby='validation-basic-first-name'
                            {...(errors[`question_${index + 1}${LANG_OBJECT.UK}`] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`question_${index + 1}${LANG_OBJECT.US}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label={`question ${LANG_OBJECT.US}`}
                            required
                            onChange={onChange}
                            error={Boolean(errors[`question_${index + 1}${LANG_OBJECT.US}`])}
                            aria-describedby='validation-basic-first-name'
                            {...(errors[`question_${index + 1}${LANG_OBJECT.US}`] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`question_${index + 1}${LANG_OBJECT.FR}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label={`question ${LANG_OBJECT.FR}`}
                            required
                            onChange={onChange}
                            error={Boolean(errors[`question_${index + 1}${LANG_OBJECT.FR}`])}
                            aria-describedby='validation-basic-first-name'
                            {...(errors[`question_${index + 1}${LANG_OBJECT.FR}`] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`question_${index + 1}${LANG_OBJECT.DE}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label={`question ${LANG_OBJECT.DE}`}
                            required
                            onChange={onChange}
                            error={Boolean(errors[`question_${index + 1}${LANG_OBJECT.DE}`])}
                            aria-describedby='validation-basic-first-name'
                            {...(errors[`question_${index + 1}${LANG_OBJECT.DE}`] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    Answer - {index + 1}
                  </Typography>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <Controller
                        name={`answer_${index + 1}${LANG_OBJECT.UK}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <CustomTextField
                            rows={4}
                            fullWidth
                            multiline
                            required
                            {...field}
                            label={`Answer ${LANG_OBJECT.UK}`}
                            error={Boolean(errors[`answer_${index + 1}${LANG_OBJECT.UK}`])}
                            aria-describedby='validation-basic-textarea'
                            {...(errors[`answer_${index + 1}${LANG_OBJECT.UK}`] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`answer_${index + 1}${LANG_OBJECT.US}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <CustomTextField
                            rows={4}
                            fullWidth
                            multiline
                            required
                            {...field}
                            label={`answer ${LANG_OBJECT.US}`}
                            error={Boolean(errors[`answer_${index + 1}${LANG_OBJECT.US}`])}
                            aria-describedby='validation-basic-textarea'
                            {...(errors[`answer_${index + 1}${LANG_OBJECT.US}`] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`answer_${index + 1}${LANG_OBJECT.FR}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <CustomTextField
                            rows={4}
                            fullWidth
                            multiline
                            required
                            {...field}
                            label={`answer ${LANG_OBJECT.FR}`}
                            error={Boolean(errors[`answer_${index + 1}${LANG_OBJECT.FR}`])}
                            aria-describedby='validation-basic-textarea'
                            {...(errors[`answer_${index + 1}${LANG_OBJECT.FR}`] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`answer_${index + 1}${LANG_OBJECT.DE}`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <CustomTextField
                            rows={4}
                            fullWidth
                            multiline
                            required
                            {...field}
                            label={`answer ${LANG_OBJECT.DE}`}
                            error={Boolean(errors[`answer_${index + 1}${LANG_OBJECT.DE}`])}
                            aria-describedby='validation-basic-textarea'
                            {...(errors[`answer_${index + 1}${LANG_OBJECT.DE}`] && { helperText: 'This field is required' })}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 5 }} />
                </Box>
              )
            }
            <Button onClick={handleAddFAQ} sx={{ justifyContent: 'start', width: '100%' }}>
              Add FAQ
            </Button>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2, mt: 5 }}>
              Description
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                    errors.file ? <Typography sx={{ color: 'red' }}>This field is required</Typography> : <></>
                  }
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 4 }}>
              <Button variant='contained' sx={{ mr: 5 }} onClick={handleSubmit(onSubmit)}>
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
              <Button variant='tonal' color='secondary' onClick={() => router.replace('/apps/category-blog/')}>
                Cancel
              </Button>
            </Box>
          </Card>
        </form>
      </Grid>
    </Grid>
  )
}

export default BlogCategoryComponent
