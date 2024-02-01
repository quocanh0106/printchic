export interface IDistrict {
  status: number | null
  createdDate: Date | null
  createdBy: null | string
  updatedDate: null
  updatedBy: null
}
export interface IWard {
  code: null | string
  district?: IDistrict
}

export interface IHomeBanner {
  id?: number
  title?: string
  subTitle?: string
  urlDetail?: string
  urlImage?: string | string[]
}
