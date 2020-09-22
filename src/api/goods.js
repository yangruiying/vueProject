import req from '../fetch/index.js'

const config = {
  getGoods: {
    url: '/goods/getGoodsList',
    method: 'post'
  },
  getAttenGoodsList: {
    url: '/goods/getAttenGoodsList',
    method: 'post'
  },
  addGoods: {
    url: '/goods/addGoods',
    method: 'post'
  },
  chatList: {
    url: '/chat/addChat',
    method: 'post'
  },
  getImgList: {
    url: '/goods/getImgList',
    method: 'post'
  },
  getIsUserGoods: {
    url: '/goods/getIsUserGoods',
    method: 'post'
  },
  addFavor: {
    url: '/favor/addFavor',
    method: 'post'
  },
  delFavor: {
    url: '/favor/delFavor',
    method: 'post'
  },
  isFavor: {
    url: '/favor/isFavor',
    method: 'post'
  },
  getFans: {
    url: '/user/getFans',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
