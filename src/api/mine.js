import req from '../fetch/index.js'

const config = {
  getGoodsById: {
    url: '/goods/getGoodsById',
    method: 'post'
  },
  getSellList: {
    url: 'order/getSellList',
    method: 'post'
  },
  getBuyList: {
    url: 'order/getBuyList',
    method: 'post'
  },
  getGoodsQuery: {
    url: '/goods/getGoodsQuery',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
