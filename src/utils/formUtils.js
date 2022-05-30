import { format, isSameYear } from 'date-fns'

const formatDate = date =>
  !date
    ? 'No Date'
    : isSameYear(new Date(), date)
    ? format(date, 'dd.MMM')
    : format(date, 'dd.MM.yy')

export { formatDate }
