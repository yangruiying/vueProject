import req from '../fetch/index.js'

const config = {
  addOrder: {
    url: '/order/addOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
