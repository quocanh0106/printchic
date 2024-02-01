import { FlexBox } from '~/Components/StyleComponents'
import { Images } from '~/Themes'
import Utilities from '~/Utils/Util'

interface AccountColumnProps {
  fund: number | string
  id: string
  setOpenDialog: (isOpen: boolean) => void
  setCurrentUserClick: (id: string) => void
}

function AccountColumn({ id, fund, setOpenDialog, setCurrentUserClick }: AccountColumnProps) {
  return (
    <FlexBox style={{ justifyContent: 'end', alignItems: 'center' }}>
      <span>{Utilities.numberWithCommas(fund.toString())} VNĐ</span>
      <img
        onClick={() => {
          setOpenDialog(true)
          setCurrentUserClick(id)
        }}
        style={{ marginLeft: '7px', cursor: 'pointer' }}
        width='20px'
        src={Images.addMoreIcon}
        alt='add money icon'
      />
    </FlexBox>
  )
}

export default AccountColumn
