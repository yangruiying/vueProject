import req from '../fetch/index.js'

const config = {
  getGoodsByCity:{
    url:'/goods/getGoodsByCity',
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