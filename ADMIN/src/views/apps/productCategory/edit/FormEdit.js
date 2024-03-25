
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
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'src/@core/components/icon'
import { LANG, LANG_OBJECT } from 'src/constant'
import { fetchEvents, fetchInfoCategoryProduct, updateCategoryProduct } from 'src/store/apps/categoryProduct'
import SunEditorWrapper from 'src/views/components/RichText/SunEditorWrapper'

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
  const { infoCategoryProduct } = useSelector(state => state.categoryProduct)
  const store = useSelector(state => state.categoryProduct)
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
    getValues,
    setValue,
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

  const handleChangePajamasUK = (content) => {
    setPajamasUK(content);
  };

  const handleChangePajamasUS = (content) => {
    setPajamasUS(content);
  };

  const handleChangePajamasDE = (content) => {
    setPajamasDE(content);
  };

  const handleChangePajamasFR = (content) => {
    setPajamasFR(content);
  };

  const handleChangeParagraphUK = (content) => {
    setParagraphUK(content);
  };

  const handleChangeParagraphUS = (content) => {
    setParagraphUS(content);
  };

  const handleChangeParagraphDE = (content) => {
    setParagraphDE(content);
  };

  const handleChangeParagraphFR = (content) => {
    setParagraphFR(content);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchInfoCategoryProduct({ categoryProductId: id }))
      dispatch(fetchEvents())
    }
  }, [id])

  useEffect(() => {
    LANG.forEach(ele => {
      setValue(`title${ele.value}`, infoCategoryProduct?.[`title${ele.value}`] || '');
      setValue(`breadcrumb${ele.value}`, infoCategoryProduct?.[`breadcrumb${ele.value}`] || '');
      setValue(`description${ele.value}`, infoCategoryProduct?.[`description${ele.value}`] || '');
      setValue(`handleUrl${ele.value}`, infoCategoryProduct?.[`handleUrl${ele.value}`] || '');
    })
    setValue('description', infoCategoryProduct?.description || '')
    setValue('childCategory', infoCategoryProduct.childCategory)
    infoCategoryProduct?.faq && setValue('faqs', JSON.parse(infoCategoryProduct?.faq))
    setFiles(infoCategoryProduct?.bannerImg)

    infoCategoryProduct?.pajamasUK && setPajamasUK(infoCategoryProduct?.pajamasUK || '')
    infoCategoryProduct?.pajamasUS && setPajamasUS(infoCategoryProduct?.pajamasUS || '')
    infoCategoryProduct?.pajamasFR && setPajamasFR(infoCategoryProduct?.pajamasFR || '')
    infoCategoryProduct?.pajamasDE && setPajamasDE(infoCategoryProduct?.pajamasDE || '')

    setValue('metaTitleUK', infoCategoryProduct?.metaTitleUK || '')
    setValue('metaTitleUS', infoCategoryProduct?.metaTitleUS || '')
    setValue('metaTitleFR', infoCategoryProduct?.metaTitleFR || '')
    setValue('metaTitleDE', infoCategoryProduct?.metaTitleDE || '')

    infoCategoryProduct?.paragraphUK && setParagraphUK(infoCategoryProduct?.paragraphUK || '')
    infoCategoryProduct?.paragraphUS && setParagraphUS(infoCategoryProduct?.paragraphUS || '')
    infoCategoryProduct?.paragraphFR && setParagraphFR(infoCategoryProduct?.paragraphFR || '')
    infoCategoryProduct?.paragraphDE && setParagraphDE(infoCategoryProduct?.paragraphDE || '')

  }, [infoCategoryProduct, id])

  const callBackSubmit = (data) => {
    setLoading(false)
    if (data.success) {
      toast.success('Category Product updated successfully', {
        duration: 3000
      })
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
    const anchor = document.querySelector('body')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onSubmit = (value) => {
    setLoading(true)

    const formData = new FormData();
    formData.append("categoryProductId", infoCategoryProduct._id);
    LANG.forEach(ele => {
      formData.append(`title${ele.value}`, value[`title${ele.value}`] || '');
      formData.append(`breadcrumb${ele.value}`, value[`breadcrumb${ele.value}`] || '');
      formData.append(`description${ele.value}`, value[`description${ele.value}`] || '');
      formData.append(`handleUrl${ele.value}`, value[`handleUrl${ele.value}`] || '');
    })
    formData.append("childCategory", value.childCategory);

    formData.append("paragraphUK", paragraphUK || '');
    formData.append("paragraphUS", paragraphUS || '');
    formData.append("paragraphFR", paragraphFR || '');
    formData.append("paragraphDE", paragraphDE || '');

    formData.append("metaTitleUK", value.metaTitleUK || '');
    formData.append("metaTitleUS", value.metaTitleUS || '');
    formData.append("metaTitleFR", value.metaTitleFR || '');
    formData.append("metaTitleDE", value.metaTitleDE || '');

    formData.append("pajamasUK", pajamasUK || '');
    formData.append("pajamasUS", pajamasUS || '');
    formData.append("pajamasFR", pajamasFR || '');
    formData.append("pajamasDE", pajamasDE || '');
    formData.append("faq", JSON.stringify(value.faqs));

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

          <Card sx={{ p: 4, mb: 4 }}>
            <Grid container xs={12} sm={12} spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`metaTitle${LANG_OBJECT.UK}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label={`Meta Title  ${LANG_OBJECT.UK}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`metaTitle${LANG_OBJECT.US}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label={`Meta Title  ${LANG_OBJECT.US}`}
                      required
                      onChange={onChange}
                      error={Boolean(errors[`metaTitle${LANG_OBJECT.US}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`metaTitle${LANG_OBJECT.US}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`metaTitle${LANG_OBJECT.FR}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label={`Meta Title  ${LANG_OBJECT.FR}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name={`metaTitle${LANG_OBJECT.DE}`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label={`Meta Title ${LANG_OBJECT.DE}`}
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
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
                Paragraph UK
              </Typography>
              <SunEditorWrapper value={paragraphUK} onChange={handleChangeParagraphUK} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Paragraph US
              </Typography>
              <SunEditorWrapper value={paragraphUS} onChange={handleChangeParagraphUS} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Paragraph DE
              </Typography>
              <SunEditorWrapper value={paragraphDE} onChange={handleChangeParagraphDE} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Paragraph FR
              </Typography>
              <SunEditorWrapper value={paragraphFR} onChange={handleChangeParagraphFR} />
            </Box>
          </Card>
          <Card sx={{ p: 4, mt: 4, textAlign: 'left' }}>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Pajamas UK
              </Typography>
              <SunEditorWrapper value={pajamasUK} onChange={handleChangePajamasUK} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Pajamas US
              </Typography>
              <SunEditorWrapper value={pajamasUS} onChange={handleChangePajamasUS} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Pajamas DE
              </Typography>
              <SunEditorWrapper value={pajamasDE} onChange={handleChangePajamasDE} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Pajamas FR
              </Typography>
              <SunEditorWrapper value={pajamasFR} onChange={handleChangePajamasFR} />
            </Box>
          </Card>
          <Card sx={{ p: 4, my: 4, pb: 6 }}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='childCategory'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue={infoCategoryProduct.childCategory}
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
                      store.data.filter(category => category.id != id).map(ele => <MenuItem key={ele._id} value={ele._id}>{ele?.titleUS}</MenuItem>)
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
