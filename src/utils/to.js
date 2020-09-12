export default (promise) => {
  return promise.then((data) => {
    return [null, data]
  }).catch((error) => {
    try {
      return [JSON.parse(error.message)]
    } catch (err) {
      console.log('err when parsing json', err)
      return [error]
    }
  })
}
