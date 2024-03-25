// ** MUI Imports
import { Button, Card, CircularProgress, Dialog, DialogContent, Divider, Fade, MenuItem, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Custom Components Imports
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
import styled from '@emotion/styled'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { Slider } from 'antd'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { Fragment, forwardRef, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'src/@core/components/icon'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'
import { LANG, LANG_OBJECT } from 'src/constant'
import { fetchEvents } from 'src/store/apps/categoryProduct'
import { fetchInfoProduct, updateProduct } from 'src/store/apps/product'

// import Tabs
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'
import SunEditorWrapper from 'src/views/components/RichText/SunEditorWrapper'
import ButtonUpload from '../components/ButtonUpload'

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

  const [isVariantNeedUpdate, setIsVariantNeedUpdate] = useState(true)

  const [valueRecommend, setValueRecommend] = useState([])
  const [thickness, setThickness] = useState(0);
  const [stretchiness, setStretchiness] = useState(0);
  const [valueTabs, setValueTabs] = useState('1')

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

  const callBackSubmit = (data) => {
    if (data.success) {
      toast.success('Update Product created successfully', {
        duration: 2500
      })
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
    const anchor = document.querySelector('body')
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleChange = (event, newValue) => {
    setValueRecommend(newValue)
  }

  const compareFileArrays = (array1, array2) => {
    if (array1?.length !== array2?.length) {
      return false;
    }

    // Sắp xếp các mảng để đảm bảo các file được so sánh theo thứ tự
    array1.sort((a, b) => a.name.localeCompare(b.name));
    array2.sort((a, b) => a.name.localeCompare(b.name));

    // Kiểm tra từng cặp file
    for (let i = 0; i < array1.length; i++) {
      const file1 = array1[i];
      const file2 = array2[i];

      // So sánh tên, loại MIME, và kích thước
      if (file1.name !== file2.name || file1.type !== file2.type || file1.size !== file2.size) {
        return false;
      }

      // Nếu bạn cần so sánh nội dung, bạn cần thêm mã để đọc và so sánh nội dung tại đây
    }

    return true;
  }

  const onSubmit = (value) => {
    setLoading(true)
    let tempListOPtionVariant = JSON.parse(JSON.stringify(listOPtionVariant))

    let variant = tempListOPtionVariant.map((ele) => {
      ele.price = value[`price-${ele.id}`]
      ele.sku = value[`sku-${ele.id}`]
      ele.img = value[`imageVariant-${ele.id}`]

      return ele
    })


    const arrayCatPro = valueRecommend.map(ele => ele._id)

    const formData = new FormData();
    formData.append("productId", router.query.id);
    formData.append("titleUK", value.titleUK);
    formData.append("titleUS", value.titleUS);
    formData.append("titleFR", value.titleFR);
    formData.append("titleDE", value.titleDE);

    formData.append("metaTitleUK", value.metaTitleUK || '');
    formData.append("metaTitleUS", value.metaTitleUS || '');
    formData.append("metaTitleFR", value.metaTitleFR || '');
    formData.append("metaTitleDE", value.metaTitleDE || '');

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

    formData.append("tabProductDetailUK", tabProductDetailUK);
    formData.append("tabProductDetailUS", tabProductDetailUS);
    formData.append("tabProductDetailFR", tabProductDetailFR);
    formData.append("tabProductDetailDE", tabProductDetailDE);

    formData.append("tabSizeGuideUK", tabSizeGuideUK);
    formData.append("tabSizeGuideUS", tabSizeGuideUS);
    formData.append("tabSizeGuideFR", tabSizeGuideFR);
    formData.append("tabSizeGuideDE", tabSizeGuideDE);

    formData.append("tabMockupTemplateUK", tabMockupTemplateUK);
    formData.append("tabMockupTemplateUS", tabMockupTemplateUS);
    formData.append("tabMockupTemplateFR", tabMockupTemplateFR);
    formData.append("tabMockupTemplateDE", tabMockupTemplateDE);

    formData.append("tabCareInstructionUK", tabCareInstructionUK);
    formData.append("tabCareInstructionUS", tabCareInstructionUS);
    formData.append("tabCareInstructionFR", tabCareInstructionFR);
    formData.append("tabCareInstructionDE", tabCareInstructionDE);

    LANG.forEach(ele => {

      formData.append(`customizationOptionsLabel${ele.value}`, value[`customizationOptionsLabel${ele.value}`]);
      formData.append(`detailProductLabel${ele.value}`, value[`detailProductLabel${ele.value}`]);
      formData.append(`optionMaterialLabel${ele.value}`, value[`optionMaterialLabel${ele.value}`]);
      formData.append(`featureProductLabel${ele.value}`, value[`featureProductLabel${ele.value}`]);

      formData.append(`customizationOptions${ele.value}`, value[`customizationOptions${ele.value}`]);
      formData.append(`detailProduct${ele.value}`, value[`detailProduct${ele.value}`]);

      formData.append(`optionMaterial_1${ele.value}`, value[`optionMaterial_1${ele.value}`]);
      formData.append(`minName_1${ele.value}`, value[`minName_1${ele.value}`]);
      formData.append(`maxName_1${ele.value}`, value[`maxName_1${ele.value}`]);
      formData.append(`optionMaterial_2${ele.value}`, value[`optionMaterial_2${ele.value}`]);
      formData.append(`minName_2${ele.value}`, value[`minName_2${ele.value}`]);
      formData.append(`maxName_2${ele.value}`, value[`maxName_2${ele.value}`]);

      formData.append(`featureProduct${ele.value}`, value[`featureProduct${ele.value}`]);

      formData.append(`processingTime${ele.value}`, value[`processingTime${ele.value}`]);
      formData.append(`shippingTime${ele.value}`, value[`shippingTime${ele.value}`]);
      formData.append(`templateProduct${ele.value}`, value[`templateProduct${ele.value}`]);
    })
    formData.append(`valueMaterial_1`, thickness);
    formData.append(`valueMaterial_2`, stretchiness);

    formData.append("btnLink", value.btnLink);

    formData.append("status", value.productStatus);
    formData.append("descriptionUK", contentUK);
    formData.append("descriptionUS", contentUS);
    formData.append("descriptionFR", contentFR);
    formData.append("descriptionDE", contentDE);

    formData.append("currency", value.currency);
    formData.append("categoryProduct", JSON.stringify(arrayCatPro));
    formData.append("variants", JSON.stringify(variant));
    formData.append("price", value.price);
    value.priceSale && formData.append("priceSale", value.priceSale);

    if (compareFileArrays(files,)) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

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
  const { infoProduct } = useSelector(state => state.product)

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

    return file

  }

  useEffect(() => {
    dispatch(fetchEvents())
    dispatch(fetchInfoProduct({ productId: router.query.id }))
  }, [router.query.id, dispatch])

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
      setValue(`imageVariant-${ele.id}`, ele.img)
    })

    setListOptionVariant(data)
    setListVariant(tempVariant)
  }

  async function convertToFiles(array) {
    const files = await Promise.all(array.map(async (item) => {
      // Fetch the binary data from the URL
      const response = await fetch(item.path);
      if (!response.ok) {
        throw new Error(`Network response was not ok for ${item.path}`);
      }
      const blob = await response.blob();

      // Create a File object from the Blob
      const file = new File([blob], item.originalname, {
        type: item.mimetype,
      });

      return file;
    }));

    return files;
  }

  useEffect(() => {
    if (infoProduct) {

      const listFile = [];
      infoProduct?.media?.forEach(ele => {
        listFile.push(URLtoFile(ele.path))
      })

      const listCatPro = [];
      store.data.forEach(ele => {
        if (infoProduct?.categoryProduct?.includes(ele._id)) {
          listCatPro.push(ele)
        }
      })

      infoProduct?.variants && handleListVariant(infoProduct?.variants || '')
      setValue('titleUK', infoProduct?.titleUK || '')
      setValue('titleUS', infoProduct?.titleUS || '')
      setValue('titleFR', infoProduct?.titleFR || '')
      setValue('titleDE', infoProduct?.titleDE || '')

      setValue('metaTitleUK', infoProduct?.metaTitleUK || '')
      setValue('metaTitleUS', infoProduct?.metaTitleUS || '')
      setValue('metaTitleFR', infoProduct?.metaTitleFR || '')
      setValue('metaTitleDE', infoProduct?.metaTitleDE || '')

      setValue('handleUrlUK', infoProduct?.handleUrlUK || '')
      setValue('handleUrlUS', infoProduct?.handleUrlUS || '')
      setValue('handleUrlFR', infoProduct?.handleUrlFR || '')
      setValue('handleUrlDE', infoProduct?.handleUrlDE || '')

      setValue('metaDescriptionUK', infoProduct?.metaDescriptionUK || '')
      setValue('metaDescriptionUS', infoProduct?.metaDescriptionUS || '')
      setValue('metaDescriptionFR', infoProduct?.metaDescriptionFR || '')
      setValue('metaDescriptionDE', infoProduct?.metaDescriptionDE || '')

      setValue('typeUK', infoProduct?.typeUK || '')
      setValue('typeUS', infoProduct?.typeUS || '')
      setValue('typeFR', infoProduct?.typeFR || '')
      setValue('typeDE', infoProduct?.typeDE || '')

      setValue('tabProductDetailUK', infoProduct?.tabProductDetailUK || '')
      setValue('tabProductDetailUS', infoProduct?.tabProductDetailUS || '')
      setValue('tabProductDetailFR', infoProduct?.tabProductDetailFR || '')
      setValue('tabProductDetailDE', infoProduct?.tabProductDetailDE || '')

      setValue('tabSizeGuideUK', infoProduct?.tabSizeGuideUK || '')
      setValue('tabSizeGuideUS', infoProduct?.tabSizeGuideUS || '')
      setValue('tabSizeGuideFR', infoProduct?.tabSizeGuideFR || '')
      setValue('tabSizeGuideDE', infoProduct?.tabSizeGuideDE || '')

      setValue('tabMockupTemplateUK', infoProduct?.tabMockupTemplateUK || '')
      setValue('tabMockupTemplateUS', infoProduct?.tabMockupTemplateUS || '')
      setValue('tabMockupTemplateFR', infoProduct?.tabMockupTemplateFR || '')
      setValue('tabMockupTemplateDE', infoProduct?.tabMockupTemplateDE || '')

      setValue('tabCareInstructionUK', infoProduct?.tabCareInstructionUK || '')
      setValue('tabCareInstructionUS', infoProduct?.tabCareInstructionUS || '')
      setValue('tabCareInstructionFR', infoProduct?.tabCareInstructionFR || '')
      setValue('tabCareInstructionDE', infoProduct?.tabCareInstructionDE || '')

      LANG.forEach(ele => {
        setValue(`customizationOptions${ele.value}`, infoProduct?.[`customizationOptions${ele.value}`] || '')
        setValue(`detailProduct${ele.value}`, infoProduct?.[`detailProduct${ele.value}`] || '')
        setValue(`featureProduct${ele.value}`, infoProduct?.[`featureProduct${ele.value}`] || '')
        setValue(`optionMaterial_1${ele.value}`, infoProduct?.[`optionMaterial_1${ele.value}`] || '')
        setValue(`minName_1${ele.value}`, infoProduct?.[`minName_1${ele.value}`] || '')
        setValue(`maxName_1${ele.value}`, infoProduct?.[`maxName_1${ele.value}`] || '')
        setValue(`optionMaterial_2${ele.value}`, infoProduct?.[`optionMaterial_2${ele.value}`] || '')
        setValue(`minName_2${ele.value}`, infoProduct?.[`minName_2${ele.value}`] || '')
        setValue(`maxName_2${ele.value}`, infoProduct?.[`maxName_2${ele.value}`] || '')
        setValue(`customizationOptionsLabel${ele.value}`, infoProduct?.[`customizationOptionsLabel${ele.value}`] || '')
        setValue(`detailProductLabel${ele.value}`, infoProduct?.[`detailProductLabel${ele.value}`] || '')
        setValue(`optionMaterialLabel${ele.value}`, infoProduct?.[`optionMaterialLabel${ele.value}`] || '')
        setValue(`featureProductLabel${ele.value}`, infoProduct?.[`featureProductLabel${ele.value}`] || '')

        setValue(`processingTime${ele.value}`, infoProduct?.[`processingTime${ele.value}`] || '')
        setValue(`shippingTime${ele.value}`, infoProduct?.[`shippingTime${ele.value}`] || '')
        setValue(`templateProduct${ele.value}`, infoProduct?.[`templateProduct${ele.value}`] || '')
      })

      setValue('btnLink', infoProduct?.btnLink || 0)

      setStretchiness(infoProduct?.valueMaterial_2 || 0)
      setThickness(infoProduct?.valueMaterial_1 || 0)

      setValue('productStatus', infoProduct?.status)
      infoProduct?.descriptionUK && setContentUK(infoProduct?.descriptionUK || '')
      infoProduct?.descriptionUS && setContentUS(infoProduct?.descriptionUS || '')
      infoProduct?.descriptionFR && setContentFR(infoProduct?.descriptionFR || '')
      infoProduct?.descriptionDE && setContentDE(infoProduct?.descriptionDE || '')

      infoProduct?.tabProductDetailUK && setTabProductDetailUK(infoProduct?.tabProductDetailUK || '')
      infoProduct?.tabProductDetailUS && setTabProductDetailUS(infoProduct?.tabProductDetailUS || '')
      infoProduct?.tabProductDetailFR && setTabProductDetailFR(infoProduct?.tabProductDetailFR || '')
      infoProduct?.tabProductDetailDE && setTabProductDetailDE(infoProduct?.tabProductDetailDE || '')

      infoProduct?.tabSizeGuideUK && setTabSizeGuideUK(infoProduct?.tabSizeGuideUK || '')
      infoProduct?.tabSizeGuideUS && setTabSizeGuideUS(infoProduct?.tabSizeGuideUS || '')
      infoProduct?.tabSizeGuideFR && setTabSizeGuideFR(infoProduct?.tabSizeGuideFR || '')
      infoProduct?.tabSizeGuideDE && setTabSizeGuideDE(infoProduct?.tabSizeGuideDE || '')

      infoProduct?.tabMockupTemplateUK && setTabMockupTemplateUK(infoProduct?.tabMockupTemplateUK || '')
      infoProduct?.tabMockupTemplateUS && setTabMockupTemplateUS(infoProduct?.tabMockupTemplateUS || '')
      infoProduct?.tabMockupTemplateFR && setTabMockupTemplateFR(infoProduct?.tabMockupTemplateFR || '')
      infoProduct?.tabMockupTemplateDE && setTabMockupTemplateDE(infoProduct?.tabMockupTemplateDE || '')

      infoProduct?.tabCareInstructionUK && setTabCareInstructionUK(infoProduct?.tabCareInstructionUK || '')
      infoProduct?.tabCareInstructionUS && setTabCareInstructionUS(infoProduct?.tabCareInstructionUS || '')
      infoProduct?.tabCareInstructionFR && setTabCareInstructionFR(infoProduct?.tabCareInstructionFR || '')
      infoProduct?.tabCareInstructionDE && setTabCareInstructionDE(infoProduct?.tabCareInstructionDE || '')

      setValue('currency', infoProduct?.currency || '')
      setValueRecommend(listCatPro || '')
      setValue('price', infoProduct?.price || 0)
      setValue('priceSale', infoProduct?.priceSale || 0)

      convertToFiles(infoProduct?.media).then(files => {
        setFiles(files)
      }).catch(error => {
        console.error('Error converting to files:', error);
      });

    }
  }, [infoProduct, store, router.query.id,setValue, ])


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
          <Card sx={{ p: 4, mt: 4, textAlign: 'left' }}>
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
            <Typography variant='h5' sx={{ mb: 3 }}>
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
            <Typography variant='h5' sx={{ mb: 3 }}>
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
