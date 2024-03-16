
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

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports

// ** Util Import

// ** Styled Component Imports

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Icon Imports
import { Card, CircularProgress, MenuItem } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'src/@core/components/icon'
import { LANG, LANG_OBJECT } from 'src/constant'
import { addCategoryBlog, fetchInfoCategoryBlog, updateCategoryBlog } from 'src/store/apps/categoryBlog'
import { fetchEvents, fetchInfoCategoryProduct, updateCategoryProduct } from 'src/store/apps/categoryProduct'

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

const CustomCloseButtonEdit = styled(IconButton)(({ theme }) => ({
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

const ProductCategoryComponent = () => {
  const router = useRouter()
  const store = useSelector(state => state.categoryProduct)
  const { infoCategoryProduct } = useSelector(state => state.categoryProduct)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState()
  const [loading, setLoading] = useState(false)
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
    setError,
    clearErrors,
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
    dispatch(fetchEvents())
    dispatch(fetchInfoCategoryProduct({ categoryProductId: id }))
  }, [id])

  useEffect(() => {
    LANG.forEach(ele => {
      setValue(`title${ele.value}`, infoCategoryProduct?.[`title${ele.value}`]);
      setValue(`description${ele.value}`, infoCategoryProduct?.[`description${ele.value}`]);
    })
    setValue('description', infoCategoryProduct?.description)
    setFiles(infoCategoryProduct?.bannerImg)
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
    const formData = new FormData();
    formData.append("categoryProductId", infoCategoryProduct._id);
    LANG.forEach(ele => {
      formData.append(`title${ele.value}`, value[`title${ele.value}`]);
      formData.append(`description${ele.value}`, value[`description${ele.value}`]);
    })
    formData.append("parentCategory", value.parentCategory);
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
          <Card sx={{ p: 4, mb: 4, pb: 6 }}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='parentCategory'
                control={control}
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
                    error={Boolean(errors.parentCategory)}
                    aria-describedby='validation-basic-select'
                  >
                    {
                      store.data.map(ele => <MenuItem key={ele?._id} value={ele?._id}>{ele?.titleUS}</MenuItem>)
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
