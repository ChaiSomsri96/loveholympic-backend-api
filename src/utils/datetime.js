import moment from 'moment'

export const getDate = () => {
  const date = new Date(moment());
  const year = date.getFullYear();
  const month = +date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`
}

export const getHour = () => {
  const date = new Date(moment());
  return date.getHours();
}

export const getTime = () => {
  const date = new Date(moment());
  return date.getTime();
}
