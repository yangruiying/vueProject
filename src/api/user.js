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
  },
  getFansList:{
    url:'/user/getFansList',
    method:'post'
  },
  getAttenList:{
    url:'/user/getAttenList',
    method:'post'
  },
  getCollection:{
    url:'/goods/getCollection',
    method:'post'
  },
  getCollectionList:{
    url:'/goods/getCollectionList',
    method:'post'
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
