import req from '../fetch/index.js'

const config = {
  addOrder: {
    url: '/order/addOrder',
    method: 'post'
  },
  getTrack: {
    url: '/order/getTrack',
    method: 'post'
  },
  getOrderExpress: {
    url: '/order/getOrderExpress',
    method: 'post'
  },
  changeState: {
    url: '/order/changeState',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
