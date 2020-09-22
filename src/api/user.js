import req from '../fetch/index.js'

const config = {
  getUserInfo: {
    url: '/user/getUserInfo',
    method: 'post'
  },
  isFans: {
    url: '/user/isFans',
    method: 'post'
  },
  addFans: {
    url: '/user/addFans',
    method: 'post'
  },
  cancelFans: {
    url: '/user/cancelFans',
    method: 'post'
  },
  getFansNum: {
    url: '/user/getFansNum',
    method: 'post'
  },
  getAttenNum: {
    url: '/user/getAttenNum',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
