import req from '../fetch/index.js'

const config = {
  addAddress: {
    url: '/address/addAddress',
    method: 'post'
  },
  listArea: {
    url: '/address/listArea',
    method: 'post'
  },
  userAddress: {
    url: '/address/userAddress',
    method: 'post'
  },
  addChat: {
    url: '/chat/addChat',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
