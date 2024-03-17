
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports

// ** Util Import

// ** Styled Component Imports

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import { Card, CircularProgress, MenuItem, Divider } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'src/@core/components/icon'
import { LANG, LANG_OBJECT } from 'src/constant'
import { addCategoryBlog, fetchInfoCategoryBlog, updateCategoryBlog } from 'src/store/apps/categoryBlog'
import { fetchEvents, fetchInfoCategoryProduct, updateCategoryProduct } from 'src/store/apps/categoryProduct'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {

  ssr: false,
  loading: () => <p>Loading ...</p>,
})

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
  const router = useRouter()
  const store = useSelector(state => state.categoryProduct)
  const { infoCategoryProduct } = useSelector(state => state.categoryProduct)
  const dispatch = useDispatch()
  const [files, setFiles] = useState()
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

  const { id } = router.query;

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
    getValues,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    id: 0,
    childCategory: '',
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

  useEffect(() => {
    dispatch(fetchEvents())
    if (id) {
      dispatch(fetchInfoCategoryProduct({ categoryProductId: id }))
    }
  }, [id])

  useEffect(() => {
    LANG.forEach(ele => {
      setValue(`title${ele.value}`, infoCategoryProduct?.[`title${ele.value}`]);
      setValue(`breadcrumb${ele.value}`, infoCategoryProduct?.[`breadcrumb${ele.value}`]);
      setValue(`description${ele.value}`, infoCategoryProduct?.[`description${ele.value}`]);
    })
    setValue('description', infoCategoryProduct?.description)
    setValue('childCategory', infoCategoryProduct?.childCategory)
    setFiles(infoCategoryProduct?.bannerImg)

    infoCategoryProduct?.pajamasUK && setPajamasUK(JSON.parse(infoCategoryProduct?.pajamasUK))
    infoCategoryProduct?.pajamasUS && setPajamasUS(JSON.parse(infoCategoryProduct?.pajamasUS))
    infoCategoryProduct?.pajamasFR && setPajamasFR(JSON.parse(infoCategoryProduct?.pajamasFR))
    infoCategoryProduct?.pajamasDE && setPajamasDE(JSON.parse(infoCategoryProduct?.pajamasDE))

    infoCategoryProduct?.paragraphUK && setParagraphUK(JSON.parse(infoCategoryProduct?.paragraphUK))
    infoCategoryProduct?.paragraphUS && setParagraphUS(JSON.parse(infoCategoryProduct?.paragraphUS))
    infoCategoryProduct?.paragraphFR && setParagraphFR(JSON.parse(infoCategoryProduct?.paragraphFR))
    infoCategoryProduct?.paragraphDE && setParagraphDE(JSON.parse(infoCategoryProduct?.paragraphDE))

    let tempListFAQ = []
    infoCategoryProduct?.faq && JSON.parse(infoCategoryProduct?.faq).forEach((ele, index) => {
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
      LANG.forEach(language => {
        setValue(`question_${index+1}${language.value}`, ele[`question${language.value}`]);
        setValue(`answer_${index+1}${language.value}`, ele[`answer${language.value}`]);
      })
    })
    setListFAQ(tempListFAQ)
  }, [infoCategoryProduct, id])

  const callBackSubmit = (data) => {
    setLoading(false)
    if (data.success) {
      toast.success('Category Product updated successfully', {
        duration: 3000
      })
      router.replace('/apps/category-product')
    } else {
      if (data.statusCode == 10505) {
        data.errors.forEach(ele => {
          toast.success(`${ele} of product category already exists!`);
        })
      } else {
        toast.error(data.message, {
          duration: 3000
        })
      }
    }
  }

  const onSubmit = (value) => {
    setLoading(true)

    const tempListFAQ = listFAQ.map((ele, index) => {
      LANG.map(language => {
        ele[`question${language.value}`] = getValues(`question_${index+1}${language.value}`);
        ele[`answer${language.value}`] = getValues(`answer_${index+1}${language.value}`);
      })

      return ele
    })
    const formData = new FormData();
    formData.append("categoryProductId", infoCategoryProduct._id);
    LANG.forEach(ele => {
      formData.append(`title${ele.value}`, value[`title${ele.value}`]);
      formData.append(`breadcrumb${ele.value}`, value[`breadcrumb${ele.value}`]);
      formData.append(`description${ele.value}`, value[`description${ele.value}`]);
    })
    formData.append("childCategory", value.childCategory);

    formData.append("paragraphUK", JSON.stringify(paragraphUK));
    formData.append("paragraphUS", JSON.stringify(paragraphUS));
    formData.append("paragraphFR", JSON.stringify(paragraphFR));
    formData.append("paragraphDE", JSON.stringify(paragraphDE));

    formData.append("pajamasUK", JSON.stringify(pajamasUK));
    formData.append("pajamasUS", JSON.stringify(pajamasUS));
    formData.append("pajamasFR", JSON.stringify(pajamasFR));
    formData.append("pajamasDE", JSON.stringify(pajamasDE));

    formData.append("faq", JSON.stringify(tempListFAQ));

    typeof files === "string" || formData.append("file", files);
    dispatch(updateCategoryProduct({ formData, callBackSubmit }))
  }

  const img = <Box sx={{ position: 'relative' }}>
    <CustomCloseButton onClick={() => setFiles()}>
      <Icon icon='tabler:x' fontSize='1.25rem' />
    </CustomCloseButton>
    {
      typeof files === "string" ?
        <img width={'60%'} className='single-file-image' src={files} />
        :
        <img width={'60%'} key={files?.name} alt={files?.name} className='single-file-image' src={files ? URL.createObjectURL(files) : ''} />
    }
  </Box>

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
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Breadcrumb ${LANG_OBJECT.UK}`}
                      required
                      onChange={onChange}
                      error={Boolean(errors[`breadcrumb${LANG_OBJECT.UK}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`breadcrumb${LANG_OBJECT.UK}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`breadcrumb${LANG_OBJECT.US}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Breadcrumb ${LANG_OBJECT.US}`}
                      required
                      onChange={onChange}
                      error={Boolean(errors[`breadcrumb${LANG_OBJECT.US}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`breadcrumb${LANG_OBJECT.US}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`breadcrumb${LANG_OBJECT.FR}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Breadcrumb ${LANG_OBJECT.FR}`}
                      required
                      onChange={onChange}
                      error={Boolean(errors[`breadcrumb${LANG_OBJECT.FR}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`breadcrumb${LANG_OBJECT.FR}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`breadcrumb${LANG_OBJECT.DE}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Breadcrumb ${LANG_OBJECT.DE}`}
                      required
                      onChange={onChange}
                      error={Boolean(errors[`breadcrumb${LANG_OBJECT.DE}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`breadcrumb${LANG_OBJECT.DE}`] && { helperText: 'This field is required' })}
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
            </Grid>
          </Card>
          <Card sx={{ p: 4, mt: 4, textAlign: 'left' }}>
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
                    label='child Category'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.childCategory)}
                    aria-describedby='validation-basic-select'
                  >
                    {
                      store.data.map(ele => <MenuItem key={ele?.id} value={ele?.id}>{ele?.titleUS}</MenuItem>)
                    }
                  </CustomTextField>
                )}
              />
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
                Update
              </Button>
              <Button variant='tonal' color='secondary' onClick={() => router.replace('/apps/blog-category/')}>
                Cancel
              </Button>
            </Box>
          </Card>
        </form>
      </Grid>
    </Grid>
  )
}

export default ProductCategoryComponent
