import * as R from 'ramda'
export default class Utilities {
  /**
   * Remove fields with null or undefined values from an object.
   * This function uses Ramda library functions for object manipulation.
   *
   * @param obj - The input object from which to remove fields with null or undefined values.
   * @returns A new object with the fields containing null or undefined values removed.
   */
  static removeFieldNullInObj(obj: any) {
    if (typeof obj !== 'object') {
      return obj
    }

    const listFieldNull: any = R.keys(R.filter(R.isNil, obj))

    const newObj = R.omit(listFieldNull, obj)
    return newObj
  }

  /**
   * Truncate a text if its length exceeds a specified limit and add ellipsis.
   *
   * @param length - The maximum length of the text before truncation.
   * @param text - The input text to be truncated if needed.
   * @returns The truncated text with ellipsis if necessary, or the original text if it's within the limit.
   */
  static handleTextOverLength(length: number, text: string) {
    if (text.length > length) {
      return `${text.substring(0, length)}...`
    } else {
      return text
    }
  }

  /**
   * Format a string representing money by adding commas as thousands separators.
   * For example, "2000000" will be formatted as "2.000.000".
   *
   * @param money - The input money value as a string.
   * @returns The formatted money value with commas as thousands separators.
   */
  static numberWithCommas(money: string) {
    if (money) {
      const parts = money.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return parts.join(',')
    } else {
      return 0
    }
  }

  static getKeyByValue(object: any, value: any) {
    return Object.keys(object).find((key) => object[key] === value)
  }

  static checkTypeInputFile(url: string | undefined) {
    if (url === 'application/pdf') {
      return 'PDF'
    } else if (url === 'image/jpeg' || url === 'image/jpg') {
      return 'JPG'
    } else if (url === 'image/png') {
      return 'PNG'
    } else {
      return false
    }
  }
}
