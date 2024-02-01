import moment from 'moment'

export const formatDate = (date: string | Date | undefined, type: string) => {
  if (!date) {
    return null
  }
  return moment(date, 'DD/MM/YYYY').format(type)
}
