// ** MUI Imports
import { Button, Card, CircularProgress, Dialog, DialogContent, Fade, Divider, ListItem, MenuItem, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'
import IconButton from '@mui/material/IconButton'

// ** Custom Components Imports
import { Slider } from 'antd';
import { Fragment, forwardRef, useEffect, useState } from 'react'
import { Box } from '@mui/system'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import Icon from 'src/@core/components/icon'
import styled from '@emotion/styled'
import { DataGrid } from '@mui/x-data-grid'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from 'src/store/apps/categoryProduct'
import { addProduct } from 'src/store/apps/product'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'
import { LANG, LANG_OBJECT } from 'src/constant'
import { useSnackbar } from 'notistack'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// import Tabs
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import ButtonUpload from '../components/ButtonUpload'
import SunEditorWrapper from 'src/views/components/RichText/SunEditorWrapper'

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
let countOption = 0

const FormCreate = () => {
  const [listVariant, setListVariant] = useState([]);
  const [tempListVariant, setTempListVariant] = useState([]);
  const [listOPtionVariant, setListOptionVariant] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [column, setColumn] = useState([]);
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  const [isVariantNeedUpdate, setIsVariantNeedUpdate] = useState(true)

  const [contentUK, setContentUK] = useState('');
  const [contentUS, setContentUS] = useState('');
  const [contentDE, setContentDE] = useState('');
  const [contentFR, setContentFR] = useState('');

  const [tabProductDetailUK, setTabProductDetailUK] = useState('');
  const [tabProductDetailUS, setTabProductDetailUS] = useState('');
  const [tabProductDetailDE, setTabProductDetailDE] = useState('');
  const [tabProductDetailFR, setTabProductDetailFR] = useState('');

  const [tabSizeGuideUK, setTabSizeGuideUK] = useState('');
  const [tabSizeGuideUS, setTabSizeGuideUS] = useState('');
  const [tabSizeGuideDE, setTabSizeGuideDE] = useState('');
  const [tabSizeGuideFR, setTabSizeGuideFR] = useState('');

  const [tabMockupTemplateUK, setTabMockupTemplateUK] = useState('');
  const [tabMockupTemplateUS, setTabMockupTemplateUS] = useState('');
  const [tabMockupTemplateDE, setTabMockupTemplateDE] = useState('');
  const [tabMockupTemplateFR, setTabMockupTemplateFR] = useState('');

  const [tabCareInstructionUK, setTabCareInstructionUK] = useState('');
  const [tabCareInstructionUS, setTabCareInstructionUS] = useState('');
  const [tabCareInstructionDE, setTabCareInstructionDE] = useState('');
  const [tabCareInstructionFR, setTabCareInstructionFR] = useState('');

  const [valueRecommend, setValueRecommend] = useState([])

  const [thickness, setThickness] = useState(0);
  const [stretchiness, setStretchiness] = useState(0);
  const [valueTabs, setValueTabs] = useState('1')

  const [tempPrice, setTempPrice] = useState(0)

  const handleChangeTabs = (event, newValue) => {
    setValueTabs(newValue)
  }
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeContentUK = (content) => {
    setContentUK(content);
  };

  const handleChangeContentUS = (content) => {
    setContentUS(content);
  };

  const handleChangeContentDE = (content) => {
    setContentDE(content);
  };

  const handleChangeContentFR = (content) => {
    setContentFR(content);
  };

  const handleChangeTabProductDetailUK = (content) => {
    setTabProductDetailUK(content);
  };

  const handleChangeTabProductDetailUS = (content) => {
    setTabProductDetailUS(content);
  };

  const handleChangeTabProductDetailDE = (content) => {
    setTabProductDetailDE(content);
  };

  const handleChangeTabProductDetailFR = (content) => {
    setTabProductDetailFR(content);
  };

  const handleChangeTabSizeGuideUK = (content) => {
    setTabSizeGuideUK(content);
  };

  const handleChangeTabSizeGuideUS = (content) => {
    setTabSizeGuideUS(content);
  };

  const handleChangeTabSizeGuideDE = (content) => {
    setTabSizeGuideDE(content);
  };

  const handleChangeTabSizeGuideFR = (content) => {
    setTabSizeGuideFR(content);
  };

  const handleChangeTabMockupTemplateUK = (content) => {
    setTabMockupTemplateUK(content);
  };

  const handleChangeTabMockupTemplateUS = (content) => {
    setTabMockupTemplateUS(content);
  };

  const handleChangeTabMockupTemplateDE = (content) => {
    setTabMockupTemplateDE(content);
  };

  const handleChangeTabMockupTemplateFR = (content) => {
    setTabMockupTemplateFR(content);
  };

  const handleChangeTabCareInstructionUK = (content) => {
    setTabCareInstructionUK(content);
  };

  const handleChangeTabCareInstructionUS = (content) => {
    setTabCareInstructionUS(content);
  };

  const handleChangeTabCareInstructionDE = (content) => {
    setTabCareInstructionDE(content);
  };

  const handleChangeTabCareInstructionFR = (content) => {
    setTabCareInstructionFR(content);
  };

  const handleChange = (event, newValue) => {
    setValueRecommend(newValue)
  }

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('New Product created successfully', {
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


  const onSubmit = (value) => {
    setLoading(true)

    const variant = listOPtionVariant.map((ele) => {
      ele.price = value[`price-${ele.id}`]
      ele.sku = value[`sku-${ele.id}`]
      ele.img = value[`imageVariant-${ele.id}`]

      return ele
    })

    console.log('variant', variant);

    const arrayCatPro = valueRecommend.map(ele => ele._id)

    const formData = new FormData();
    formData.append("titleUK", value.titleUK || '');
    formData.append("titleUS", value.titleUS || '');
    formData.append("titleFR", value.titleFR || '');
    formData.append("titleDE", value.titleDE || '');

    formData.append("metaTitleUK", value.metaTitleUK || '');
    formData.append("metaTitleUS", value.metaTitleUS || '');
    formData.append("metaTitleFR", value.metaTitleFR || '');
    formData.append("metaTitleDE", value.metaTitleDE || '');

    formData.append("handleUrlUK", value.handleUrlUK || '');
    formData.append("handleUrlUS", value.handleUrlUS || '');
    formData.append("handleUrlFR", value.handleUrlFR || '');
    formData.append("handleUrlDE", value.handleUrlDE || '');

    formData.append("metaDescriptionUK", value.metaDescriptionUK || '');
    formData.append("metaDescriptionUS", value.metaDescriptionUS || '');
    formData.append("metaDescriptionFR", value.metaDescriptionFR || '');
    formData.append("metaDescriptionDE", value.metaDescriptionDE || '');

    formData.append("typeUK", value.typeUK || '');
    formData.append("typeUS", value.typeUS || '');
    formData.append("typeFR", value.typeFR || '');
    formData.append("typeDE", value.typeDE || '');

    formData.append("tabProductDetailUK", tabProductDetailUK || '');
    formData.append("tabProductDetailUS", tabProductDetailUS || '');
    formData.append("tabProductDetailFR", tabProductDetailFR || '');
    formData.append("tabProductDetailDE", tabProductDetailDE || '');

    formData.append("tabSizeGuideUK", tabSizeGuideUK || '');
    formData.append("tabSizeGuideUS", tabSizeGuideUS || '');
    formData.append("tabSizeGuideFR", tabSizeGuideFR || '');
    formData.append("tabSizeGuideDE", tabSizeGuideDE || '');

    formData.append("tabMockupTemplateUK", tabMockupTemplateUK || '');
    formData.append("tabMockupTemplateUS", tabMockupTemplateUS || '');
    formData.append("tabMockupTemplateFR", tabMockupTemplateFR || '');
    formData.append("tabMockupTemplateDE", tabMockupTemplateDE || '');

    formData.append("tabCareInstructionUK", tabCareInstructionUK || '');
    formData.append("tabCareInstructionUS", tabCareInstructionUS || '');
    formData.append("tabCareInstructionFR", tabCareInstructionFR || '');
    formData.append("tabCareInstructionDE", tabCareInstructionDE || '');

    LANG.forEach(ele => {

      formData.append(`customizationOptionsLabel${ele.value}`, value[`customizationOptionsLabel${ele.value}`] || '');
      formData.append(`detailProductLabel${ele.value}`, value[`detailProductLabel${ele.value}`] || '');
      formData.append(`optionMaterialLabel${ele.value}`, value[`optionMaterialLabel${ele.value}`] || '');
      formData.append(`featureProductLabel${ele.value}`, value[`featureProductLabel${ele.value}`] || '');

      formData.append(`customizationOptions${ele.value}`, value[`customizationOptions${ele.value}`] || '');
      formData.append(`detailProduct${ele.value}`, value[`detailProduct${ele.value}`] || '');

      formData.append(`optionMaterial_1${ele.value}`, value[`optionMaterial_1${ele.value}`] || '');
      formData.append(`minName_1${ele.value}`, value[`minName_1${ele.value}`] || '');
      formData.append(`maxName_1${ele.value}`, value[`maxName_1${ele.value}`] || '');
      formData.append(`optionMaterial_2${ele.value}`, value[`optionMaterial_2${ele.value}`] || '');
      formData.append(`minName_2${ele.value}`, value[`minName_2${ele.value}`] || '');
      formData.append(`maxName_2${ele.value}`, value[`maxName_2${ele.value}`] || '');

      formData.append(`featureProduct${ele.value}`, value[`featureProduct${ele.value}`] || '');

      formData.append(`processingTime${ele.value}`, value[`processingTime${ele.value}`] || '');
      formData.append(`shippingTime${ele.value}`, value[`shippingTime${ele.value}`] || '');
      formData.append(`templateProduct${ele.value}`, value[`templateProduct${ele.value}`] || '');
    })
    formData.append(`valueMaterial_1`, thickness || 0);
    formData.append(`valueMaterial_2`, stretchiness || 0);


    formData.append("status", value.productStatus || '');
    formData.append("btnLink", value.btnLink || '');

    formData.append("descriptionUK", contentUK || '');
    formData.append("descriptionUS", contentUS || '');
    formData.append("descriptionFR", contentFR || '');
    formData.append("descriptionDE", contentDE || '');

    formData.append("currency", value.currency || 'US');
    formData.append("categoryProduct", JSON.stringify(arrayCatPro) || '');
    formData.append("price", value.price || 0);
    value.priceSale && formData.append("priceSale", value.priceSale || 0);
    formData.append("variants", JSON.stringify(variant) || '');
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    dispatch(addProduct({ formData, callBackSubmit }))
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
    checkbox: false
  })
  const dispatch = useDispatch()

  const store = useSelector(state => state.categoryProduct)

  useEffect(() => {
    setValue('currency', 'USD')
    dispatch(fetchEvents())
  }, [])

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
        const defaultValue = `${row?.nameVariant_1}${row?.nameVariant_2 ? `-${row?.nameVariant_2}` : ''}${row?.nameVariant_3 ? `-${row?.nameVariant_3}` : ''}`

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Controller
              name={`sku-${row.id}`}
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  defaultValue={defaultValue}
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
                  defaultValue={getValues('price') && getValues('price') != tempPrice ? getValues('price') : null}
                  type={'number'}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  placeholder='Price'
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
          </Box>
        )
      }
    },)
    listColumnOptions.push({
      flex: 0.2,
      field: 'imageVariant',
      minWidth: 170,
      headerName: 'Image',
      renderCell: ({ row }) => {

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ButtonUpload getValues={getValues} setValue={setValue} id={row.id} />
          </Box>
        )
      }
    },)
    setColumn(listColumnOptions)
  }

  const getListVariant = () => {
    if (JSON.stringify(listVariant) == JSON.stringify(tempListVariant) && !isVariantNeedUpdate) {
      setOpenDialog(true)
    } else {
      setIsVariantNeedUpdate(false)
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
                price: 0,
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
      console.log('fileeeeee', acceptedFiles);
      setFiles(acceptedFiles.map(file => Object.assign(file)))
      console.log('dsadsadsa', acceptedFiles.map(file => Object.assign(file)));
    }
  })
  console.log('fileee', files);

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <Box key={file.name} sx={{ position: 'relative', width: '49%' }}>
      <CustomCloseButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <img width={'100%'} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
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
                    value: value,
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
            <Controller
              name='btnLink'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  sx={{ mt: 4 }}
                  fullWidth
                  value={value}
                  label='Button Link Product'
                  required
                  onChange={onChange}
                  placeholder='Enter button Link'
                  error={Boolean(errors.btnLink)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.btnLink && { helperText: 'This field is required' })}
                />
              )}
            />
          </Card>
          {
            LANG.map(ele => <Card key={ele.key} sx={{ p: 4, mb: 4 }}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                More detail {ele.value}
              </Typography>
              <Box>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Option 1 {ele.value} (ex: customization Options)
                </Typography>
                <Controller
                  name={`customizationOptionsLabel${ele.value}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label='Label option 1'
                      required
                      onChange={onChange}
                      placeholder='Enter Label option 1'
                      error={Boolean(errors[`customizationOptionsLabel${ele.value}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`customizationOptionsLabel${ele.value}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
                <Controller
                  name={`customizationOptions${ele.value}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label='Value option 1'
                      required
                      onChange={onChange}
                      placeholder='Enter Value option 1'
                      error={Boolean(errors[`customizationOptions${ele.value}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`customizationOptions${ele.value}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Box>
              <Divider sx={{ my: 4 }} />
              <Box>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Option 2 {ele.value} (ex: Detail Product)
                </Typography>
                <Controller
                  name={`detailProductLabel${ele.value}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label='Label option 2'
                      required
                      onChange={onChange}
                      placeholder='Enter Label option 2'
                      error={Boolean(errors[`detailProductLabel${ele.value}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`detailProductLabel${ele.value}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
                <Controller
                  name={`detailProduct${ele.value}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label='Value option 2'
                      required
                      onChange={onChange}
                      placeholder='Enter Value option 2'
                      error={Boolean(errors[`detailProduct${ele.value}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`detailProduct${ele.value}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Box>
              <Divider sx={{ my: 4 }} />

              <Typography variant='h6' sx={{ mb: 2 }}>
                Option 3 {ele.value} (ex: material)
              </Typography>
              <Controller
                name={`optionMaterialLabel${ele.value}`}
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    sx={{ mb: 4 }}
                    fullWidth
                    value={value}
                    label='Label option 3'
                    required
                    onChange={onChange}
                    placeholder='Enter Label option 3'
                    error={Boolean(errors[`optionMaterialLabel${ele.value}`])}
                    aria-describedby='validation-basic-first-name'
                    {...(errors[`optionMaterialLabel${ele.value}`] && { helperText: 'This field is required' })}
                  />
                )}
              />
              <Controller
                name={`optionMaterial_1${ele.value}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    sx={{ mb: 4 }}
                    fullWidth
                    value={value}
                    label={`Option Slide 1 ${ele.value}`}
                    onChange={onChange}
                    placeholder='Enter Option Slide 1'
                    aria-describedby='validation-basic-first-name'
                  />
                )}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ fontSize: 13 }}>
                  <Controller
                    name={`minName_1${ele.value}`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        sx={{ width: '140px' }}
                        value={value}
                        label={`Min Name ${ele.value}`}
                        onChange={onChange}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                </Box>
                <Box sx={{ fontSize: 13 }}>
                  <Controller
                    name={`maxName_1${ele.value}`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        sx={{ width: '140px' }}
                        fullWidth
                        value={value}
                        label={`Max Name ${ele.value}`}
                        onChange={onChange}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                </Box>
              </Box>
              <Slider value={thickness} onChange={onChangeThickness} />
              <Controller
                name={`optionMaterial_2${ele.value}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    sx={{ mb: 4, mt: 8 }}
                    fullWidth
                    value={value}
                    label={`Option Slide 2 ${ele.value}`}
                    onChange={onChange}
                    placeholder='Enter Option Slide 2'
                    aria-describedby='validation-basic-first-name'
                  />
                )}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ fontSize: 13 }}>
                  <Controller
                    name={`minName_2${ele.value}`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        sx={{ width: '140px' }}
                        value={value}
                        label={`Min Name 2 ${ele.value}`}
                        onChange={onChange}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                </Box>
                <Box sx={{ fontSize: 13 }}>
                  <Controller
                    name={`maxName_2${ele.value}`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        sx={{ width: '140px' }}
                        fullWidth
                        value={value}
                        label={`Max Name 2 ${ele.value}`}
                        onChange={onChange}
                        aria-describedby='validation-basic-first-name'
                      />
                    )}
                  />
                </Box>
              </Box>
              <Slider value={stretchiness} onChange={onChangeStretchiness} />
              <Divider sx={{ my: 4 }} />
              <Box>
                <Typography variant='h6' sx={{ mb: 2 }}>
                  Option 4 {ele.value} (ex: Feature)
                </Typography>
                <Controller
                  name={`featureProductLabel${ele.value}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label={`Label option 4 ${ele.value}`}
                      required
                      onChange={onChange}
                      placeholder='Enter Label option 4'
                      error={Boolean(errors[`featureProductLabel${ele.value}`])}
                      aria-describedby='validation-basic-first-name'
                      {...(errors[`featureProductLabel${ele.value}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
                <Controller
                  name={`featureProduct${ele.value}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField
                      rows={4}
                      multiline
                      sx={{ mt: 3 }}
                      fullWidth
                      {...field}
                      label={`Feature ${ele.value}`}
                      error={Boolean(errors[`featureProduct${ele.value}`])}
                      aria-describedby='validation-basic-featureProduct'
                      {...(errors[`featureProduct${ele.value}`] && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Box>
            </Card>)
          }

        </Grid>
        <Grid item xs={8} sx={{ pl: 5 }}>
          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Handle URL
            </Typography>
            <Grid container xs={12} sm={12} spacing={5}>

              <Grid item xs={6} sm={6}>
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
              </Grid>
              <Grid item xs={6} sm={6}>
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
              </Grid>
              <Grid item xs={6} sm={6}>
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
              </Grid>
              <Grid item xs={6} sm={6}>
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
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4 }}>
            <Grid container xs={12} sm={12} spacing={5}>
              <Grid item xs={6} sm={6}>
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
              <Grid item xs={6} sm={6}>
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
              <Grid item xs={6} sm={6}>
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

          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Meta description
            </Typography>
            <Grid container xs={12} sm={12} spacing={5}>
              <Grid item xs={6} sm={6}>
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
              </Grid>
              <Grid item xs={6} sm={6}>
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
              </Grid>
              <Grid item xs={6} sm={6}>
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
              </Grid>
              <Grid item xs={6} sm={6}>
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
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Product Type
            </Typography>
            <Grid container xs={12} sm={12} spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='typeUK'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label='Product Type UK'
                      onChange={onChange}
                      placeholder='Enter Product Type UK'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='typeUS'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label='Product Type US'
                      onChange={onChange}
                      placeholder='Enter Product Type US'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='typeFR'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label='Product Type FR'
                      onChange={onChange}
                      placeholder='Enter Product Type FR'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='typeDE'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      sx={{ mb: 4 }}
                      fullWidth
                      value={value}
                      label='Product Type DE'
                      onChange={onChange}
                      placeholder='Enter Product Type DE'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 4, mt: 4, mb: 5, textAlign: 'left' }}>
            <TabContext value={valueTabs}>
              <TabList onChange={handleChangeTabs} aria-label='nav tabs example'>
                <Tab value='1' component='a' label='Product Details' onClick={e => e.preventDefault()} />
                <Tab value='2' component='a' label='Size Guide' onClick={e => e.preventDefault()} />
                <Tab value='3' component='a' label='Mockup & Template' onClick={e => e.preventDefault()} />
                <Tab value='4' component='a' label='Care Instruction' onClick={e => e.preventDefault()} />
              </TabList>
              <TabPanel value='1'>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Product Details UK
                  </Typography>
                  <SunEditorWrapper value={tabProductDetailUK} onChange={handleChangeTabProductDetailUK} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Product Details US
                  </Typography>
                  <SunEditorWrapper value={tabProductDetailUS} onChange={handleChangeTabProductDetailUS} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Product Details FR
                  </Typography>
                  <SunEditorWrapper value={tabProductDetailFR} onChange={handleChangeTabProductDetailFR} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Product Details DE
                  </Typography>
                  <SunEditorWrapper value={tabProductDetailDE} onChange={handleChangeTabProductDetailDE} />
                </Box>
              </TabPanel>
              <TabPanel value='2'>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Size Guide UK
                  </Typography>
                  <SunEditorWrapper value={tabSizeGuideUK} onChange={handleChangeTabSizeGuideUK} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Size Guide US
                  </Typography>
                  <SunEditorWrapper value={tabSizeGuideUS} onChange={handleChangeTabSizeGuideUS} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Size Guide FR
                  </Typography>
                  <SunEditorWrapper value={tabSizeGuideFR} onChange={handleChangeTabSizeGuideFR} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Size Guide DE
                  </Typography>
                  <SunEditorWrapper value={tabSizeGuideDE} onChange={handleChangeTabSizeGuideDE} />
                </Box>
              </TabPanel>
              <TabPanel value='3'>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Mockup Template UK
                  </Typography>
                  <SunEditorWrapper value={tabMockupTemplateUK} onChange={handleChangeTabMockupTemplateUK} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Mockup Template US
                  </Typography>
                  <SunEditorWrapper value={tabMockupTemplateUS} onChange={handleChangeTabMockupTemplateUS} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Mockup Template FR
                  </Typography>
                  <SunEditorWrapper value={tabMockupTemplateFR} onChange={handleChangeTabMockupTemplateFR} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Mockup Template DE
                  </Typography>
                  <SunEditorWrapper value={tabMockupTemplateDE} onChange={handleChangeTabMockupTemplateDE} />
                </Box>
              </TabPanel>
              <TabPanel value='4'>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Care Instruction UK
                  </Typography>
                  <SunEditorWrapper value={tabCareInstructionUK} onChange={handleChangeTabCareInstructionUK} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Care Instruction US
                  </Typography>
                  <SunEditorWrapper value={tabCareInstructionUS} onChange={handleChangeTabCareInstructionUS} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Care Instruction FR
                  </Typography>
                  <SunEditorWrapper value={tabCareInstructionFR} onChange={handleChangeTabCareInstructionFR} />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Care Instruction DE
                  </Typography>
                  <SunEditorWrapper value={tabCareInstructionDE} onChange={handleChangeTabCareInstructionDE} />
                </Box>
              </TabPanel>
            </TabContext>
          </Card>
          <Card sx={{ p: 4, mt: 6, textAlign: 'left' }}>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Description UK
              </Typography>
              <SunEditorWrapper value={contentUK} onChange={handleChangeContentUK} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Description US
              </Typography>
              <SunEditorWrapper value={contentUS} onChange={handleChangeContentUS} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Description DE
              </Typography>
              <SunEditorWrapper value={contentDE} onChange={handleChangeContentDE} />
            </Box>
            <Box sx={{ mb: 7 }}>
              <Typography variant='h5'>
                Description FR
              </Typography>
              <SunEditorWrapper value={contentFR} onChange={handleChangeContentFR} />
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
              {files.length ? (
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
                      sx={{ textAlign: 'left' }}
                      defaultValue='USD'
                      label='Currency'
                      SelectProps={{
                        value: value,
                        onChange: e => onChange(e)
                      }}
                      id='validation-basic-select'
                      error={Boolean(errors.currency)}
                      aria-describedby='validation-basic-select'
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
                          onChange={(e) => {
                            setIsVariantNeedUpdate(true)
                            onChange(e)
                          }}
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
                                onChange={(e) => {
                                  setIsVariantNeedUpdate(true)
                                  onChange(e)
                                }}
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
          {/* setting */}
          <Card sx={{ p: 4, mb: 4, mt: 4 }}>
            <Typography variant='h4' sx={{ mb: 3 }}>
              Setting
            </Typography>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Average Est. Processing Time
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='processingTimeUK'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Average Est. Processing Time UK'
                      onChange={onChange}
                      placeholder='Enter Average Est. Processing Time UK'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='processingTimeUS'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Average Est. Processing Time US'
                      onChange={onChange}
                      placeholder='Enter Average Est. Processing Time'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='processingTimeFR'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Average Est. Processing Time FR'
                      onChange={onChange}
                      placeholder='Enter Average Est. Processing Time'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='processingTimeDE'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Average Est. Processing Time DE'
                      onChange={onChange}
                      placeholder='Enter Average Est. Processing Time'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mt: 10, mb: 3 }}>
              Average Est. Shipping Time
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='shippingTimeUK'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      rows={4}
                      multiline
                      fullWidth
                      value={value}
                      label='Average Est. Shipping Time UK'
                      onChange={onChange}
                      placeholder='Enter Average Est. Shipping Time UK'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='shippingTimeUS'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      rows={4}
                      multiline
                      fullWidth
                      value={value}
                      label='Average Est. Shipping Time US'
                      onChange={onChange}
                      placeholder='Enter Average Est. Shipping Time'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='shippingTimeFR'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      rows={4}
                      multiline
                      fullWidth
                      value={value}
                      label='Average Est. Shipping Time FR'
                      onChange={onChange}
                      placeholder='Enter Average Est. Shipping Time'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='shippingTimeDE'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      rows={4}
                      multiline
                      fullWidth
                      value={value}
                      label='Average Est. Shipping Time DE'
                      onChange={onChange}
                      placeholder='Enter Average Est. Shipping Time'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' sx={{ mt: 10, mb: 3 }}>
              Template Product
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='templateProductUK'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Template Product UK'
                      onChange={onChange}
                      placeholder='Enter Template Product UK'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='templateProductUS'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Template Product US'
                      onChange={onChange}
                      placeholder='Enter Template Product'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='templateProductFR'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Template Product FR'
                      onChange={onChange}
                      placeholder='Enter Template Product'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  name='templateProductDE'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Template Product DE'
                      onChange={onChange}
                      placeholder='Enter Template Product'
                      aria-describedby='validation-basic-first-name'
                    />
                  )}
                />
              </Grid>
            </Grid>
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
      <Dialog
        fullWidth
        open={openDialog}
        maxWidth={'xl'}
        scroll='body'
        onClose={() => setOpenDialog(false)}
        TransitionComponent={Transition}
        sx={{ '& .MuiDialog-paper': { overflowY: 'visible' } }}
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
          <Card sx={{ width: '100%' }}>
            <DataGrid
              autoHeight
              rowHeight={62}
              rows={listOPtionVariant}
              columns={column}
              disableRowSelectionOnClick
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained' sx={{ m: 4 }} onClick={() => setOpenDialog(false)}>
                Save
              </Button>
            </Box>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FormCreate
