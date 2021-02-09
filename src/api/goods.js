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
  addCollection: {
    url: '/collection/addCollection',
    method: 'post'
  },
  delCollection: {
    url: '/collection/delCollection',
    method: 'post'
  },
  isCollection: {
    url: '/collection/isCollection',
    method: 'post'
  },
  getFans: {
    url: '/user/getFans',
    method: 'post'
  },
  addLeaveMessage: {
    url:'/goods/addLeaveMessage',
    method:'post'
  },
  getLeaveMessage:{
    url:'/goods/getLeaveMessage',
    method:'post'
  },
  addRecover:{
    url:'/goods/addRecover',
    method:'post'
  },
  updateGoodsInfo:{
    url:'/goods/updateGoodsInfo',
    method:'post'
  },
  getGoodsDetail:{
    url:'/goods/getGoodsDetail',
    method:'post'
  },
  getGoodsByCity:{
    url:'/goods/getGoodsByCity',
    method:'post'
  },
  getNew:{
    url:'/goods/getNew',
    method:'post'
  },
  getHotGoods:{
    url:'/goods/getHotGoods',
    method:'post'
  },
  addBrower:{
    url:'/goods/addBrower',
    method:'post'
  },
  getGoodsBySortId:{
    url:'/goods/getGoodsBySortId',
    method:'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
