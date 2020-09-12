const lowerCaseFirstLetter = (str) => {
  if (!str) {
    return ''
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}

const reverseString = (str) => {
  const arrayOfString = str.split('')
  const stringToArray = arrayOfString.reverse()
  return stringToArray.join('')
}

export default {
  lowerCaseFirstLetter,
  reverseString
}
