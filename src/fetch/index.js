import axios from 'axios'
const qs = require('qs')
const req = function (url, method, params, requestHeader, fileConfig = {}) {
  let instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 60000,
  })
  // instance.interceptors.response.use(response => {
  //   response.headers('Access-Control-Allow-Origin', '*')
  // })
  let requestConfig = {
    url: url,
    method: method,
    data: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;',
      'token':sessionStorage.getItem("token")
    },
    responseType: fileConfig.type === 'file' ? 'blob' : ''
  }
  return instance(requestConfig)
}
export default req
