import { Box } from '@mui/material'
import { useRef } from 'react'
import CustomBtn from '~/Components/CustomBtn/CustomBtn'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBox } from '~/Components/StyleComponents'
import { useAppDispatch } from '~/Hooks/useAppSelector'
import { AdvReduxActions } from '~/ReduxSaga/Adv/AdvRedux'
import { toast } from 'react-toastify'

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024

function InfoTemplate() {
  const dispatch = useAppDispatch()
  const fileInputRef: any = useRef(null)

  const handleButtonClick = () => {
    // Trigger the file input element when the button is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']

      if (!allowedFileTypes.includes(selectedFile.type)) {
        // Invalid file type
        toast.error('File đã chọn không nằm trong định dạng PDF, JPEG, PNG, or JPG')
        return
      }

      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        // File size exceeds the maximum allowed size
        toast.error('Size của file không được quá 5MB.')
        return
      }

      // You can now handle the selected file.
      const formData = new FormData()
      formData.append('file', selectedFile)
      dispatch(AdvReduxActions.addListCVRequest({ file: formData }))
    }
  }

  return (
    <div>
      <CustomText type={TEXT_TYPE.primary_18_700}>Hãy tải lên template CV mẫu:</CustomText>
      <FlexBox style={{ gap: 150, margin: '20px 0' }}>
        <div>
          <CustomText block type={TEXT_TYPE.primary_16_400}>
            Số lượng ảnh tối đa: 1
          </CustomText>
        </div>
        <div>
          <CustomText block type={TEXT_TYPE.primary_16_400}>
            Định dạng file: .pdf, .jpg, .jpeg, .png
          </CustomText>
          <CustomText block type={TEXT_TYPE.primary_16_400}>
            Dung lượng tối đa: 5MB
          </CustomText>
        </div>
      </FlexBox>
      <Box py={3}>
        <input
          accept='application/pdf, image/jpeg, image/png, image/jpg'
          style={{ display: 'none' }}
          id='pdf-upload'
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <CustomBtn onClick={handleButtonClick} text={'Chọn file'} width={'150px'} />
      </Box>
    </div>
  )
}

export default InfoTemplate
