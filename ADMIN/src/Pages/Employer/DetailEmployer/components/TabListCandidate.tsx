import { useMemo, useState } from 'react'
import CustomTable from '~/Components/CustomTable/CustomTable'
import { dataKeysListCandidate, tableHeaderListCandidate } from '../config'

function TabListCandidate() {
  const [currentPage, setCurrentPage] = useState(1)
  console.log('currentPage', currentPage)
  const dataTable = useMemo(() => {
    const tempData = [
      {
        id: 1,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 2,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 3,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 4,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 5,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 6,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 7,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 8,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 9,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      },
      {
        id: 10,
        fullName: 'Nguyễn Văn Thành',
        gender: 'Nam',
        country: '08/09/2023Nhật Bản, Hàn Quốc',
        job: 'Công xưởng, Chế biến thực phẩm, Chế biến thủy sản, Khách sạn, nhà hàng, Lái xe, lái máy, Thủy sản, ngư nghiệp',
        registerDate: '08/09/2023'
      }
    ]
    return tempData
  }, [])

  return (
    <div>
      <CustomTable
        data={dataTable}
        pageCount={10}
        headerCells={tableHeaderListCandidate}
        dataKeys={dataKeysListCandidate}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default TabListCandidate
