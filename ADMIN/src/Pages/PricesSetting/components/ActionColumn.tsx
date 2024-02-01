import { FlexBoxAlignCenter } from '~/Components/StyleComponents'
import { Images } from '~/Themes'

function ActionColumn({ data, openDialogEditPrice }: any) {
  return (
    <FlexBoxAlignCenter onClick={() => openDialogEditPrice(data)} style={{ gap: 10, justifyContent: 'center' }}>
      <img src={Images.editIcon} alt='edit icon' />
      <p>Chỉnh sửa</p>
    </FlexBoxAlignCenter>
  )
}

export default ActionColumn
