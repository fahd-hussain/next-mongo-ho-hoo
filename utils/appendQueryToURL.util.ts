const appendQueryToURL = (url: string, params: {}) => {
  if (typeof params !== 'object') return url

  const paramsArr: string[] = []

  Object.entries(params).forEach((item) => {
    if (Array.isArray(item[0])) {
      item[0].forEach((paramsVal: string) => {
        paramsArr.push(`${item[1]}[]=${paramsVal}`)
      })
    } else {
      paramsArr.push(`${item[0]}=${item[1]}`)
    }
  })

  return `${url}?${paramsArr.join('&')}`
}

export default appendQueryToURL
