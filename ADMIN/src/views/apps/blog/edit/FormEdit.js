// ** MUI Imports
import { Button, Card, CircularProgress, Dialog, DialogContent, Fade, FormControlLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Custom Components Imports
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
import styled from '@emotion/styled'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { forwardRef, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'src/@core/components/icon'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { fetchBlog, updateBlog } from 'src/store/apps/blog'
import { fetchCategoryBlog } from 'src/store/apps/categoryBlog'
import { fetchProduct } from 'src/store/apps/product'
import axios from 'axios'
import PopoverAddContent from '../components/PopoverAddContent'
import UploadImgContent from '../components/UploadImgContent'
import dynamic from 'next/dynamic'
import { LANG_OBJECT } from 'src/constant'
import { useSnackbar } from 'notistack'
import { addTag, fetchTag, updateTag } from 'src/store/apps/tag'
import { fetchEvents } from 'src/store/apps/categoryProduct'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
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

const FormEdit = () => {
  const [files, setFiles] = useState()
  const [loading, setLoading] = useState(false)
  const [valueRecommend, setValueRecommend] = useState([])
  const [filesBanner, setFilesBanner] = useState()

  const [contentUK, setContentUK] = useState('');
  const [contentUS, setContentUS] = useState('');
  const [contentDE, setContentDE] = useState('');
  const [contentFR, setContentFR] = useState('');
  const [tagValue, setTagValue] = useState([])
  const [openDialogCreateTag, setOpenDialogCreateTag] = useState(false);

  // handle tag
  const [newTags, setNewTags] = useState({
    titleUK: '',
    titleUS: '',
    titleFR: '',
    titleDE: '',
  });

  const [errorsTag, setErrorsTag] = useState({
    titleUK: false,
    titleUS: false,
    titleFR: false,
    titleDE: false,
  });

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('Blog updated successfully', {
        duration: 2500
      })
    } else {
      if (data.statusCode == 10705) {
        data.errors.forEach(ele => {
          enqueueSnackbar(`${ele} of blog already exists!`, { variant: 'error' });
        })
      } else {
        enqueueSnackbar(`${data.message}`, { variant: 'error' });
      }
    }
    setLoading(false)
    const anchor = document.querySelector('body')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onSubmit = async (value) => {
    setLoading(true)
    const arrayRecommendPro = valueRecommend.map(ele => ele._id)
    const arrayTagValue = tagValue.map(ele => ele._id)

    const formData = new FormData();
    formData.append("blogId", router.query.id);
    formData.append("titleUK", value.titleUK || '');
    formData.append("titleUS", value.titleUS || '');
    formData.append("titleDE", value.titleDE || '');
    formData.append("titleFR", value.titleFR || '');


    formData.append("handleUrlUK", value.handleUrlUK || '');
    formData.append("handleUrlUS", value.handleUrlUS || '');
    formData.append("handleUrlDE", value.handleUrlDE || '');
    formData.append("handleUrlFR", value.handleUrlFR || '');

    formData.append("metaDescriptionUK", value.metaDescriptionUK || '');
    formData.append("metaDescriptionUS", value.metaDescriptionUS || '');
    formData.append("metaDescriptionDE", value.metaDescriptionDE || '');
    formData.append("metaDescriptionFR", value.metaDescriptionFR || '');

    formData.append("contentUK", JSON.stringify(contentUK) || '');
    formData.append("contentUS", JSON.stringify(contentUS) || '');
    formData.append("contentDE", JSON.stringify(contentDE) || '');
    formData.append("contentFR", JSON.stringify(contentFR) || '');
    formData.append("categoryBlogId", value.blogCategory);
    formData.append("status", value.blogStatus || '');
    formData.append("recommendProduct", JSON.stringify(arrayRecommendPro));
    typeof files === "string" || formData.append("img", files);
    typeof filesBanner === "string" || formData.append('imgBanner', filesBanner);
    formData.append("tags", JSON.stringify(arrayTagValue) || '');

    dispatch(updateBlog({ formData, callBackSubmit }))

  }

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    blogStatus: '',
    blogCategory: '',
    productType: '',
    title: '',
    lastName: '',
    password: '',
    textarea: '',
    firstName: '',
    checkbox: false
  })
  const dispatch = useDispatch()

  const store = useSelector(state => state.categoryBlog)
  const storeCategoryProduct = useSelector(state => state.categoryProduct)
  const storeBlog = useSelector(state => state.blog)
  const storeTag = useSelector(state => state.tag)

  useEffect(() => {
    dispatch(fetchCategoryBlog())
    dispatch(fetchEvents())
    dispatch(fetchBlog())
    dispatch(fetchTag())
  }, [])

  useEffect(() => {
    if (storeBlog.data.length > 0) {
      const data = storeBlog.data.find(ele => ele._id == router.query.id)

      const listTagSelected = [];
      storeTag.data.forEach(ele => {
        if (data?.tags?.includes(ele._id)) {
          listTagSelected.push(ele)
        }
      })

      const listRecommend = [];
      storeCategoryProduct.data.forEach(ele => {
        if (data?.recommendProduct?.includes(ele._id)) {
          listRecommend.push(ele)
        }
      })

      setValue('blogCategory', data?.categoryBlogId?._id)
      setContentUK(data?.contentUK || '')
      setContentUS(data?.contentUS || '')
      setContentFR(data?.contentFR || '')
      setContentDE(data?.contentDE || '')
      setValue('blogStatus', data?.status || '')
      setValue('tags', data?.tags || '')

      setValue('titleUK', data?.titleUK || '')
      setValue('titleUS', data?.titleUS || '')
      setValue('titleFR', data?.titleFR || '')
      setValue('titleDE', data?.titleDE || '')

      setValue('handleUrlUK', data?.handleUrlUK || '')
      setValue('handleUrlUS', data?.handleUrlUS || '')
      setValue('handleUrlFR', data?.handleUrlFR || '')
      setValue('handleUrlDE', data?.handleUrlDE || '')

      setValue('metaDescriptionUK', data?.metaDescriptionUK || '')
      setValue('metaDescriptionUS', data?.metaDescriptionUS || '')
      setValue('metaDescriptionFR', data?.metaDescriptionFR || '')
      setValue('metaDescriptionDE', data?.metaDescriptionDE || '')

      setValueRecommend(listRecommend)
      setFiles(data?.img)
      setFilesBanner(data?.imgBanner)
      setTagValue(listTagSelected)
    }
  }, [storeBlog, storeTag, storeCategoryProduct, store, router.query.id])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(Object.assign(acceptedFiles[0]))
    }
  })

  const handleBannerImg = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFilesBanner(Object.assign(acceptedFiles[0]))
    }
  })

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

  const imgBanner = <Box sx={{ position: 'relative' }}>
    <CustomCloseButton onClick={() => setFilesBanner()}>
      <Icon icon='tabler:x' fontSize='1.25rem' />
    </CustomCloseButton>
    {
      typeof filesBanner === "string" ?
        <img width={'100%'} className='single-file-image' src={filesBanner} />
        :
        <img width={'100%'} key={filesBanner?.name} alt={filesBanner?.name} className='single-file-image' src={filesBanner ? URL.createObjectURL(filesBanner) : ''} />
    }
  </Box>

  const handleChangeTag = (event, newValue) => {
    setTagValue(newValue)
  }

  const callBackSubmitNewTag = (data) => {
    if (data.success) {
      toast.success('New Tag created successfully', {
        duration: 2000
      })
      setOpenDialogCreateTag(false)
      setTagValue([])
      setNewTags({
        titleUK: '',
        titleUS: '',
        titleFR: '',
        titleDE: '',
      })
    } else {
      if (data.statusCode == 10905) {
        data.errors.forEach(ele => {
          enqueueSnackbar(`${ele} of tag already exists!`, { variant: 'error' });
        })
      } else {
        enqueueSnackbar(`${data.message}`, { variant: 'error' });
      }
    }
    setLoading(false)
  }

  const handleSubmitNewTag = () => {
    let tempErrorTag = {}
    if (!newTags.titleUK) {
      tempErrorTag.titleUK = true
    }
    if (!newTags.titleUS) {
      tempErrorTag.titleUS = true
    }
    if (!newTags.titleFR) {
      tempErrorTag.titleFR = true
    }
    if (!newTags.titleDE) {
      tempErrorTag.titleDE = true
    }

    if (tempErrorTag.titleUK || tempErrorTag.titleUS || tempErrorTag.titleFR || tempErrorTag.titleDE) {
      setErrorsTag(tempErrorTag)
    } else {
      let formData = newTags

      dispatch(addTag({ formData, callBackSubmit: callBackSubmitNewTag }))
    }
  }

  const handleChange = (event, newValue) => {
    setValueRecommend(newValue)
  }

  const handleChangeContentUK = (content, delta, source, editor) => {
    setContentUK(content);
  };

  const handleChangeContentUS = (content, delta, source, editor) => {
    setContentUS(content);
  };

  const handleChangeContentDE = (content, delta, source, editor) => {
    setContentDE(content);
  };

  const handleChangeContentFR = (content, delta, source, editor) => {
    setContentFR(content);
  };

  return (
    <>
      <Grid container xs={12}>
        <Grid item xs={4}>
          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Handle URL
            </Typography>
            <Controller
              name='handleUrlUK'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Handle Url UK'
                  onChange={onChange}
                  placeholder='Enter Handle Url UK'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
            <Controller
              name='handleUrlUS'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Handle Url US'
                  required
                  onChange={onChange}
                  placeholder='Enter Handle Url US'
                  error={Boolean(errors.handleUrlUS)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.handleUrlUS && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='handleUrlFR'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Handle Url FR'
                  onChange={onChange}
                  placeholder='Enter Handle Url FR'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
            <Controller
              name='handleUrlDE'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Handle Url DE'
                  onChange={onChange}
                  placeholder='Enter Handle Url DE'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
          </Card>
          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Meta description
            </Typography>
            <Controller
              name='metaDescriptionUK'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Meta Description UK'
                  onChange={onChange}
                  placeholder='Enter Meta Description UK'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
            <Controller
              name='metaDescriptionUS'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Meta Description US'
                  onChange={onChange}
                  placeholder='Enter Meta Description US'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
            <Controller
              name='metaDescriptionFR'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Meta Description FR'
                  onChange={onChange}
                  placeholder='Enter Meta Description FR'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
            <Controller
              name='metaDescriptionDE'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Meta Description DE'
                  onChange={onChange}
                  placeholder='Enter Meta Description DE'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
          </Card>
          <Card sx={{ p: 4 }}>
            <Controller
              name='blogStatus'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Blog Status'
                  SelectProps={{
                    value: value || "",
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.blogStatus)}
                  aria-describedby='validation-basic-select'
                  {...(errors.blogStatus && { helperText: 'This field is required' })}
                >
                  <MenuItem value='public'>Public</MenuItem>
                  <MenuItem value='private'>Private</MenuItem>
                </CustomTextField>
              )}
            />
            <Controller
              name='blogCategory'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mt: 4 }}
                  select
                  fullWidth
                  defaultValue=''
                  label='Blog Category'
                  SelectProps={{
                    value: value || "",
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.blogCategory)}
                  aria-describedby='validation-basic-select'
                  {...(errors.blogCategory && { helperText: 'This field is required' })}
                >
                  {
                    store.data.map(ele => <MenuItem key={ele._id} value={ele._id}>{ele.titleUS}</MenuItem>)
                  }
                </CustomTextField>
              )}
            />
            <CustomAutocomplete
              multiple
              value={valueRecommend}
              onChange={handleChange}
              sx={{ width: '100%', mt: 4 }}
              options={storeCategoryProduct.data}
              filterSelectedOptions
              id='autocomplete-multiple-outlined'
              getOptionLabel={option => option.titleUS || ''}
              renderInput={params => <CustomTextField {...params} label='Recommend Category Product' />}
            />
            <CustomAutocomplete
              multiple
              value={tagValue}
              onChange={handleChangeTag}
              sx={{ width: '100%', mt: 4 }}
              options={storeTag.data}
              filterSelectedOptions
              id='autocomplete-multiple-outlined'
              getOptionLabel={option => option.titleUS || ''}
              renderInput={params => <CustomTextField {...params} label='Tags' placeholder='Tags' />}
            />
            <Button variant='outlined' sx={{ mt: 3 }} onClick={() => setOpenDialogCreateTag(true)}>
              Create Tag
            </Button>
          </Card>
          <Card sx={{ p: 4, mt: 4 }}>
            <Box>
              <Typography>
                Thumbnail Image
              </Typography>
              {
                files ? img :
                  <Button  {...getRootProps({ className: 'dropzone' })} variant='contained' sx={{ mr: 1, mt: 2 }}>
                    <input {...getInputProps()} />
                    Upload Thumbnail
                  </Button>
              }
            </Box>
          </Card>
          <Card sx={{ p: 4, mt: 4 }}>
            <Box>
              <Typography>
                Banner  Image
              </Typography>
              {
                filesBanner ? imgBanner :
                  <Button  {...handleBannerImg.getRootProps({ className: 'dropzone' })} variant='contained' sx={{ mr: 1, mt: 2 }}>
                    <input {...handleBannerImg.getInputProps()} />
                    Upload Banner
                  </Button>
              }
            </Box>
          </Card>
        </Grid>
        <Grid item xs={8} sx={{ pl: 5, textAlign: 'right' }}>
          <Card sx={{ p: 4 }}>
            <Grid item xs={12} sm={12}>
              <Controller
                name={`title${LANG_OBJECT.UK}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    sx={{ mb: 4 }}
                    fullWidth
                    value={value}
                    label={`Title ${LANG_OBJECT.UK}`}
                    onChange={onChange}
                    aria-describedby='validation-basic-first-name'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name={`title${LANG_OBJECT.US}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    sx={{ mb: 4 }}
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
            <Grid item xs={12} sm={12}>
              <Controller
                name={`title${LANG_OBJECT.FR}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    sx={{ mb: 4 }}
                    fullWidth
                    value={value}
                    label={`Title ${LANG_OBJECT.FR}`}
                    onChange={onChange}
                    aria-describedby='validation-basic-first-name'
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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
          </Card>
          <Card sx={{ p: 4, mt: 4, textAlign: 'left' }}>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Content UK
              </Typography>
              <QuillNoSSRWrapper value={contentUK} onChange={handleChangeContentUK} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Content US
              </Typography>
              <QuillNoSSRWrapper value={contentUS} onChange={handleChangeContentUS} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Content DE
              </Typography>
              <QuillNoSSRWrapper value={contentDE} onChange={handleChangeContentDE} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Content FR
              </Typography>
              <QuillNoSSRWrapper value={contentFR} onChange={handleChangeContentFR} modules={modules} formats={formats} theme="snow" />
            </Box>
          </Card>
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', mt: 3 }}>
          <Button variant='tonal' color='secondary' sx={{ mr: 3 }} onClick={() => router.replace('/apps/blog/')}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSubmit(onSubmit)}>
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
        </Box>
      </Grid>
      <Dialog
        fullWidth
        open={openDialogCreateTag}
        scroll='body'
        maxWidth='sm'
        onClose={() => setOpenDialogCreateTag(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setOpenDialogCreateTag(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
        >
          <CustomCloseButton onClick={() => setOpenDialogCreateTag(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h2' sx={{ mb: 3 }}>
              Create New Tags
            </Typography>
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={newTags.titleUK}
              label={`Tag UK`}
              onChange={(e) => {
                if (e.target.value && errorsTag.titleUK) {
                  setErrorsTag({ ...errorsTag, titleUK: false })
                }
                let tempNewTags = { ...newTags }
                setNewTags({ ...tempNewTags, titleUK: e.target.value })
              }}
              aria-describedby='validation-basic-first-name'
            />
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={newTags.titleUS}
              label={`Tag US`}
              onChange={(e) => {
                if (e.target.value && errorsTag.titleUS) {
                  setErrorsTag({ ...errorsTag, titleUS: false })
                }
                let tempNewTags = { ...newTags }
                setNewTags({ ...tempNewTags, titleUS: e.target.value })
              }}
              aria-describedby='validation-basic-first-name'
            />
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={newTags.titleFR}
              label={`Tag FR`}
              onChange={(e) => {
                if (e.target.value && errorsTag.titleFR) {
                  setErrorsTag({ ...errorsTag, titleFR: false })
                }
                let tempNewTags = { ...newTags }
                setNewTags({ ...tempNewTags, titleFR: e.target.value })
              }}
              aria-describedby='validation-basic-first-name'
            />
            <CustomTextField
              sx={{ mb: 4 }}
              fullWidth
              value={newTags.titleDE}
              label={`Tag DE`}
              onChange={(e) => {
                if (e.target.value && errorsTag.titleDE) {
                  setErrorsTag({ ...errorsTag, titleDE: false })
                }
                let tempNewTags = { ...newTags }
                setNewTags({ ...tempNewTags, titleDE: e.target.value })
              }}
              aria-describedby='validation-basic-first-name'
            />
          </Box>
        </DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mb: 3, py: 3 }}>
          <Button variant='tonal' color='secondary' onClick={() => setOpenDialogCreateTag(false)}>
            Cancel
          </Button>
          <Button sx={{ ml: 20 }} variant='contained' onClick={handleSubmitNewTag}>
            Create Tag
          </Button>
        </Box>
      </Dialog>
    </>
  )
}

export default FormEdit
