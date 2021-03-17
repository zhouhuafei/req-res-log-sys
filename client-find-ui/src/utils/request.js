import axios from 'axios'
import createSign from '@/utils/sign'

function request (options = {}) {
  options.data = options.data || options.params || {}
  options.data.timeStamp = Date.now()
  options.data.sign = createSign(options.data)
  if (options.method.toUpperCase() === 'GET') {
    options.params = options.data
  }
  return axios({
    ...options,
    params: options.params,
    data: options.data,
    url: window.API_URL + options.url
  }).then((res) => {
    return res.data.result
  })
}

export default request
