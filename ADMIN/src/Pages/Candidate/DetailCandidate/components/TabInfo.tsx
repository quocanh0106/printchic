import { styled } from 'styled-components'
import CustomText, { TEXT_TYPE } from '~/Components/CustomText'
import { FlexBoxStart } from '~/Components/StyleComponents'
import { Colors } from '~/Themes'
import { convertBooleanToText } from '~/Utils'

function TabInfo(detailCandidate: any) {
  return (
    <>
      <ContactContainer>
        <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ color: Colors.primary }}>
          SỨC KHỎE
        </CustomText>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Chiều cao (cm)
            </CustomText>
            <p>{detailCandidate.height || '0'}</p>
          </div>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Cân nặng (kg)
            </CustomText>
            <p>{detailCandidate.weight || '0'}</p>
          </div>
        </FlexBoxStart>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Thị lực (1-10)
            </CustomText>
            <p>10</p>
          </div>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Hình xăm
            </CustomText>
            <p>{convertBooleanToText(detailCandidate.isTattoo)}</p>
          </div>
        </FlexBoxStart>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Viêm gan B
            </CustomText>
            <p>{convertBooleanToText(detailCandidate.isHepatitis)}</p>
          </div>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Hút thuốc
            </CustomText>
            <p>{convertBooleanToText(detailCandidate.isSmoking)}</p>
          </div>
        </FlexBoxStart>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Bệnh di truyền
            </CustomText>
            <p>{convertBooleanToText(detailCandidate.isGeneticDisease)}</p>
          </div>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Tiền sử bệnh lí
            </CustomText>
            <p>{convertBooleanToText(detailCandidate.diseaseHistory)}</p>
          </div>
        </FlexBoxStart>
      </ContactContainer>
      <BasicContainer>
        <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ color: Colors.primary }}>
          KINH NGHIỆM
        </CustomText>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Công việc đi XKLĐ
            </CustomText>
            <p>Chưa có trong api</p>
          </div>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Kinh nghiệm XKLĐ
            </CustomText>
            <p>Chưa có trong api</p>
          </div>
        </FlexBoxStart>
      </BasicContainer>
      <BasicContainer>
        <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ color: Colors.primary }}>
          HỌC VẤN
        </CustomText>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Tốt nghiệp
            </CustomText>
            <p>Chưa có trong api</p>
          </div>
          <div>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Bằng nghề
            </CustomText>
            <p>Chưa có trong api</p>
          </div>
        </FlexBoxStart>
        <FlexBoxStart style={{ marginTop: 20 }}>
          <div style={{ width: '50%' }}>
            <CustomText type={TEXT_TYPE.secondary_20_700} customStyle={{ fontSize: 18 }}>
              Ngoại ngữ
            </CustomText>
            <p>{detailCandidate?.languages?.join(', ') || 'Không'}</p>
          </div>
        </FlexBoxStart>
      </BasicContainer>
      <div></div>
    </>
  )
}

export default TabInfo

const ContactContainer = styled.div`
  box-shadow: 0px 4px 4px 0px #bdbdbd80;
  border-radius: 8px;
  padding: 20px;
`

const BasicContainer = styled.div`
  box-shadow: 0px 4px 4px 0px #bdbdbd80;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
`
