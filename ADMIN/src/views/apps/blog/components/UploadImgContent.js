import styled from '@emotion/styled'
import { Button, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { Fragment, forwardRef, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Icon from 'src/@core/components/icon'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: '10%',
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
      let tempListItemsContent = JSON.parse(JSON.stringify(listItemsContent))
      tempListItemsContent.map((ele) => {
        if (ele.id == id) {
          console.log('da vao', id)
          console.log('aaa', acceptedFiles.map(file => Object.assign(file)))
          ele.value = acceptedFiles.map(file => Object.assign(file))
        }

        return ele
      })
      setListItemContent(tempListItemsContent)
      // setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const img = listItemsContent?.value?.map(file => {
    console.log('file', file)
    return (
      <Box key={file.name} sx={{ position: 'relative' }}>
        <CustomCloseButton onClick={() => setFiles([])}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
        <img width={'89%'} key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
      </Box>
    )
  })

  return (
    <Box sx={{ width: '80%', mt: 5 }}>
      {
        listItemsContent?.value?.length ? img :
          <Button  {...getRootProps({ className: 'dropzone' })} variant='contained' sx={{ mr: 1, width: '80%' }}>
            <input {...getInputProps()} />
            Upload
          </Button>
      }
    </Box>
  )
}

export default UploadImgContent