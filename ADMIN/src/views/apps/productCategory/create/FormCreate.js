
import { forwardRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports

// ** Util Import
const QuillNoSSRWrapper = dynamic(import('react-quill'), {

  ssr: false,
  loading: () => <p>Loading ...</p>,
})

// ** Styled Component Imports

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import { Card, CircularProgress, MenuItem, Divider } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'src/@core/components/icon'
import { LANG, LANG_OBJECT } from 'src/constant'
import { addCategoryProduct, fetchEvents } from 'src/store/apps/categoryProduct'
import { useRouter } from 'next/router'

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: '40%',
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

const ProductCategoryComponent = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const store = useSelector(state => state.categoryProduct)

  // ** States
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const [pajamasUK, setPajamasUK] = useState('');
  const [pajamasUS, setPajamasUS] = useState('');
  const [pajamasDE, setPajamasDE] = useState('');
  const [pajamasFR, setPajamasFR] = useState('');

  const [paragraphUK, setParagraphUK] = useState('');
  const [paragraphUS, setParagraphUS] = useState('');
  const [paragraphDE, setParagraphDE] = useState('');
  const [paragraphFR, setParagraphFR] = useState('');

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

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  const {
    control,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      faqs: [{
        questionUK: '',
        questionUS: '',
        questionFR: '',
        questionDE: '',
        answerUK: '',
        answerUS: '',
        answerFR: '',
        answerDE: '',
      }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'faqs'
  });

  const handleChangePajamasUK = (content, delta, source, editor) => {
    setPajamasUK(content);
  };

  const handleChangePajamasUS = (content, delta, source, editor) => {
    setPajamasUS(content);
  };

  const handleChangePajamasDE = (content, delta, source, editor) => {
    setPajamasDE(content);
  };

  const handleChangePajamasFR = (content, delta, source, editor) => {
    setPajamasFR(content);
  };

  const handleChangeParagraphUK = (content, delta, source, editor) => {
    setParagraphUK(content);
  };

  const handleChangeParagraphUS = (content, delta, source, editor) => {
    setParagraphUS(content);
  };

  const handleChangeParagraphDE = (content, delta, source, editor) => {
    setParagraphDE(content);
  };

  const handleChangeParagraphFR = (content, delta, source, editor) => {
    setParagraphFR(content);
  };

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('New category product created successfully', {
        duration: 3000
      })
      router.replace('/apps/category-product/')
    } else {
      if (data.statusCode == 10505) {
        data.errors.forEach(ele => {
          toast.error(`${ele} of product category already exists!`);
        })
      } else {
        toast.error(`${data.message}`);
      }
    }
    setLoading(false)
  }

  const onSubmit = (value) => {
    if (files[0]) {
      setLoading(true)

      const formData = new FormData();
      LANG.forEach(ele => {
        formData.append(`title${ele.value}`, value[`title${ele.value}`] || '');
        formData.append(`breadcrumb${ele.value}`, value[`breadcrumb${ele.value}`] || '');
        formData.append(`description${ele.value}`, value[`description${ele.value}`] || '');
        formData.append(`handleUrl${ele.value}`, value[`handleUrl${ele.value}`] || '');
      })
      formData.append("childCategory", value.childCategory);
      formData.append("file", files[0]);

      formData.append("pajamasUK", JSON.stringify(pajamasUK) || '');
      formData.append("pajamasUS", JSON.stringify(pajamasUS) || '');
      formData.append("pajamasFR", JSON.stringify(pajamasFR) || '');
      formData.append("pajamasDE", JSON.stringify(pajamasDE) || '');

      formData.append("paragraphUK", JSON.stringify(paragraphUK) || '');
      formData.append("paragraphUS", JSON.stringify(paragraphUS) || '');
      formData.append("paragraphFR", JSON.stringify(paragraphFR) || '');

      formData.append("faq", JSON.stringify(value.faqs));

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
      <img width={'60%'} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
    </Box>
  ))

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <form>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Title
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`title${LANG_OBJECT.UK}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Title ${LANG_OBJECT.UK}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
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
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Title ${LANG_OBJECT.FR}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`title${LANG_OBJECT.DE}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Title ${LANG_OBJECT.DE}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              {/* description */}

            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Handle Url
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`handleUrl${LANG_OBJECT.UK}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Handle Url ${LANG_OBJECT.UK}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`handleUrl${LANG_OBJECT.US}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Handle Url ${LANG_OBJECT.US}`}
                      required
                      onChange={onChange}
                      error={Boolean(errors[`handleUrl${LANG_OBJECT.US}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`handleUrl${LANG_OBJECT.US}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`handleUrl${LANG_OBJECT.FR}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Handle Url ${LANG_OBJECT.FR}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`handleUrl${LANG_OBJECT.DE}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Handle Url ${LANG_OBJECT.DE}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              {/* description */}

            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Breadcrumb
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`breadcrumb${LANG_OBJECT.UK}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Breadcrumb ${LANG_OBJECT.UK}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`breadcrumb${LANG_OBJECT.US}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Breadcrumb ${LANG_OBJECT.US}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`breadcrumb${LANG_OBJECT.FR}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Breadcrumb ${LANG_OBJECT.FR}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`breadcrumb${LANG_OBJECT.DE}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Breadcrumb ${LANG_OBJECT.DE}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              {/* description */}

            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2, mt: 7 }}>
              Description
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <Controller
                  name={`description${LANG_OBJECT.UK}`}
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      {...field}
                      label={`Description ${LANG_OBJECT.UK}`}
                      aria-describedby='validation-basic-textarea'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`description${LANG_OBJECT.US}`}
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      {...field}
                      label={`Description ${LANG_OBJECT.US}`}
                      aria-describedby='validation-basic-textarea'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`description${LANG_OBJECT.FR}`}
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      {...field}
                      label={`Description ${LANG_OBJECT.FR}`}
                      aria-describedby='validation-basic-textarea'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`description${LANG_OBJECT.DE}`}
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      {...field}
                      label={`Description ${LANG_OBJECT.DE}`}
                      aria-describedby='validation-basic-textarea'
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 4, mt: 4, textAlign: 'left' }}>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Pajamas UK
              </Typography>
              <QuillNoSSRWrapper value={pajamasUK} onChange={handleChangePajamasUK} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Pajamas US
              </Typography>
              <QuillNoSSRWrapper value={pajamasUS} onChange={handleChangePajamasUS} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Pajamas DE
              </Typography>
              <QuillNoSSRWrapper value={pajamasDE} onChange={handleChangePajamasDE} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Pajamas FR
              </Typography>
              <QuillNoSSRWrapper value={pajamasFR} onChange={handleChangePajamasFR} modules={modules} formats={formats} theme="snow" />
            </Box>
          </Card>
          <Card sx={{ p: 4, my: 4, textAlign: 'left' }}>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Paragraph UK
              </Typography>
              <QuillNoSSRWrapper value={paragraphUK} onChange={handleChangeParagraphUK} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Paragraph US
              </Typography>
              <QuillNoSSRWrapper value={paragraphUS} onChange={handleChangeParagraphUS} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Paragraph DE
              </Typography>
              <QuillNoSSRWrapper value={paragraphDE} onChange={handleChangeParagraphDE} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Paragraph FR
              </Typography>
              <QuillNoSSRWrapper value={paragraphFR} onChange={handleChangeParagraphFR} modules={modules} formats={formats} theme="snow" />
            </Box>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>
              FAQ
            </Typography>
            {
              fields.map((field, index) =>
                <Box key={field.id} sx={{ mb: 3 }}>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    FAQ - {index + 1}
                  </Typography>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <Controller
                        name={`faqs.${index}.question${LANG_OBJECT.UK}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label={`question ${LANG_OBJECT.UK}`}
                            onChange={onChange}
                            aria-describedby='validation-basic-first-name'
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`faqs.${index}.question${LANG_OBJECT.US}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label={`question ${LANG_OBJECT.US}`}
                            onChange={onChange}
                            aria-describedby='validation-basic-first-name'
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`faqs.${index}.answer${LANG_OBJECT.UK}`}
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            rows={4}
                            fullWidth
                            multiline
                            {...field}
                            label={`Answer ${LANG_OBJECT.UK}`}
                            aria-describedby='validation-basic-textarea'
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`faqs.${index}.answer${LANG_OBJECT.US}`}
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            rows={4}
                            fullWidth
                            multiline
                            {...field}
                            label={`answer ${LANG_OBJECT.US}`}
                            aria-describedby='validation-basic-textarea'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mt: 5 }} spacing={5}>
                    <Grid item xs={6}>
                      <Controller
                        name={`faqs.${index}.question${LANG_OBJECT.DE}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label={`question ${LANG_OBJECT.DE}`}
                            onChange={onChange}
                            aria-describedby='validation-basic-first-name'
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`faqs.${index}.question${LANG_OBJECT.FR}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <CustomTextField
                            fullWidth
                            value={value}
                            label={`question ${LANG_OBJECT.FR}`}
                            onChange={onChange}
                            aria-describedby='validation-basic-first-name'
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`faqs.${index}.answer${LANG_OBJECT.DE}`}
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            rows={4}
                            fullWidth
                            multiline
                            {...field}
                            label={`answer ${LANG_OBJECT.DE}`}
                            aria-describedby='validation-basic-textarea'
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name={`faqs.${index}.answer${LANG_OBJECT.FR}`}
                        control={control}
                        render={({ field }) => (
                          <CustomTextField
                            rows={4}
                            fullWidth
                            multiline
                            {...field}
                            label={`answer ${LANG_OBJECT.FR}`}
                            aria-describedby='validation-basic-textarea'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  {
                    index > 0 ? <Button variant='outlined' onClick={() => remove(index)} sx={{ justifyContent: 'start', width: '180px', mt: 4 }}>
                      Remove this FAQ
                    </Button> : <></>
                  }

                  <Divider sx={{ my: 5 }} />
                </Box>
              )
            }
            <Button variant='contained' onClick={() => append({
              questionUK: '',
              questionUS: '',
              questionFR: '',
              questionDE: '',
              answerUK: '',
              answerUS: '',
              answerFR: '',
              answerDE: '',
            })} sx={{ justifyContent: 'start' }}>
              Add FAQ
            </Button>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='childCategory'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='child category'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    aria-describedby='validation-basic-select'
                  >
                    {
                      store.data.map(ele => <MenuItem key={ele._id} value={ele._id}>{ele.titleUS}</MenuItem>)
                    }
                  </CustomTextField>
                )}
              />
            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
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
          </Card>
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
            <Button variant='tonal' color='secondary' onClick={() => router.replace('/apps/category-product/')}>
              Cancel
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}

export default ProductCategoryComponent
