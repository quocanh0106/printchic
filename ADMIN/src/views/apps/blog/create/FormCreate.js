// ** MUI Imports
import { Button, Card, CircularProgress, Dialog, DialogContent, Fade, FormControlLabel, List, ListItem, MenuItem, Radio, RadioGroup, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import IconButton from '@mui/material/IconButton'

// ** Custom Components Imports
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Fragment, forwardRef, useEffect, useState } from 'react'
import { Box } from '@mui/system'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import Icon from 'src/@core/components/icon'
import styled from '@emotion/styled'
import { DataGrid } from '@mui/x-data-grid'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from 'src/store/apps/categoryProduct'
import { addProduct, fetchProduct } from 'src/store/apps/product'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { fetchCategoryBlog } from 'src/store/apps/categoryBlog'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { top100Films } from 'src/@fake-db/autocomplete'
import { addBlog } from 'src/store/apps/blog'
import PopoverAddContent from '../components/PopoverAddContent'
import UploadImgContent from '../components/UploadImgContent'

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

let idItemsContent = 2;

const FormCreate = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [contentType, setContentType] = useState('text')
  const [valueRecommend, setValueRecommend] = useState([])
  const [listItemsContent, setListItemContent] = useState([{
    id: 1,
    type: 'title',
    value: '',

  }])
  console.log('listItemsContent',listItemsContent)
  const router = useRouter()

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('New Blog created successfully', {
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

  const onSubmit = (value) => {
    setLoading(true)

    const arrayRecommendPro = valueRecommend.map(ele => ele._id)

    const formData = new FormData();
    formData.append("title", value.title);
    // formData.append("content", value.content);
    formData.append("categoryBlogId", value.blogCategory);
    formData.append("status", value.blogStatus);
    formData.append("recommendProduct", JSON.stringify(arrayRecommendPro));
    formData.append("tags", value.tags);
    formData.append('file', files[0]);

    dispatch(addBlog({ formData, callBackSubmit }))

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

  useEffect(() => {
    dispatch(fetchCategoryBlog())
    dispatch(fetchProduct())
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const img = files.map(file => (
    <Box key={file.name} sx={{ position: 'relative' }}>
      <CustomCloseButton onClick={() => setFiles([])}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <img width={'100%'} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
    </Box>
  ))

  const handleChange = (event, newValue) => {
    setValueRecommend(newValue)
  }

  const handleAddEleContent = (type, idToFind) => {
    const tempListItemsContent = JSON.parse(JSON.stringify(listItemsContent));
    const index = tempListItemsContent.findIndex(obj => obj.id === idToFind);

    if (index !== -1) {
      // Insert the new object after the found object
      tempListItemsContent.splice(index + 1, 0, {
        id: idItemsContent,
        type: type,
        value: '',

      });
      idItemsContent++
      setListItemContent(tempListItemsContent)
      console.log('tempListItemsContent', tempListItemsContent)
    } else {
      console.log('Object not found');
    }

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
                  defaultValue=''
                  label='Blog Status'
                  SelectProps={{
                    value: value,
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
                    value: value,
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
                files.length ? img :
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
            <Grid item xs={12} sm={6}>
              <RadioGroup row aria-label='controlled' name='controlled' value={contentType} onChange={(e) => setContentType(e.target.value)}>
                <FormControlLabel value='text' control={<Radio />} label='text' sx={{ pr: 4 }} />
                <FormControlLabel value='html' control={<Radio />} label='html' />
              </RadioGroup>
            </Grid>
            {
              listItemsContent.map(ele => <Box ket={ele.id} sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <PopoverAddContent handleAddEleContent={handleAddEleContent} idContent={ele.id} />
                {
                  ele.type == 'title' &&
                  <CustomTextField
                    fullWidth
                    sx={{ mt: 4 }}
                    label={ele?.type}
                    required
                    aria-describedby='validation-basic-first-name'
                  />
                }
                {
                  ele.type == 'text' &&
                  <CustomTextField
                    type='textarea'
                    rows={6}
                    multiline
                    fullWidth
                    sx={{ mt: 4 }}
                    label={ele?.type}
                    required
                    aria-describedby='validation-basic-first-name'
                  />
                }
                {
                  ele.type == 'img' &&
                  <UploadImgContent id={ele.id} listItemsContent={listItemsContent} setListItemContent={setListItemContent}/>
                }
                <Icon icon='tabler:trash' fontSize={30} onClick={() => removeVariant(el.index)} />
              </Box>)
            }
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
            Create
          </Button>
        </Box>
      </Grid>
    </>
  )
}

export default FormCreate
