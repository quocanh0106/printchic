import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button, Box } from '@mui/material'
import axios from 'axios'
import Icon from 'src/@core/components/icon'

const ButtonUpload = ({getValues, setValue, id}) => { // ** States
    const [files, setFiles] = useState('')

    useEffect(() => {
        setFiles(getValues(`imageVariant-${id}`))
    },[])

    // ** Hooks
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        onDrop: async acceptedFiles => {
            const listFiles = acceptedFiles.map(file => Object.assign(file))
            const formData = new FormData();
            formData.append('file', listFiles[0])
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/cloudinary-upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            setValue(`imageVariant-${id}`, response.data?.secure_url)
            setFiles(response.data?.secure_url)
        }
    })

    return (
        <div>
            {
                files ?
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img style={{marginRight: '30px'}}  height={70} alt={files} className='single-file-image' src={files} />
                        <Icon icon='tabler:trash' fontSize={25} onClick={() => {
                            setValue(`imageVariant-${id}`, '')
                            setFiles('')
                        }} />
                    </Box>
                    :
                    <Button  {...getRootProps({ className: 'dropzone' })} variant='contained' sx={{ mr: 1 }}>
                        <input {...getInputProps()} />
                        Upload
                    </Button>
            }

        </div>
    )
}

export default ButtonUpload