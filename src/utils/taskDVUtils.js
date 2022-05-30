import {
  addDays,
  format,
  isAfter,
  isSameYear,
  isWithinInterval,
} from 'date-fns'

const formatDate = date =>
  isWithinInterval(date, {
    start: new Date(),
    end: addDays(new Date(), 7),
  })
    ? format(date, 'EEEE')
    : isSameYear(new Date(), date)
    ? format(date, 'dd.MMM')
    : format(date, 'dd.MM.yy')

const showStyles = (isTaskOpen, date) => {
  const colorDate = isAfter(new Date(), date)
    ? ' text-red-600 '
    : ' text-black '

  const showBorder = !isTaskOpen ? '  border-b-2 ' : ''

  return colorDate + showBorder
}

export { formatDate, showStyles }
