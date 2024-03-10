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
import { addProduct, fetchProduct, updateProduct } from 'src/store/apps/product'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'
import { LANG_OBJECT } from 'src/constant'
import { useSnackbar } from 'notistack'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { Slider } from 'antd';

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

let count = 0
let countOption = 1

const FormCreate = () => {
  const [listVariant, setListVariant] = useState([]);
  const [tempListVariant, setTempListVariant] = useState([]);
  const [listOPtionVariant, setListOptionVariant] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [column, setColumn] = useState([]);
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [contentUK, setContentUK] = useState('');
  const [contentUS, setContentUS] = useState('');
  const [contentDE, setContentDE] = useState('');
  const [contentFR, setContentFR] = useState('');
  const [valueRecommend, setValueRecommend] = useState([])
  const [thickness, setThickness] = useState(0);
  const [stretchiness, setStretchiness] = useState(0);

  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

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

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('Update Product created successfully', {
        duration: 2000
      })
      router.replace('/apps/product/')
    } else {
      if (data.statusCode == 10805) {
        data.errors.forEach(ele => {
          enqueueSnackbar(`${ele} of product already exists!`, { variant: 'error' });
        })
      } else {
        enqueueSnackbar(`${data.message}`, { variant: 'error' });
      }
    }
    setLoading(false)
  }

  const handleChange = (event, newValue) => {
    setValueRecommend(newValue)
  }

  const onSubmit = (value) => {
    setLoading(true)
    let tempListOPtionVariant = JSON.parse(JSON.stringify(listOPtionVariant))

    let variant = tempListOPtionVariant.map((ele) => {
      ele.price = value[`price-${ele.id}`]
      ele.sku = value[`sku-${ele.id}`]

      return ele
    })


    const arrayCatPro = valueRecommend.map(ele => ele._id)

    const formData = new FormData();
    formData.append("productId", router.query.id);
    formData.append("titleUK", value.titleUK);
    formData.append("titleUS", value.titleUS);
    formData.append("titleFR", value.titleFR);
    formData.append("titleDE", value.titleDE);

    formData.append("handleUrlUK", value.handleUrlUK);
    formData.append("handleUrlUS", value.handleUrlUS);
    formData.append("handleUrlFR", value.handleUrlFR);
    formData.append("handleUrlDE", value.handleUrlDE);

    formData.append("metaDescriptionUK", value.metaDescriptionUK);
    formData.append("metaDescriptionUS", value.metaDescriptionUS);
    formData.append("metaDescriptionFR", value.metaDescriptionFR);
    formData.append("metaDescriptionDE", value.metaDescriptionDE);

    formData.append("typeUK", value.typeUK);
    formData.append("typeUS", value.typeUS);
    formData.append("typeFR", value.typeFR);
    formData.append("typeDE", value.typeDE);

    formData.append("customizationOptions", value.customizationOptions);
    formData.append("detailProduct", value.detailProduct);

    formData.append("optionMaterial_1", value.optionMaterial_1);
    formData.append("minName_1", value.minName_1);
    formData.append("maxName_1", value.maxName_1);
    formData.append("optionMaterial_2", value.optionMaterial_2);
    formData.append("minName_2", value.minName_2);
    formData.append("maxName_2", value.maxName_2);

    formData.append("valueMaterial_2", stretchiness);
    formData.append("valueMaterial_1", thickness);
    
    formData.append("featureProduct", value.featureProduct);

    formData.append("status", value.productStatus);
    formData.append("descriptionUK", JSON.stringify(contentUK));
    formData.append("descriptionUS", JSON.stringify(contentUS));
    formData.append("descriptionFR", JSON.stringify(contentFR));
    formData.append("descriptionDE", JSON.stringify(contentDE));
    formData.append("currency", value.currency);
    formData.append("categoryProduct", JSON.stringify(arrayCatPro));
    formData.append("variants", JSON.stringify(variant));
    formData.append("price", value.price);
    value.priceSale && formData.append("priceSale", value.priceSale);

    dispatch(updateProduct({ formData, callBackSubmit }))
  }

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    productStatus: '',
    ProductCategory: '',
    productType: '',
    title: '',
    lastName: '',
    password: '',
    textarea: '',
    firstName: '',
    price: '',
    priceSale: '',
    checkbox: false
  })
  const dispatch = useDispatch()

  const store = useSelector(state => state.categoryProduct)
  const storeProduct = useSelector(state => state.product)

  const URLtoFile = async (url) => {

    const res = await fetch(url);

    const blob = await res.blob();

    // Gets URL data and read to blob

    const mime = blob.type;
    const ext = mime.slice(mime.lastIndexOf("/") + 1, mime.length);

    // Gets blob MIME type (e.g. image/png) and extracts extension
    const file = new File([blob], `filename.${ext}`, {

      type: mime,

    })

    // Creates new File object using blob data, extension and MIME type
    console.log(file);

    return file

  }

  useEffect(() => {
    dispatch(fetchEvents())
    dispatch(fetchProduct())
  }, [])

  const getUniqueValues = (array, propertyName) => {

    const values = new Set();
    array.forEach(obj => {
      values.add(obj[propertyName]);
    });

    return Array.from(values);
  };

  const handleListVariant = (data) => {
    let tempVariant = []

    const isExistOption_1 = data.find(ele => ele.nameOption_1)
    const isExistOption_2 = data.find(ele => ele.nameOption_2)
    const isExistOption_3 = data.find(ele => ele.nameOption_3)

    if (isExistOption_1) {
      setValue(`nameVariant${count}`, isExistOption_1.nameOption_1)
      tempVariant.push({
        index: count,
        option: []
      })
      count++
    }
    if (isExistOption_2) {
      setValue(`nameVariant${count}`, isExistOption_2.nameOption_2)
      tempVariant.push({
        index: count,
        option: []
      })
      count++
    }
    if (isExistOption_3) {
      setValue(`nameVariant${count}`, isExistOption_3.nameOption_3)
      tempVariant.push({
        index: count,
        option: []
      })
      count++
    }

    if (isExistOption_1) {
      const uniqueNameVariant_1 = getUniqueValues(data, 'nameVariant_1');
      uniqueNameVariant_1.forEach(ele => {
        tempVariant[0].option.push({
          index: countOption
        })
        setValue(`nameOption-${tempVariant[0].index}-${countOption}`, ele)
        countOption++
      })
    }
    if (isExistOption_2) {
      const uniqueNameVariant_2 = getUniqueValues(data, 'nameVariant_2');
      uniqueNameVariant_2.forEach(ele => {
        tempVariant[1].option.push({
          index: countOption
        })
        setValue(`nameOption-${tempVariant[1].index}-${countOption}`, ele)
        countOption++
      })
    }
    if (isExistOption_3) {
      const uniqueNameVariant_3 = getUniqueValues(data, 'nameVariant_3');
      uniqueNameVariant_3.forEach(ele => {
        tempVariant[2].option.push({
          index: countOption
        })
        setValue(`nameOption-${tempVariant[2].index}-${countOption}`, ele)
        countOption++
      })
    }

    data.forEach(ele => {
      setValue(`price-${ele.id}`, ele.price)
      setValue(`sku-${ele.id}`, ele.sku)
    })

    setListOptionVariant(data)
    setListVariant(tempVariant)
  }

  useEffect(() => {
    if (storeProduct.data.length > 0) {
      const data = storeProduct.data.find(ele => ele._id == router.query.id)

      const listFile = [];
      data?.media?.forEach(ele => {
        listFile.push(URLtoFile(ele.path))
      })

      const listCatPro = [];
      store.data.forEach(ele => {
        if (data?.categoryProduct?.includes(ele._id)) {
          listCatPro.push(ele)
        }
      })

      data?.variants && handleListVariant(data?.variants)
      setValue('titleUK', data?.titleUK)
      setValue('titleUS', data?.titleUS)
      setValue('titleFR', data?.titleFR)
      setValue('titleDE', data?.titleDE)

      setValue('handleUrlUK', data?.handleUrlUK)
      setValue('handleUrlUS', data?.handleUrlUS)
      setValue('handleUrlFR', data?.handleUrlFR)
      setValue('handleUrlDE', data?.handleUrlDE)

      setValue('metaDescriptionUK', data?.metaDescriptionUK)
      setValue('metaDescriptionUS', data?.metaDescriptionUS)
      setValue('metaDescriptionFR', data?.metaDescriptionFR)
      setValue('metaDescriptionDE', data?.metaDescriptionDE)

      setValue('typeUK', data?.typeUK)
      setValue('typeUS', data?.typeUS)
      setValue('typeFR', data?.typeFR)
      setValue('typeDE', data?.typeDE)

      setValue('customizationOptions', data?.customizationOptions)
      setValue('detailProduct', data?.detailProduct)
      setValue('featureProduct', data?.featureProduct)

      setValue('optionMaterial_1', data?.optionMaterial_1)
      setValue('minName_1', data?.minName_1)
      setValue('maxName_1', data?.maxName_1)
      setValue('optionMaterial_2', data?.optionMaterial_2)
      setValue('minName_2', data?.minName_2)
      setValue('maxName_2', data?.maxName_2)

      setStretchiness(data?.valueMaterial_2)
      setThickness(data?.valueMaterial_1)

      setValue('productStatus', data?.status)
      data?.descriptionUK && setContentUK(JSON.parse(data?.descriptionUK))
      data?.descriptionUS && setContentUS(JSON.parse(data?.descriptionUS))
      data?.descriptionFR && setContentFR(JSON.parse(data?.descriptionFR))
      data?.descriptionDE && setContentDE(JSON.parse(data?.descriptionDE))
      setValue('currency', data?.currency)
      setValueRecommend(listCatPro)
      setValue('price', data?.price)
      setValue('priceSale', data?.priceSale)
      setFiles(data?.media)
    }
  }, [storeProduct, store, router.query.id])

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
              price: 0
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
                price: 0
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
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files?.map(file => (
    <Box key={file.name} sx={{ position: 'relative', width: '49%' }}>
      <CustomCloseButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      {
        typeof file.path == 'string' ? <img width={'100%'} key={file.name} alt={file.name} className='single-file-image' src={file.path} /> : <img width={'100%'} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
      }

    </Box>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const onChangeThickness = (value) => {
    setThickness(value)
  }

  const onChangeStretchiness = (value) => {
    setStretchiness(value)
  }

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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Handle Url UK'
                  required
                  onChange={onChange}
                  placeholder='Enter Handle Url UK'
                  error={Boolean(errors.handleUrlUK)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.handleUrlUK && { helperText: 'This field is required' })}
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Handle Url FR'
                  required
                  onChange={onChange}
                  placeholder='Enter Handle Url FR'
                  error={Boolean(errors.handleUrlFR)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.handleUrlFR && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='handleUrlDE'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Handle Url DE'
                  required
                  onChange={onChange}
                  placeholder='Enter Handle Url DE'
                  error={Boolean(errors.handleUrlDE)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.handleUrlDE && { helperText: 'This field is required' })}
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
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
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
            <Controller
              name='metaDescriptionUS'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Meta Description US'
                  required
                  onChange={onChange}
                  placeholder='Enter Meta Description US'
                  error={Boolean(errors.metaDescriptionUS)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.metaDescriptionUS && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='metaDescriptionFR'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
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
            <Controller
              name='metaDescriptionDE'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
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
          </Card>
          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Product Type
            </Typography>
            <Controller
              name='typeUK'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Product Type UK'
                  required
                  onChange={onChange}
                  placeholder='Enter Product Type UK'
                  error={Boolean(errors.typeUK)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.typeUK && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='typeUS'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Product Type US'
                  required
                  onChange={onChange}
                  placeholder='Enter Product Type US'
                  error={Boolean(errors.typeUS)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.typeUS && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='typeFR'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Product Type FR'
                  required
                  onChange={onChange}
                  placeholder='Enter Product Type FR'
                  error={Boolean(errors.typeFR)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.typeFR && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='typeDE'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Product Type DE'
                  required
                  onChange={onChange}
                  placeholder='Enter Product Type DE'
                  error={Boolean(errors.typeDE)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.typeDE && { helperText: 'This field is required' })}
                />
              )}
            />
          </Card>
          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              More detail
            </Typography>
            <Controller
              name='customizationOptions'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Customization Options'
                  required
                  onChange={onChange}
                  placeholder='Enter Customization Options'
                  error={Boolean(errors.customizationOptions)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.customizationOptions && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='detailProduct'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Details Product'
                  required
                  onChange={onChange}
                  placeholder='Enter Details Product'
                  error={Boolean(errors.detailProduct)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.detailProduct && { helperText: 'This field is required' })}
                />
              )}
            />
            <Typography variant='h5' sx={{ mb: 2 }}>
              Material
            </Typography>
            <Controller
              name='optionMaterial_1'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  value={value}
                  label='Option Material 1'
                  onChange={onChange}
                  placeholder='Enter Option Material 1'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ fontSize: 13 }}>
                <Controller
                  name='minName_1'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ width: '140px' }}
                      value={value}
                      label='Min Name'
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Box>
              <Box sx={{ fontSize: 13 }}>
                <Controller
                  name='maxName_1'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ width: '140px' }}
                      fullWidth
                      value={value}
                      label='Max Name'
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Box>
            </Box>
            <Slider value={thickness} onChange={onChangeThickness} />
            <Controller
              name='optionMaterial_2'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mb: 4, mt: 8 }}
                  fullWidth
                  value={value}
                  label='Option Material 2'
                  onChange={onChange}
                  placeholder='Enter Option Material 2'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ fontSize: 13 }}>
                <Controller
                  name='minName_2'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ width: '140px' }}
                      value={value}
                      label='Min Name 2'
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Box>
              <Box sx={{ fontSize: 13 }}>
                <Controller
                  name='maxName_2'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ width: '140px' }}
                      fullWidth
                      value={value}
                      label='Max Name 2'
                      onChange={onChange}
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Box>
            </Box>
            <Slider value={stretchiness} onChange={onChangeStretchiness} />
            <Controller
              name='featureProduct'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  rows={4}
                  sx={{ mt: 3 }}
                  fullWidth
                  multiline
                  {...field}
                  label='Feature'
                  error={Boolean(errors.featureProduct)}
                  aria-describedby='validation-basic-featureProduct'
                  {...(errors.featureProduct && { helperText: 'This field is required' })}
                />
              )}
            />
          </Card>
          <Card sx={{ p: 4 }}>
            <Controller
              name='productStatus'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue=''
                  label='Product Status'
                  SelectProps={{
                    value: value || "",
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.productStatus)}
                  aria-describedby='validation-basic-select'
                  {...(errors.productStatus && { helperText: 'This field is required' })}
                >
                  <MenuItem value='public'>Public</MenuItem>
                  <MenuItem value='private'>Private</MenuItem>
                </CustomTextField>
              )}
            />
            <CustomAutocomplete
              multiple
              value={valueRecommend}
              onChange={handleChange}
              sx={{ width: '100%', mt: 4 }}
              options={store.data}
              filterSelectedOptions
              id='autocomplete-multiple-outlined'
              getOptionLabel={option => option.titleUS || ''}
              renderInput={params => <CustomTextField {...params} label='Product Category' placeholder='Products' />}
            />
            <Controller
              name='price'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  type="number"
                  sx={{ mt: 4 }}
                  fullWidth
                  value={value}
                  label='Enter Price'
                  required
                  onChange={onChange}
                  placeholder='Enter Price'
                  error={Boolean(errors.price)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.price && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='priceSale'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  type="number"
                  sx={{ mt: 4 }}
                  fullWidth
                  value={value}
                  label='Enter Price Sale'
                  onChange={onChange}
                  placeholder='Enter Price Sale'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
          </Card>
        </Grid>
        <Grid item xs={8} sx={{ pl: 5, textAlign: 'right' }}>
          <Card sx={{ p: 4 }}>
            <Grid item xs={12} sm={12}>
              <Controller
                name={`title${LANG_OBJECT.UK}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    sx={{ mb: 4 }}
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    sx={{ mb: 4 }}
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
            <Grid item xs={12} sm={12}>
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
          </Card>
          <Card sx={{ p: 4, mt: 4, textAlign: 'left' }}>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Description UK
              </Typography>
              <QuillNoSSRWrapper value={contentUK} onChange={handleChangeContentUK} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Description US
              </Typography>
              <QuillNoSSRWrapper value={contentUS} onChange={handleChangeContentUS} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Description DE
              </Typography>
              <QuillNoSSRWrapper value={contentDE} onChange={handleChangeContentDE} modules={modules} formats={formats} theme="snow" />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Description FR
              </Typography>
              <QuillNoSSRWrapper value={contentFR} onChange={handleChangeContentFR} modules={modules} formats={formats} theme="snow" />
            </Box>
          </Card>
          <Card sx={{ p: 4, mt: 4 }}>
            <Fragment>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      mb: 8.75,
                      width: 48,
                      height: 48,
                      display: 'flex',
                      borderRadius: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
                    }}
                  >
                    <Icon icon='tabler:upload' fontSize='1.75rem' />
                  </Box>
                  <Typography variant='h4' sx={{ mb: 2.5 }}>
                    Drop files here or click to upload.
                  </Typography>
                </Box>
              </div>
              {files?.length ? (
                <Fragment>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{fileList}</Box>
                  <div className='buttons'>
                    <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                      Remove All
                    </Button>
                  </div>
                </Fragment>
              ) : null}
            </Fragment>
          </Card>
          <Card sx={{ p: 4, mt: 4 }}>
            <Grid container xs={12} sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Controller
                  name='currency'
                  control={control}
                  required
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      select
                      label='Currency'
                      sx={{ textAlign: 'left' }}
                      SelectProps={{
                        value: value || "",
                        onChange: e => onChange(e)
                      }}
                      id='custom-select'
                      error={Boolean(errors.currency)}
                      {...(errors.currency && { helperText: 'This field is required' })}
                    >
                      <MenuItem value='USD'>USD</MenuItem>
                      <MenuItem value='EUR'>EUR</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 4, mt: 4 }}>
            {
              listVariant.map(el => {
                return <Box key={el.index}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyItems: 'space-between' }}>
                    <Controller
                      name={`nameVariant` + el.index}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <CustomTextField
                          fullWidth
                          value={value}
                          label='Name Variant'
                          required
                          onChange={onChange}
                          placeholder='Enter Name Variant'
                          error={Boolean(errors[`nameVariant${el.index}`])}
                          aria-describedby='validation-basic-first-name'
                          {...(errors[`nameVariant` + el.index] && { helperText: 'This field is required' })}
                        />
                      )}
                    />
                    <Icon icon='tabler:trash' fontSize={25} onClick={() => removeVariant(el.index)} />
                  </Box>
                  <Box sx={{ ml: 5 }}>
                    {
                      el.option?.map(option => {
                        return <Box key={option.index} sx={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyItems: 'space-between' }}>
                          <Controller
                            name={`nameOption-${el.index}-${option.index}`}
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                              <CustomTextField
                                sx={{ mt: 3 }}
                                fullWidth
                                value={value}
                                label='Attribute'
                                required
                                onChange={onChange}
                                placeholder='Enter Attribute'
                                error={Boolean(errors[`nameOption-${el.index}-${option.index}`])}
                                aria-describedby='validation-basic-first-name'
                                {...(errors[`nameOption-${el.index}-${option.index}`] && { helperText: 'This field is required' })}
                              />
                            )}
                          />
                          <Icon icon='tabler:trash' fontSize={25} onClick={() => removeOption(el.index, option.index)} />
                        </Box>
                      })
                    }
                    <Button onClick={() => handleAddOptionVariant(el.index)} sx={{ justifyContent: 'start', width: '100%' }}>
                      Add options for this variant
                    </Button>
                  </Box>
                </Box>
              })
            }
            {
              listVariant.length < 3 ? <Button onClick={handleAddVariant} sx={{ justifyContent: 'start', width: '100%' }}>
                Add options like size or color
              </Button> : <></>
            }

            <Button variant='contained' onClick={getListVariant}>
              Fill list variants
            </Button>
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
      <Dialog
        fullWidth
        open={openDialog}
        maxWidth={'xl'}
        scroll='body'
        onClose={() => setOpenDialog(false)}
        TransitionComponent={Transition}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setOpenDialog(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Card>
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={listOPtionVariant}
              columns={column}
              disableRowSelectionOnClick
            />
          </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FormCreate
