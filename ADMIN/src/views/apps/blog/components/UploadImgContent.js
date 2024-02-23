import styled from '@emotion/styled'
import { Button, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment, forwardRef, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Icon from 'src/@core/components/icon'

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

function UploadImgContent({ id, listItemsContent, setListItemContent }) {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      let tempListItemsContent = [...listItemsContent]
      tempListItemsContent.map((ele) => {
        if (ele.id == id) {
          ele.value = acceptedFiles.map(file => Object.assign(file))
        }

        return ele
      })
      setListItemContent(tempListItemsContent)
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const img = listItemsContent?.map(ele => {
    if (ele.id === id && ele.value[0] && (ele.value[0].name || (typeof ele.value[0] === "string" && ele.value[0]))) {
      return (
        <Box key={ele.id} sx={{ position: 'relative' }}>
          <CustomCloseButton onClick={() => setFiles([])}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          {
            typeof ele.value[0] === "string" ?
              <img width={'100%'} className='single-file-image' src={ele.value[0]} />
              :
              <img width={'100%'} key={ele.value[0].name} alt={ele.value[0].name} className='single-file-image' src={URL.createObjectURL(ele.value[0])} />
          }
        </Box>
      )
    }
  })

  return (
    <Box sx={{ width: '80%', mt: 5 }}>
      {
        listItemsContent.find(ele => ele.id == id)?.value.length > 0 ? img :
          <Button  {...getRootProps({ className: 'dropzone' })} variant='contained' sx={{ width: '100%' }}>
            <input {...getInputProps()} />
            Upload
          </Button>
      }
    </Box>
  )
}

export default UploadImgContent