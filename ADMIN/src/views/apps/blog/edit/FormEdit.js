// ** MUI Imports
import { Button, Card, CircularProgress, FormControlLabel, MenuItem, Radio, RadioGroup, Typography } from '@mui/material'
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
import { useEffect, useState } from 'react'
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

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
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
  const [content, setContent] = useState('');

  const router = useRouter()

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('Blog updated successfully', {
        duration: 2000
      })
      router.replace('/apps/blog/')
    } else {
      toast.error(data.message, {
        duration: 2000
      })
    }
    setLoading(false)
  }

  const onSubmit = async (value) => {
    setLoading(true)
    const arrayRecommendPro = valueRecommend.map(ele => ele._id)

    const formData = new FormData();
    formData.append("blogId", router.query.id);
    formData.append("title", value.title);
    formData.append("content", JSON.stringify(content));
    formData.append("categoryBlogId", value.blogCategory);
    formData.append("status", value.blogStatus);
    formData.append("recommendProduct", JSON.stringify(arrayRecommendPro));
    formData.append("tags", value.tags);
    typeof files === "string" || formData.append("file", files);

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
  const storeProduct = useSelector(state => state.product)
  const storeBlog = useSelector(state => state.blog)

  useEffect(() => {
    dispatch(fetchCategoryBlog())
    dispatch(fetchProduct())
    dispatch(fetchBlog())
  }, [])

  useEffect(() => {
    if (storeBlog.data.length > 0) {
      const data = storeBlog.data.find(ele => ele._id == router.query.id)

      const listRecommend = [];
      storeProduct.data.forEach(ele => {
        if (data?.recommendProduct?.includes(ele._id)) {
          listRecommend.push(ele)
        }
      })

      setValue('blogCategory', data?.categoryBlogId?._id)
      setContent(JSON.parse(data?.content))
      setValue('blogStatus', data?.status)
      setValue('tags', data?.tags)
      setValue('title', data?.title)
      setValueRecommend(listRecommend)
      setFiles(data?.img)
    }
  }, [storeBlog, storeProduct, store, router.query.id])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(Object.assign(acceptedFiles[0]))
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

  const handleChange = (event, newValue) => {
    setValueRecommend(newValue)
  }

  const handleChangeContent = (content, delta, source, editor) => {
    console.log('content', content)
    setContent(content);
    
    // You can also get the plain text content
    // const text = editor.getText();
    // Or get the contents in a different format
    // const contents = editor.getContents();
  }

  return (
    <>
      <Grid container xs={12}>
        <Grid item xs={4}>
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
                    store.data.map(ele => <MenuItem key={ele._id} value={ele._id}>{ele.title}</MenuItem>)
                  }
                </CustomTextField>
              )}
            />
            <CustomAutocomplete
              multiple
              value={valueRecommend}
              onChange={handleChange}
              sx={{ width: '100%', mt: 4 }}
              options={storeProduct.data}
              filterSelectedOptions
              id='autocomplete-multiple-outlined'
              getOptionLabel={option => option.title || ''}
              renderInput={params => <CustomTextField {...params} label='filterSelectedOptions' placeholder='Products' />}
            />
            <Controller
              name='tags'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  sx={{ mt: 4 }}
                  value={value}
                  label='tags'
                  required
                  onChange={onChange}
                  placeholder='tags'
                  error={Boolean(errors.tags)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.tags && { helperText: 'This field is required' })}
                />
              )}
            />
          </Card>
          <Card sx={{ p: 4, mt: 4 }}>
            <Box>
              <Typography>
                Thumnail Image
              </Typography>
              {
                files ? img :
                  <Button  {...getRootProps({ className: 'dropzone' })} variant='contained' sx={{ mr: 1 }}>
                    <input {...getInputProps()} />
                    Upload
                  </Button>
              }
            </Box>
          </Card>
        </Grid>
        <Grid item xs={8} sx={{ pl: 5, textAlign: 'right' }}>
          <Card sx={{ p: 4 }}>
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
                  placeholder='Title'
                  error={Boolean(errors.title)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.title && { helperText: 'This field is required' })}
                />
              )}
            />
          </Card>

          <Card sx={{ p: 4, mt: 4, textAlign: 'left' }}>
            <Typography variant='h4'>
              Content
            </Typography>
            <QuillNoSSRWrapper value={content} onChange={handleChangeContent} modules={modules} formats={formats} theme="snow" />
          </Card>
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', mt: 3 }}>
          <Button variant='tonal' color='secondary' sx={{ mr: 3 }} onClick={() => router.replace('/apps/product/')}>
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
    </>
  )
}

export default FormEdit
