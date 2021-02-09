<template>
  <div>
    <!-- <div class="stap">
      <el-steps :space="1000" :active="0" finish-status="success" align-center>
        <el-step title="选择地址"></el-step>
        <el-step title="付款"></el-step>
        <el-step title="等待收货"></el-step>
      </el-steps>
    </div> -->
    <div class="goodsInfo">
      <img :src="indexPath">
      <span>{{title}}</span>
      <h3>￥{{price}}</h3>
    </div>
    <h3>选择地址</h3>
    <el-select v-model="formData.addressId" class="selectAddress">
      <el-option v-for="(item,index) in addressList" :key="index" :label="item.name + ' '+ item.phone + ' '+ item.privinceName + item.cityName + item.regionName + item.detailAddress" :value="item.addressId">
      </el-option>
    </el-select>
      <button @click="toAddAddress">新增地址</button>
      <button @click="addOrder">提交订单</button>
  </div>
</template>

<script>
import req from '@/api/address.js'
import req2 from '@/api/order.js'
export default {
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      addressList: [],
      info: '',
      indexPath: JSON.parse(sessionStorage.getItem('goodsDetail')).indexPath,
      title: JSON.parse(sessionStorage.getItem('goodsDetail')).title,
      price: JSON.parse(sessionStorage.getItem('goodsDetail')).price,
      ToUser: JSON.parse(sessionStorage.getItem('goodsDetail')).userId,
      websocket:null,
      formData: {
        goodsId: JSON.parse(sessionStorage.getItem('goodsDetail')).goodsId,
        buyer: sessionStorage.getItem('userId'),
        addressId: ''
      },
      formData2: {
        user1:sessionStorage.getItem('userId'),
        user2: JSON.parse(sessionStorage.getItem('goodsDetail')).userId,
        goodsId: JSON.parse(sessionStorage.getItem('goodsDetail')).goodsId,
        msg:"我已购买，请尽快发货"
      }
    }
  },
  mounted () {
    this.getUserAddress()
    this.conectWebSocket()
  },
  methods: {
    back () {
      window.location.href = document.referrer
      window.history.back(-1)
    },
    toAddAddress () {
      this.$router.push({path: '/add-address'})
    },
    getUserAddress () {
      req('userAddress', {userId: this.userId}).then(data => {
        this.addressList = data.data.data
      })
    },
    addOrder () {
      req2('addOrder', {...this.formData}).then(data => {
        this.send()
        this.$router.push({path: '/chat'})
      })
    },
    sentOrderInfo(){

    },
    // 发送消息
    send () {
      // var toUser = document.getElementById('toUser').value
      var socketMsg = {msg: "我已购买，请尽快发货", toUser: this.ToUser}
      // alert(this.ToUser)
      if (this.toUser === '') {
        // 群聊
        socketMsg.type = 1
      } else {
        // 单聊.
        socketMsg.type = 1
      }
       req('addChat', {...this.formData2}).then(data => {
        // this.nickname = data.data.data
        this.websocket.send(JSON.stringify(socketMsg))
      })
    },
    conectWebSocket () {
      var sel = this
      // 判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://localhost:8080/websocket/' + sel.userId + '/' + sel.formData.goodsId)
      } else {
        alert('Not support websocket')
      }
      // 连接发生错误的回调方法
      this.websocket.onerror = function () {
        sel.setMessageInnerHTML('error');
      }
      // 连接成功建立的回调方法
      this.websocket.onopen = function (event) {
        sel.setMessageInnerHTML('Loc MSG: 成功建立连接')
        
      }
      // 接收到消息的回调方法
      this.websocket.onmessage = function (event) {
        sel.setRead()
        setTimeout(() => {
        sel.ini()
      }, 500)
        sel.test=event.data
        sel.setMessageInnerHTML(event.data)
      }
      // 连接关闭的回调方法
      this.websocket.onclose = function () {
        sel.setMessageInnerHTML('Loc MSG:关闭连接')
      }
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        this.websocket.close()
      }
     
    },
     setMessageInnerHTML(){

      }

  }
}
</script>

<style lang="scss" scoped>
.stap{
  text-align: left;
  width: 100%;
  margin: 0 auto;
  
  .el-steps{
    
  }
}
.el-select{
  width: 100%;
}
.goodsInfo {
  width: 100%;
  height: 100px;
  img{
    float: left;
    width: 60px;
    height: 60px;
    margin-left: 20px;
  }
  span{
    float: left;
    margin-left: 20px;
  }
  h3{
    width: 50px;
    margin-left: auto;
    color: red;
  }
}
</style>
