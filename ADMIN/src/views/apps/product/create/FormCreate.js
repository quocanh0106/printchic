// ** MUI Imports
import { Button, Card, MenuItem, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Controller, useForm } from 'react-hook-form'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Custom Components Imports
// import ReactQuill from 'react-quill';
import { useState } from 'react'
import { Box } from '@mui/system'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import Icon from 'src/@core/components/icon'

let count = 0
let countOption = 0

const FormCreate = () => {
  const [value, setValue] = useState('');
  const [listVariant, setListVariant] = useState([]);

  const onSubmit = (value) => {
    console.log('value', value)
  }

  const {
    control,
    handleSubmit,
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

  const handleAddVariant = () => {
    let tempListVariant = JSON.parse(JSON.stringify(listVariant))
    tempListVariant.push({ index: count + 1, option: [{index:  countOption + 1}] })
    setListVariant(tempListVariant)
    count++
    countOption++
  }

  const handleAddOptionVariant = (indexVariant) => {
    let tempListVariant = JSON.parse(JSON.stringify(listVariant))
    tempListVariant.forEach((variant) => {
      if (variant.index === indexVariant) {
        variant.option.push({index: countOption + 1})
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

  const removeOption = (indexVariant, indexOption) => {
    let tempListVariant = JSON.parse(JSON.stringify(listVariant))
    tempListVariant.forEach(variant => {
      if(variant.index == indexVariant) {
        variant.option = variant?.option?.filter(option => option.index != indexOption)
      }
    });
    setListVariant(tempListVariant)
  }

  return (
    <Grid container xs={12}>
      <Grid item xs={4}>
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
                error={Boolean(errors.select)}
                aria-describedby='validation-basic-select'
              >
                <MenuItem value='public'>Public</MenuItem>
                <MenuItem value='private'>Private</MenuItem>
              </CustomTextField>
            )}
          />
          <Controller
            name='ProductCategory'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                sx={{ mt: 4 }}
                select
                fullWidth
                defaultValue=''
                label='Product Category'
                SelectProps={{
                  value: value,
                  onChange: e => onChange(e)
                }}
                id='validation-basic-select'
                error={Boolean(errors.select)}
                aria-describedby='validation-basic-select'
              >
                <MenuItem value='1'>category 1</MenuItem>
                <MenuItem value='2'>category 2</MenuItem>
              </CustomTextField>
            )}
          />
          <Controller
            name='productType'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                sx={{ mt: 4 }}
                fullWidth
                defaultValue=''
                label='Product Type'
                SelectProps={{
                  value: value,
                  onChange: e => onChange(e)
                }}
                id='validation-basic-select'
                error={Boolean(errors.select)}
                aria-describedby='validation-basic-select'
              >
              </CustomTextField>
            )}
          />
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
                sx={{ mt: 4 }}
                fullWidth
                defaultValue=''
                label='Title'
                SelectProps={{
                  value: value,
                  onChange: e => onChange(e)
                }}
                id='validation-basic-select'
                error={Boolean(errors.select)}
                aria-describedby='validation-basic-select'
              >
              </CustomTextField>
            )}
          />
          <Box sx={{ mt: 4 }}>
            <Typography>
              Description
            </Typography>
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} />; */}
          </Box>
        </Card>
        <Card sx={{ p: 4, mt: 4 }}>
          <FileUploaderMultiple />
        </Card>
        <Card sx={{ p: 4, mt: 4 }}>
          <Controller
            name='sku'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                sx={{ mt: 4 }}
                fullWidth
                defaultValue=''
                label='SKU'
                SelectProps={{
                  value: value,
                  onChange: e => onChange(e)
                }}
                id='validation-basic-select'
                error={Boolean(errors.select)}
                aria-describedby='validation-basic-select'
              >
              </CustomTextField>
            )}
          />
          <Grid container xs={12} sx={{ mt: 4 }}>
            <Grid item xs={10} sx={{ pr: 4 }}>
              <Controller
                name='price'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    required
                    defaultValue=''
                    label='Pricing'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    aria-describedby='validation-basic-select'
                  >
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Controller
                name='currency'
                control={control}
                required
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    defaultValue=''
                    label='Currency'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    aria-describedby='validation-basic-select'
                  >
                    <MenuItem value='USD'>USD</MenuItem>
                    <MenuItem value='VND'>VND</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
          </Grid>
          <Controller
            name='stock'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                sx={{ mt: 4 }}
                fullWidth
                defaultValue=''
                label='Stock'
                SelectProps={{
                  value: value,
                  onChange: e => onChange(e)
                }}
                id='validation-basic-select'
                error={Boolean(errors.select)}
                aria-describedby='validation-basic-select'
              >
              </CustomTextField>
            )}
          />
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
                        sx={{ mt: 4, mr: 2 }}
                        fullWidth
                        label='Name Variant'
                        SelectProps={{
                          value: value,
                          onChange: e => onChange(e)
                        }}
                        id='validation-basic-select'
                        error={Boolean(errors.select)}
                        aria-describedby='validation-basic-select'
                      >
                      </CustomTextField>
                    )}
                  />
                  <Icon icon='tabler:trash' fontSize={25} onClick={() => removeVariant(el.index)} />
                </Box>
                <Box sx={{ ml: 5 }}>
                  {
                    el.option?.map(option => {
                      return <Box key={option.index} sx={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyItems: 'space-between' }}>
                        <Controller
                          name={`nameOption-${el.index}` + option.index}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <CustomTextField
                              sx={{ mt: 4, mr: 2 }}
                              fullWidth
                              label='Attribute'
                              SelectProps={{
                                value: value,
                                onChange: e => onChange(e)
                              }}
                              id='validation-basic-select'
                              error={Boolean(errors.select)}
                              aria-describedby='validation-basic-select'
                            >
                            </CustomTextField>
                          )}
                        />
                        <Icon icon='tabler:trash' fontSize={25} onClick={() => removeOption(el.index, option.index)}/>
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
          <Button onClick={handleAddVariant} sx={{ justifyContent: 'start', width: '100%' }}>
            Add options like size or color
          </Button>
        </Card>
      </Grid>
    </Grid>
  )
}

export default FormCreate
