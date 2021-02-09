import req from '../fetch/index.js'

const config = {
  chatList: {
    url: '/chat/chatList',
    method: 'post'
  },
  addChat: {
    url: '/chat/addChat',
    method: 'post'
  },
  chatRecard: {
    url: '/chat/chatRecard',
    method: 'post'
  },
  getNewMsg: {
    url: '/chat/getNewMsg',
    method: 'post'
  },
  setRead: {
    url: '/chat/setRead',
    method: 'post'
  },
  noReadCount: {
    url: '/chat/noReadCount',
    method: 'post'
  },
  getIsOrder: {
    url: '/order/getIsOrder',
    method: 'post'
  },
  getOrderState: {
    url: '/order/getOrderState',
    method: 'post'
  },
  getGoodsDetail:{
    url:'/goods/getGoodsDetail',
    method:'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
