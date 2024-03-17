// ** MUI Imports
import { Button, Card, CircularProgress, Dialog, DialogContent, Fade, List, ListItem, MenuItem, Typography } from '@mui/material'
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
import { LANG_OBJECT } from 'src/constant'
import { useSnackbar } from 'notistack'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// import Tabs
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

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

  const handleChangeTabProductDetailUK = (content, delta, source, editor) => {
    setTabProductDetailUK(content);
  };

  const handleChangeTabProductDetailUS = (content, delta, source, editor) => {
    setTabProductDetailUS(content);
  };

  const handleChangeTabProductDetailDE = (content, delta, source, editor) => {
    setTabProductDetailDE(content);
  };

  const handleChangeTabProductDetailFR = (content, delta, source, editor) => {
    setTabProductDetailFR(content);
  };

  const handleChangeTabSizeGuideUK = (content, delta, source, editor) => {
    setTabSizeGuideUK(content);
  };

  const handleChangeTabSizeGuideUS = (content, delta, source, editor) => {
    setTabSizeGuideUS(content);
  };

  const handleChangeTabSizeGuideDE = (content, delta, source, editor) => {
    setTabSizeGuideDE(content);
  };

  const handleChangeTabSizeGuideFR = (content, delta, source, editor) => {
    setTabSizeGuideFR(content);
  };

  const handleChangeTabMockupTemplateUK = (content, delta, source, editor) => {
    setTabMockupTemplateUK(content);
  };

  const handleChangeTabMockupTemplateUS = (content, delta, source, editor) => {
    setTabMockupTemplateUS(content);
  };

  const handleChangeTabMockupTemplateDE = (content, delta, source, editor) => {
    setTabMockupTemplateDE(content);
  };

  const handleChangeTabMockupTemplateFR = (content, delta, source, editor) => {
    setTabMockupTemplateFR(content);
  };

  const handleChangeTabCareInstructionUK = (content, delta, source, editor) => {
    setTabCareInstructionUK(content);
  };

  const handleChangeTabCareInstructionUS = (content, delta, source, editor) => {
    setTabCareInstructionUS(content);
  };

  const handleChangeTabCareInstructionDE = (content, delta, source, editor) => {
    setTabCareInstructionDE(content);
  };

  const handleChangeTabCareInstructionFR = (content, delta, source, editor) => {
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

      return ele
    })

    const arrayCatPro = valueRecommend.map(ele => ele._id)

    const formData = new FormData();
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

    formData.append("tabProductDetailUK", JSON.stringify(tabProductDetailUK));
    formData.append("tabProductDetailUS", JSON.stringify(tabProductDetailUS));
    formData.append("tabProductDetailFR", JSON.stringify(tabProductDetailFR));
    formData.append("tabProductDetailDE", JSON.stringify(tabProductDetailDE));

    formData.append("tabSizeGuideUK", JSON.stringify(tabSizeGuideUK));
    formData.append("tabSizeGuideUS", JSON.stringify(tabSizeGuideUS));
    formData.append("tabSizeGuideFR", JSON.stringify(tabSizeGuideFR));
    formData.append("tabSizeGuideDE", JSON.stringify(tabSizeGuideDE));

    formData.append("tabMockupTemplateUK", JSON.stringify(tabMockupTemplateUK));
    formData.append("tabMockupTemplateUS", JSON.stringify(tabMockupTemplateUS));
    formData.append("tabMockupTemplateFR", JSON.stringify(tabMockupTemplateFR));
    formData.append("tabMockupTemplateDE", JSON.stringify(tabMockupTemplateDE));

    formData.append("tabCareInstructionUK", JSON.stringify(tabCareInstructionUK));
    formData.append("tabCareInstructionUS", JSON.stringify(tabCareInstructionUS));
    formData.append("tabCareInstructionFR", JSON.stringify(tabCareInstructionFR));
    formData.append("tabCareInstructionDE", JSON.stringify(tabCareInstructionDE));

    formData.append("customizationOptions", value.customizationOptions);
    formData.append("detailProduct", value.detailProduct);

    formData.append("optionMaterial_1", value.optionMaterial_1);
    formData.append("minName_1", value.minName_1);
    formData.append("maxName_1", value.maxName_1);
    formData.append("optionMaterial_2", value.optionMaterial_2);
    formData.append("minName_2", value.minName_2);
    formData.append("maxName_2", value.maxName_2);

    formData.append("valueMaterial_1", thickness);
    formData.append("valueMaterial_2", stretchiness);
    formData.append("featureProduct", value.featureProduct);

    formData.append("status", value.productStatus);
    formData.append("btnLink", value.btnLink);

    formData.append("descriptionUK", JSON.stringify(contentUK));
    formData.append("descriptionUS", JSON.stringify(contentUS));
    formData.append("descriptionFR", JSON.stringify(contentFR));
    formData.append("descriptionDE", JSON.stringify(contentDE));

    formData.append("currency", value.currency);
    formData.append("categoryProduct", JSON.stringify(arrayCatPro));
    formData.append("price", value.price);
    value.priceSale && formData.append("priceSale", value.priceSale);
    formData.append("variants", JSON.stringify(variant));
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
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

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
            <Slider onChange={onChangeThickness} />
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
            <Slider onChange={onChangeStretchiness} />
            <Controller
              name='featureProduct'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  rows={4}
                  multiline
                  sx={{ mt: 3 }}
                  fullWidth
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
                  <QuillNoSSRWrapper value={tabProductDetailUK} onChange={handleChangeTabProductDetailUK} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Product Details US
                  </Typography>
                  <QuillNoSSRWrapper value={tabProductDetailUS} onChange={handleChangeTabProductDetailUS} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Product Details FR
                  </Typography>
                  <QuillNoSSRWrapper value={tabProductDetailFR} onChange={handleChangeTabProductDetailFR} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Product Details DE
                  </Typography>
                  <QuillNoSSRWrapper value={tabProductDetailDE} onChange={handleChangeTabProductDetailDE} modules={modules} formats={formats} theme="snow" />
                </Box>
              </TabPanel>
              <TabPanel value='2'>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Size Guide UK
                  </Typography>
                  <QuillNoSSRWrapper value={tabSizeGuideUK} onChange={handleChangeTabSizeGuideUK} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Size Guide US
                  </Typography>
                  <QuillNoSSRWrapper value={tabSizeGuideUS} onChange={handleChangeTabSizeGuideUS} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Size Guide FR
                  </Typography>
                  <QuillNoSSRWrapper value={tabSizeGuideFR} onChange={handleChangeTabSizeGuideFR} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Size Guide DE
                  </Typography>
                  <QuillNoSSRWrapper value={tabSizeGuideDE} onChange={handleChangeTabSizeGuideDE} modules={modules} formats={formats} theme="snow" />
                </Box>
              </TabPanel>
              <TabPanel value='3'>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Mockup Template UK
                  </Typography>
                  <QuillNoSSRWrapper value={tabMockupTemplateUK} onChange={handleChangeTabMockupTemplateUK} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Mockup Template US
                  </Typography>
                  <QuillNoSSRWrapper value={tabMockupTemplateUS} onChange={handleChangeTabMockupTemplateUS} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Mockup Template FR
                  </Typography>
                  <QuillNoSSRWrapper value={tabMockupTemplateFR} onChange={handleChangeTabMockupTemplateFR} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Mockup Template DE
                  </Typography>
                  <QuillNoSSRWrapper value={tabMockupTemplateDE} onChange={handleChangeTabMockupTemplateDE} modules={modules} formats={formats} theme="snow" />
                </Box>
              </TabPanel>
              <TabPanel value='4'>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Care Instruction UK
                  </Typography>
                  <QuillNoSSRWrapper value={tabCareInstructionUK} onChange={handleChangeTabCareInstructionUK} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Care Instruction US
                  </Typography>
                  <QuillNoSSRWrapper value={tabCareInstructionUS} onChange={handleChangeTabCareInstructionUS} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Care Instruction FR
                  </Typography>
                  <QuillNoSSRWrapper value={tabCareInstructionFR} onChange={handleChangeTabCareInstructionFR} modules={modules} formats={formats} theme="snow" />
                </Box>
                <Box sx={{ mb: 5 }}>
                  <Typography variant='h6'>
                    Care Instruction DE
                  </Typography>
                  <QuillNoSSRWrapper value={tabCareInstructionDE} onChange={handleChangeTabCareInstructionDE} modules={modules} formats={formats} theme="snow" />
                </Box>
              </TabPanel>
            </TabContext>
          </Card>
          <Card sx={{ p: 4, mt: 6, textAlign: 'left' }}>
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
