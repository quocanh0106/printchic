import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { FormInput } from '~/Components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { typeInputComponent } from '~/Components/FormInput/helper'
import { Colors } from '~/Themes'
import { NEWS_FIELD_NAME } from '../../fieldName'
import { useAppSelector } from '~/Hooks/useAppSelector'
import { RootState } from '~/Config/ReduxConfig/Store'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
function StatusNews() {
  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext()
  const params = useParams()
  const { detailNews } = useAppSelector((state: RootState) => state.news)
  useEffect(() => {
    if (params.id) {
      setValue(NEWS_FIELD_NAME.STATUS, detailNews.status)
    }
  }, [params, detailNews])
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
        Trạng thái
      </CustomText>
      <FormInput
        control={control}
        type={typeInputComponent.InputRadio}
        name={NEWS_FIELD_NAME.STATUS}
        label={'Tìm kiếm'}
        errorMessage={errors[NEWS_FIELD_NAME.STATUS]?.message || ''}
        hiddenTitle
        options={[
          {
            label: 'Ẩn',
            value: 'INACTIVE'
          },
          {
            label: 'Hiển thị',
            value: 'ACTIVE'
          }
        ]}
      />
    </Container>
  )
}

export default StatusNews

const Container = styled.div`
  box-shadow: 0px 3px 10px 0px #00000040;
  padding: 28px 21px 28px 21px;
  border-radius: 8px;
`
