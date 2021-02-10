import req from '../fetch/index.js'

const config = {
    getExpress: {
    url: '/order/getExpress',
    method: 'post'
  },
    shipGoods: {
      url:'/order/shipGoods',
      method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
