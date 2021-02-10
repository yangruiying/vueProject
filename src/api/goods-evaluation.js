import req from '../fetch/index.js'

const config = {
    addEvaluate:{
        url: '/evaluate/addEvaluate',
        method: 'post'
    },
    changeState:{
        url: '/order/changeState',
        method: 'post'
    }
}

const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
  }
  
  export default request