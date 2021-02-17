import req from '../fetch/index.js'

const config = {
  getFirstSort: {
    url: '/sort/getFirstSort',
    method: 'post'
  },
  getSecondSort: {
    url: '/sort/getSecondSort',
    method: 'post'
  },
  getGoodsDetail:{
    url:'/goods/getGoodsDetail',
    method:'post'
  },
  getCarSort:{
    url:'/sort/getCarSort',
    method:'post'
  },
  getTopCar:{
    url:'/sort/getTopCar',
    method:'post'
  },
  searchCar:{
    url:'/sort/searchCar',
    method:'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
