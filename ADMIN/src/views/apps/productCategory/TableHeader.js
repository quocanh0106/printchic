// ** MUI Imports
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import { styled } from '@mui/material/styles'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomAutocomplete from 'src/@core/components/mui/autocomplete'

// ** React Imports
import { useEffect, useCallback, useRef, useState } from 'react'

const TableHeader = props => {
  // ** State
  const [createDialog, setOpenCreateDialog] = useState(false)
  const [editDialog, setOpenEditDialog] = useState(false)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [categoryDescription, setcategoryDescription] = useState('')
  const [parentCategory, setparentCategory] = useState('')

  // ** Props
  const { plan, handlePlanChange, handleFilter, value } = props

  const searchProductCategory = () => {
    console.log('searchching')
  }

  const handleCreateDialogToggle = () => setOpenCreateDialog(!createDialog)

  const onSubmit = e => {
    setOpenCreateDialog(false)
    e.preventDefault()
  }

  // ** Styled Autocomplete component
  const Autocomplete = styled(CustomAutocomplete)(({ theme }) => ({
    '& fieldset': {
      border: 0
    },
    '& + .MuiAutocomplete-popper': {
      '& .MuiAutocomplete-listbox': {
        paddingTop: 0,
        height: '100%',
        maxHeight: 'inherit',
        '& .MuiListSubheader-root': {
          top: 0,
          fontWeight: 400,
          lineHeight: '15px',
          fontSize: '0.75rem',
          letterSpacing: '1px',
          color: theme.palette.text.disabled
        }
      },
      '& .MuiPaper-root': {
        border: 0,
        height: '100%',
        borderRadius: 0,
        boxShadow: 'none !important'
      },
      '& .MuiListItem-root.suggestion': {
        padding: 0,
        '& .MuiListItemSecondaryAction-root': {
          display: 'flex'
        },
        '& .MuiListItemButton-root: hover': {
          backgroundColor: 'transparent'
        },
        '&:not(:hover)': {
          '& .MuiListItemSecondaryAction-root': {
            display: 'none'
          },
          '&.Mui-focused, &.Mui-focused.Mui-focusVisible:not(:hover)': {
            '& .MuiListItemSecondaryAction-root': {
              display: 'flex'
            }
          },
          [theme.breakpoints.down('sm')]: {
            '&.Mui-focused:not(.Mui-focusVisible) .MuiListItemSecondaryAction-root': {
              display: 'none'
            }
          }
        }
      },
      '& .MuiAutocomplete-noOptions': {
        display: 'grid',
        minHeight: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(10)
      }
    }
  }))

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
      }}
    >
      <Box className='w-100' sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'end' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search for category'
          onChange={e => handleFilter(e.target.value)}
        />
        <CustomTextField
          select
          value={plan}
          sx={{ mr: 4, mb: 2 }}
          defaultValue='Select Plan'
          SelectProps={{ displayEmpty: true, value: plan, onChange: e => handlePlanChange(e) }}
        >
          <MenuItem value=''>Status</MenuItem>
          <MenuItem value='basic'>Basic</MenuItem>
          <MenuItem value='company'>Company</MenuItem>
          <MenuItem value='enterprise'>Enterprise</MenuItem>
          <MenuItem value='team'>Team</MenuItem>
        </CustomTextField>
        <Button
          sx={{ color: 'white', backgroundColor: '#7367F0', mb: 2, mr: 2 }}
          onClick={() => searchProductCategory()}
        >
          Search
        </Button>
        <Button sx={{ color: 'white', backgroundColor: '#7367F0', mb: 2 }} onClick={() => setOpenCreateDialog(true)}>
          Create
        </Button>
      </Box>
      {createDialog && (
        <Dialog maxWidth='sm' fullWidth onClose={handleCreateDialogToggle} open={createDialog}>
          <DialogTitle
            sx={{
              textAlign: 'start',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
              pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(8.5)} !important`]
            }}
          >
            <Typography variant='h5' component='span' sx={{ mb: 2 }}>
              NEW CATEGORY
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(10)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(8.5)} !important`]
            }}
          >
            <Box component='form' onSubmit={onSubmit}>
              <FormGroup sx={{ mb: 2, alignItems: 'end', flexWrap: ['wrap', 'nowrap'] }}>
                <CustomTextField
                  fullWidth
                  value={categoryTitle}
                  label='Title *'
                  sx={{ mb: [3, 0] }}
                  placeholder='Enter Permission Name'
                  onChange={e => setEditValue(e.target.value)}
                />
                
                <CustomTextField
                  rows={4}
                  fullWidth
                  sx={{ mb: [3, 0], mt: 4 }}
                  multiline
                  value={categoryDescription}
                  label='Description *'
                  defaultValue='Default Value'
                  onChange={e => setcategoryDescription(e.target.value)}
                  id='textarea-outlined-static'
                />

                <CustomTextField
                  fullWidth
                  value={parentCategory}
                  label='Parent Category *'
                  sx={{ mb: [3, 0], mt: 4 }}
                  placeholder='Enter Permission Name'
                  onChange={e => setEditValue(e.target.value)}
                />

                <Box sx={{display: 'flex', mt: 5}}> 
                  <Button onClick={() => setOpenCreateDialog(false)} variant='contained' sx={{ mt: 4, mr: 4 }}>
                    Cancel
                  </Button>
                  <Button type='submit' variant='contained' sx={{ mt: 4 }}>
                    Save
                  </Button>
                </Box>
              </FormGroup>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  )
}

export default TableHeader
