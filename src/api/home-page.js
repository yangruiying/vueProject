import req from '../fetch/index.js'

const config = {
  getGoodsById: {
    url: '/goods/getGoodsById',
    method: 'post'
  },
  getUserInfo: {
    url: '/user/getUserInfo',
    method: 'post'
  },
  getFansNum: {
    url: '/user/getFansNum',
    method: 'post'
  },
  getAttenNum: {
    url: '/user/getAttenNum',
    method: 'post'
  },
  getUserInfo: {
    url: '/user/getUserInfo',
    method: 'post'
  },
  getEvaluate: {
    url: '/evaluate/getEvaluate',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
