// import Utilities from './Util'
// import * as NavigationUtil  from './NavigationUtil'
import * as DateTimeUtil from './DateTimeUtil'
import * as AsyncStorage from './AsyncStorage'
// import * as Utilities from "./Util"
import i18next from 'i18next'

interface IOption {
  value: string | number
  label: string
}
const isEmpty = (value: string | any[]) => {
  if (!value || value.length === 0) {
    return true
  }
  return false
}

export const checkEmpty = (value: any) => {
  if (isEmpty(value) || value == -1 || value == '-1') {
    return true
  }
  return false
}

export const convertDataToOptionData = (data: any[], valueKey: string | null, labelKey: string | null) => {
  let result: IOption[] = []

  if (data && data.length > 0) {
    const _valueKey: string = valueKey ? valueKey : 'id'
    const _labelKey: string = labelKey ? labelKey : 'name'
    result = data.map((item: any) => {
      return {
        value: item[_valueKey],
        label: item[_labelKey]
      }
    })
  }

  return result
}

export const findLabelByValueInOptions = (options: any, value: any, valueKey: any, valueLabel: any) => {
  const resultOption = options.find((ele: any) => ele[valueKey] == value)
  return resultOption ? resultOption[valueLabel] : ''
}

export const convertBooleanToText = (value: boolean) => {
  if (value) {
    return 'Có'
  } else {
    return 'Không'
  }
}

export const convertGenderToText = (value: string) => {
  if (value === 'MALE') {
    return 'Male'
  } else if (value === 'FEMALE') {
    return 'Female'
  } else {
    return ''
  }
}

export const getBase64FromFile = (file: File) => {
  const objectURL = URL.createObjectURL(file)
  return objectURL
}

export const getImageBlobFromURL = (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'image.jpg', { type: blob.type })
        resolve(file)
      })
      .catch((error) => {
        console.error('Error fetching image:', error)
        reject(error)
      })
  })
}

export default {
  DateTimeUtil,
  AsyncStorage,
  i18next,
  convertBooleanToText,
  convertGenderToText
}
