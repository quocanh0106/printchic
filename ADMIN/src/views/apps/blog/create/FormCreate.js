// ** MUI Imports
import { Button, Card, CircularProgress, Dialog, DialogContent, Fade, List, ListItem, MenuItem, Typography } from '@mui/material'
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

let count = 0
let countOption = 0

const FormCreate = () => {
  const [listVariant, setListVariant] = useState([]);
  const [tempListVariant, setTempListVariant] = useState([]);
  const [listOPtionVariant, setListOptionVariant] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [column, setColumn] = useState([]);
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('New product created successfully', {
        duration: 2000
      })
      router.replace('/apps/product/')
    } else {
      toast.error(data.message, {
        duration: 2000
      })
    }
    setLoading(false)
  }

  const onSubmit = (value) => {
    // setLoading(true)
    const variant = listOPtionVariant.map((ele) => {
      ele.price = value[`price-${ele.id}`]
      ele.sku = value[`sku-${ele.id}`]
      ele.stock = value[`stock-${ele.id}`]

      return ele
    })
    console.log('variant', typeof variant)
    console.log('files', files)
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("handleUrl", value.handleUrl);
    formData.append("metaDescription", value.metaDescription);
    formData.append("status", value.blogStatus);
    formData.append("description", value.description);
    formData.append("currency", value.currency);
    formData.append("categoryProductId", value.blogCategory);
    formData.append("type", value.productType);
    formData.append("variants", JSON.stringify(variant));
    formData.append('files', files[0]);

    dispatch(addProduct({ formData, callBackSubmit }))

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

  console.log('errors', errors)

  const handleAddVariant = () => {
    let tempListVariant = JSON.parse(JSON.stringify(listVariant))
    tempListVariant.push({ index: count + 1, option: [{ index: countOption + 1 }] })
    setListVariant(tempListVariant)
    count++
    countOption++
  }

  const handleAddOptionVariant = (indexVariant) => {
    let tempListVariant = JSON.parse(JSON.stringify(listVariant))
    tempListVariant.forEach((variant) => {
      if (variant.index === indexVariant) {
        variant.option.push({ index: countOption + 1 })
      }
    })
    countOption++
    setListVariant(tempListVariant)
  }

  const removeVariant = (indexVariant) => {
    const tempListVariant = listVariant.filter(variant => {
      if (variant.index != indexVariant) {
        return variant
      }
    })
    setListVariant(tempListVariant)
  }

  const getListColumn = () => {
    let listColumnOptions = [];
    listVariant.forEach((variant, index) => {
      listColumnOptions.push({
        flex: 0.2,
        field: `nameVariant_${index + 1}`,
        minWidth: 170,
        headerName: `${getValues(`nameVariant${variant.index}`)}`,
        renderCell: ({ row }) => {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                {row[`nameVariant_${index + 1}`]}
              </Typography>
            </Box>
          )
        }
      },)
    })
    listColumnOptions.push({
      flex: 0.2,
      field: 'sku',
      minWidth: 170,
      headerName: 'SKU',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`sku-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  required
                  onChange={onChange}
                  placeholder='SKU'
                  error={Boolean(errors[`sku-${row.id}`])}
                  aria-describedby='validation-basic-first-name'
                  {...(errors[`sku-${row.id}`] && { helperText: 'This field is required' })}
                />
              )}
            />
          </Box>
        )
      }
    },)
    listColumnOptions.push({
      flex: 0.2,
      field: 'stock',
      minWidth: 170,
      headerName: 'STOCK',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`stock-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  required
                  onChange={onChange}
                  placeholder='STOCK'
                  error={Boolean(errors[`stock-${row.id}`])}
                  aria-describedby='validation-basic-first-name'
                  {...(errors[`stock-${row.id}`] && { helperText: 'This field is required' })}
                />
              )}
            />
          </Box>
        )
      }
    },)
    listColumnOptions.push({
      flex: 0.2,
      field: 'price',
      minWidth: 170,
      headerName: 'Price',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`price-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  required
                  onChange={onChange}
                  placeholder='Price'
                  error={Boolean(errors[`price-${row.id}`])}
                  aria-describedby='validation-basic-first-name'
                  {...(errors[`price-${row.id}`] && { helperText: 'This field is required' })}
                />
              )}
            />
          </Box>
        )
      }
    },)
    console.log('listColumnOptions', listColumnOptions)
    setColumn(listColumnOptions)
  }

  const getListVariant = () => {
    if (JSON.stringify(listVariant) == JSON.stringify(tempListVariant)) {
      setOpenDialog(true)
    } else {
      let idCount = 1;
      let listVariantOptions = []
      if (listVariant.length === 1) {
        listVariant.forEach((variant) => {
          variant.option.forEach((option) => {
            const nameOption_1 = `${getValues(`nameVariant${variant.index}`)}`
            const nameVariant_1 = `${getValues(`nameOption-${variant.index}-${option.index}`)}`
            listVariantOptions.push({
              id: idCount,
              nameOption_1,
              nameVariant_1,
              sku: null,
              price: 0,
              stock: 0
            })
            idCount = idCount + 1
          })
        })
      } else if (listVariant.length === 2) {
        listVariant[0].option.forEach((option) => {
          listVariant[1].option.forEach((option2) => {
            const nameOption_1 = `${getValues(`nameVariant${listVariant[0].index}`)}`
            const nameOption_2 = `${getValues(`nameVariant${listVariant[1].index}`)}`
            const nameVariant_1 = `${getValues(`nameOption-${listVariant[0].index}-${option.index}`)}`
            const nameVariant_2 = `${getValues(`nameOption-${listVariant[1].index}-${option2.index}`)}`
            listVariantOptions.push({
              id: idCount,
              nameOption_1,
              nameOption_2,
              nameVariant_1,
              nameVariant_2,
              sku: null,
              price: 0,
              stock: 0
            })
            idCount = idCount + 1
          })
        })
      } else if (listVariant.length === 3) {
        listVariant[0].option.forEach((option) => {
          listVariant[1].option.forEach((option2) => {
            listVariant[2].option.forEach((option3) => {
              const nameOption_1 = `${getValues(`nameVariant${listVariant[0].index}`)}`
              const nameOption_2 = `${getValues(`nameVariant${listVariant[1].index}`)}`
              const nameOption_3 = `${getValues(`nameVariant${listVariant[2].index}`)}`

              const nameVariant_1 = `${getValues(`nameOption-${listVariant[0].index}-${option.index}`)}`
              const nameVariant_2 = `${getValues(`nameOption-${listVariant[1].index}-${option2.index}`)}`
              const nameVariant_3 = `${getValues(`nameOption-${listVariant[2].index}-${option3.index}`)}`
              listVariantOptions.push({
                id: idCount,
                nameOption_1,
                nameOption_2,
                nameOption_3,
                nameVariant_1,
                nameVariant_2,
                nameVariant_3,
                sku: null,
                price: 0,
                stock: 0
              })
              idCount = idCount + 1
            })
          })
        })
      } else {

      }

      getListColumn()

      setListOptionVariant(listVariantOptions)
      setTempListVariant(listVariant)
      setOpenDialog(true)
    }
  }

  console.log('listOPtionVariant', listOPtionVariant)

  const handleEditorChange = (event, editor) => {
    console.log('evnet', editor.getData())
    const data = editor.getData()
    setValue('description', data) // You can handle the data here
  }

  const removeOption = (indexVariant, indexOption) => {
    let tempListVariant = JSON.parse(JSON.stringify(listVariant))
    tempListVariant.forEach(variant => {
      if (variant.index == indexVariant) {
        variant.option = variant?.option?.filter(option => option.index != indexOption)
      }
    });
    setListVariant(tempListVariant)
  }

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
          <Card sx={{ p: 4 , mt: 4}}>
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
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type='textarea'
                  multiline
                  rows={12}
                  value={value}
                  sx={{ mt: 3 }}
                  label='Description'
                  required
                  onChange={onChange}
                  placeholder='description'
                  error={Boolean(errors.description)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.description && { helperText: 'This field is required' })}
                />
              )}
            />
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
