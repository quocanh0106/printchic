import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { FormInput } from '~/Components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { Colors } from '~/Themes'
import { NEWS_FIELD_NAME } from '../../fieldName'
import { messages } from '~/Constants/Messages'
import { useAppSelector } from '~/Hooks/useAppSelector'
import { RootState } from '~/Config/ReduxConfig/Store'

function MainText() {
  const { detailNews } = useAppSelector((state: RootState) => state.news)
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext()

  const handleEditorChange = (event: any, editor: any) => {
    console.log('evnet', event)
    const data = editor.getData()
    setValue(NEWS_FIELD_NAME.CONTENT, data) // You can handle the data here
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
        Tiêu đề
      </CustomText>
      <FormInput
        control={control}
        type={typeInputComponent.InputText}
        name={NEWS_FIELD_NAME.TITLE}
        label={'Tiêu đề'}
        placeholder={'Nhập tiêu đề'}
        hiddenTitle
        errorMessage={errors[NEWS_FIELD_NAME.TITLE]?.message || ''}
      />
      <CustomText
        block
        type={TEXT_TYPE.primary_20_700}
        customStyle={{
          borderLeft: `5px solid ${Colors.primary}`,
          paddingLeft: '7px',
          margin: '50px 0'
        }}
      >
        Nội dung
      </CustomText>
      <CKEditor editor={ClassicEditor} data={detailNews?.content} onChange={handleEditorChange} />
      {errors[NEWS_FIELD_NAME.CONTENT] ? <p style={{ color: 'red' }}>{messages.REQUIRED}</p> : <></>}
    </Container>
  )
}

export default MainText

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 28px 21px 28px 21px;
  border-radius: 8px;
  width: 100%;
`
