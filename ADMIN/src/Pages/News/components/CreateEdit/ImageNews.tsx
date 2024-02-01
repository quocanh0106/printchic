import { Box } from '@mui/material'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { messages } from '~/Constants/Messages'
import { Colors, Images } from '~/Themes'
import { getBase64FromFile } from '~/Utils'
import { NEWS_FIELD_NAME } from '../../fieldName'

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

function ImageNews({ fileUploadThumbnail, setFileUploadThumbnail, fileUploadBanner, setFileUploadBanner }: any) {
  const {
    setValue,
    formState: { errors }
  } = useFormContext()

  const fileInputRefThumbnail: any = useRef(null)
  const fileInputRefBanner: any = useRef(null)

  const handleButtonClickThumbnail = () => {
    // Trigger the file input element when the button is clicked
    if (fileInputRefThumbnail.current) {
      fileInputRefThumbnail.current.click()
    }
  }

  const handleButtonClickBanner = () => {
    // Trigger the file input element when the button is clicked
    if (fileInputRefBanner.current) {
      fileInputRefBanner.current.click()
    }
  }

  const handleFileChangeThumbnail = (e: any) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      // Define an array of allowed image MIME types
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'] // Add more as needed

      if (!allowedImageTypes.includes(selectedFile.type)) {
        // Invalid file type
        toast.error('Please select a valid image file (JPEG, PNG, GIF, SVG, etc.).')
        return
      }

      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        // File size exceeds the maximum allowed size
        toast.error('File size exceeds the maximum allowed size (5MB).')
        return
      }

      // You can now handle the selected image file.
      setFileUploadThumbnail(selectedFile)
      setValue(NEWS_FIELD_NAME.IMAGE_1, selectedFile)
    }
  }

  const handleFileChangeBanner = (e: any) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      // Define an array of allowed image MIME types
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'] // Add more as needed

      if (!allowedImageTypes.includes(selectedFile.type)) {
        // Invalid file type
        toast.error('Please select a valid image file (JPEG, PNG, GIF, SVG, etc.).')
        return
      }

      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        // File size exceeds the maximum allowed size
        toast.error('File size exceeds the maximum allowed size (5MB).')
        return
      }

      // You can now handle the selected image file.
      setFileUploadBanner(selectedFile)
      setValue(NEWS_FIELD_NAME.IMAGE_2, selectedFile)
    }
  }

  return (
    <Container>
      <CustomText
        block
        type={TEXT_TYPE.primary_20_700}
        customStyle={{
          borderLeft: `5px solid ${Colors.primary}`,
          paddingLeft: '7px',
          marginBottom: '20px'
        }}
      >
        Hình ảnh
      </CustomText>
      <div>
        <CustomText block type={TEXT_TYPE.primary_16_700}>
          Ảnh thumbnail hiển thị ngoài danh sách
        </CustomText>
        <CustomText block type={TEXT_TYPE.darkGrey_16_400}>
          Định dạng file: .jpg, .jpeg .png
        </CustomText>
        <CustomText block type={TEXT_TYPE.darkGrey_16_400}>
          Kích thước tối đa: 600 x 800 px
        </CustomText>
        <Box py={1}>
          <input
            accept='image/jpeg, image/png'
            style={{ display: 'none' }}
            id='image-upload'
            type='file'
            ref={fileInputRefThumbnail}
            onChange={handleFileChangeThumbnail}
          />
          {fileUploadThumbnail ? (
            <div style={{ width: '100%', position: 'relative' }}>
              <img
                width={'30px'}
                onClick={() => setFileUploadThumbnail('')}
                style={{ position: 'absolute', right: 10, top: 10 }}
                src={Images.deleteIcon}
                alt='image'
              />
              <img
                width={'100%'}
                style={{ borderRadius: '8px' }}
                src={getBase64FromFile(fileUploadThumbnail)}
                alt='image'
              />
            </div>
          ) : (
            <CustomBtn onClick={handleButtonClickThumbnail} text={'Chọn ảnh'} width={'150px'} />
          )}
        </Box>
        {errors[NEWS_FIELD_NAME.IMAGE_1] ? <p style={{ color: 'red' }}>{messages.REQUIRED}</p> : <></>}
      </div>
      <div style={{ marginTop: 40 }}>
        <CustomText block type={TEXT_TYPE.primary_16_700}>
          Banner hiển thị đầu trang chi tiết
        </CustomText>
        <CustomText block type={TEXT_TYPE.darkGrey_16_400}>
          Định dạng file: .jpg, .jpeg .png
        </CustomText>
        <CustomText block type={TEXT_TYPE.darkGrey_16_400}>
          Kích thước tối đa: 600 x 800 px
        </CustomText>
        <Box py={1}>
          <input
            accept='image/jpeg, image/png'
            style={{ display: 'none' }}
            id='image-upload'
            type='file'
            ref={fileInputRefBanner}
            onChange={handleFileChangeBanner}
          />
          {fileUploadBanner ? (
            <div style={{ width: '100%', position: 'relative' }}>
              <img
                width={'30px'}
                onClick={() => setFileUploadBanner('')}
                style={{ position: 'absolute', right: 10, top: 10 }}
                src={Images.deleteIcon}
                alt='image'
              />
              <img
                width={'100%'}
                style={{ borderRadius: '8px' }}
                src={getBase64FromFile(fileUploadBanner)}
                alt='image'
              />
            </div>
          ) : (
            <CustomBtn onClick={handleButtonClickBanner} text={'Chọn ảnh'} width={'150px'} />
          )}
        </Box>
        {errors[NEWS_FIELD_NAME.IMAGE_1] ? <p style={{ color: 'red' }}>{messages.REQUIRED}</p> : <></>}
      </div>
    </Container>
  )
}

export default ImageNews

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 28px 21px 28px 21px;
  border-radius: 8px;
  margin-top: 30px;
  width: 100%;
`
