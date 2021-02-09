<template>
  <div>
    <span class="aaa">{{chatInfo}}</span>
      <div class="banner">
        <span class="iconfont icon-fanhui" @click="back"></span>
        <h3>{{formData.userName}}</h3>
      </div>
<div class="msgframe">

<div v-for="(item, index) in chatInfo" :key="index" class="chatShow1">
  <div class="chatShowA" v-if="item.userId === formData.user1">
      <img :src="formData.user1Img">
      <div><span>{{item.msg}}</span></div>
  </div>
  <div class="chatShowB" v-else>
    <img :src="formData.imagePath">
    <div><span>{{item.msg}}</span></div>
  </div>
</div>
</div>
<div class="goodsInfo">
  <img :src="formData.indexPath" @click="getCommDetail">
  <span>￥{{formData.price}}</span>
        <div class="buy">
          <div v-if="role === 1">
            <!-- <img src="../../assets/buy.png"> -->
            <el-button v-if="state === null || state === ''||state===3"  @click="$router.push({path: 'select-address'})">立即购买</el-button>
            <el-button v-else-if="state === 0">等待发货</el-button>
            <el-button v-else-if="state === 1" @click="$router.push({path: 'order-detail'})">已发货</el-button>
            <el-button v-else-if="state === 2" @click="$router.push({path: 'goods-evaluation',query:{orderId:orderId}})">立即评价</el-button>
            <!-- <el-button v-else-if="state === 3" @click="$router.push({path: 'order-detail'})">交易完成</el-button> -->
          </div>

          <div v-if="role === 0">
            <!-- <img src="../../assets/buy.png"> -->
            <el-button v-if="state === 0" @click="$router.push({path: '/ship-goods'})">立即发货</el-button>
            <el-button v-else-if="state === 1" @click="$router.push({path: 'order-detail'})">等待收货</el-button>
            <el-button v-else-if="state === 2" @click="$router.push({path: 'order-detail'})">等待评价</el-button>
            <!-- <el-button v-else-if="state === 3">交易完成</el-button> -->
          </div>
        </div>
</div>
<div class="sentMsg">
<div>消息：</div>
<div><input id="text" type="text" /></div>
<div><button @click="send" >发送消息</button></div>
</div>
  </div>
</template>

<script>
import reqqq from '@/api/chat.js'
export default {
  name: 'chat',
  data () {
    return {
      websocket: null,
      nickname: null,
      userId: sessionStorage.getItem('userId'),
      ToUser: JSON.parse(sessionStorage.getItem('goodsDetail')).userId,
      formData: {
        user1: sessionStorage.getItem('userId'),
        user2: JSON.parse(sessionStorage.getItem('goodsDetail')).userId,
        msg: '',
        goodsId: JSON.parse(sessionStorage.getItem('goodsDetail')).goodsId,
        imagePath: JSON.parse(sessionStorage.getItem('goodsDetail')).imagePath,
        indexPath: JSON.parse(sessionStorage.getItem('goodsDetail')).indexPath,
        user1Img: JSON.parse(sessionStorage.getItem('userInfo')).imagePath,
        userName: JSON.parse(sessionStorage.getItem('goodsDetail')).userName,
        price: JSON.parse(sessionStorage.getItem('goodsDetail')).price,
        own: JSON.parse(sessionStorage.getItem('goodsDetail')).own
      },
      chatRecard: [],
      chatInfo: [],
      goodsDetail: [],
      test: 0,
      role: '',
      state: '',
      orderId:''
    }
  },
  mounted () {
    this.getChatRecard()
    this.conectWebSocket()
    this.setRead()
    this.getRole()
    this.getOrderState()
    setTimeout(() => {
      this.ini()
    }, 500)
  },
  methods: {
    getCommDetail () {
      // sessionStorage.setItem('goodsDetail', JSON.stringify(item))
      // this.$router.push({path: '/goodsDetail'})
      reqqq('getGoodsDetail',{goodsId:this.formData.goodsId}).then(data =>{
            sessionStorage.setItem('goodsDetail', JSON.stringify(data.data.data))
            this.$router.push({path: '/goodsDetail'})
        })
    },
    back () {
      window.location.href = document.referrer
      window.history.back(-1)
    },
    getOrderState () {
      reqqq('getOrderState',{user1:this.userId,user2:this.formData.user2,goodsId:this.formData.goodsId}).then(data =>{
        this.orderId = data.data.data.orderId
        this.state = data.data.data.state
        sessionStorage.setItem('orderId',data.data.data.orderId)
      })
    },
    setRead () {
      reqqq('setRead', {...this.formData})
    },
    getRole () {
      if(this.userId == this.formData.own){
        this.role = 0
      }
      else{
        this.role = 1
      }
    },
    conectWebSocket () {
      var sel = this
      // 判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://'+this.config.baseurl+'/websocket/' + sel.userId + '/' + sel.formData.goodsId)
      } else {
        alert('Not support websocket')
      }
      // 连接发生错误的回调方法
      this.websocket.onerror = function () {
        sel.setMessageInnerHTML('error')
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
    // 将消息显示在网页上
    setMessageInnerHTML (innerHTML) {
      // var msg = innerHTML.split(':')[1]
      var userIdd = innerHTML.split(':')[0]
      var msg = innerHTML.split(':')[1]
      var goodsId = innerHTML.split(':')[2]
      if (this.formData.goodsId === goodsId) {
      // alert(userIdd)
        let info = {userId: userIdd, msg: msg}
        this.chatInfo.push(info)
      // document.getElementById('message').innerHTML += innerHTML + '<br/>'
      }
    },
    // 关闭连接
    closeWebSocket () {
      this.websocket.close()
    },

    // 发送消息
    send () {
      // 获取输入的文本信息进行发送
      var message = document.getElementById('text').value
      this.formData.msg = message
      // var toUser = document.getElementById('toUser').value
      var socketMsg = {msg: message, toUser: this.ToUser}
      // alert(this.ToUser)
      if (this.toUser === '') {
        // 群聊
        socketMsg.type = 1
      } else {
        // 单聊.
        socketMsg.type = 1
      }
       reqqq('addChat', {...this.formData}).then(data => {
        // this.nickname = data.data.data
        this.websocket.send(JSON.stringify(socketMsg))
      })
    },
    //更新未读消息
    ini(){
      var socketMsg = {msg: '921310952', toUser: this.userId+'home'}
      socketMsg.type = 1
      this.websocket.send(JSON.stringify(socketMsg))
    },
    getChatRecard () {
      reqqq('chatRecard', {...this.formData}).then(data => {
        this.chatRecard = data.data.data
        for (let item of this.chatRecard) {
        // document.getElementById('message').innerHTML += item.msg + '<br/>'
          this.chatInfo.push({userId: item.user1, msg: item.msg})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.aaa{
  position: absolute;
  bottom: 1000px;
}
.banner{
  top: 0;
  position: fixed;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background: #bdb7b7;
  h3{
    margin: 0 auto;
  }
}
.goodsInfo{
  border: 1px solid;
  position: fixed;
  width: 100%;
  background: white;
  img{
    width: 50px;
    height: 50px;
    float: left;
    margin-left: 5px;
  }
  span{
    float: left;
    margin-left: 20px;
    color: red;
  }
.buy{
    float:right;
    color:blue;
    .el-button{
      float: right;
      margin-top: 10px;
      margin-right: 10px;
      height: 30px;
      background: red;
      color: white;
    }
    span{
      color: #000;
    }
  }
}
.sentMsg{
  bottom: 0;
  width: 100%;
  // display: flex;
  position: fixed;
  background: #bdb7b7;
  height: 50px;
  padding-top: 10px;
  input{
    width: 60%;
    margin: 0 auto;
    height: 30px;
  }
  button{
    height: 35px;
    border-radius: 5px;
  }
  div{
    // float: left;
    display: inline;
  }
}
#message{
            margin-top:40px;
            border:1px solid gray;
            padding:20px;
        }
.msgframe{
  //height: 500px;
  position: relative;
  height: 565px;
  width: 100%;
  float: left;
  margin-top: 50px;
}
.chatShow1{
  width: 100%;
  margin-top: 20px;
  .chatShowA{
    //display: flex;
    width: 100%;
    //display: inline-block;
    height: 50px;
    // float: right;
    //margin-left: 1000px;
    img{
      float: right;
      width: 50px;
      height: 50px;
    }
    div{
      margin-right: auto;
      flex: 1;
      background-image: url(../../assets/a.png);
      background-size: 100% 100%;
      height: 50px;
      align-items: center;
      display: flex;
      float: right;
      margin-right: 20px;
      span{
      padding: 50px;
      flex: 1;
      float: right;
    }
    }
  }
  .chatShowB{
    width: 100%;
    height: 50px;
    margin-right: auto;
    align-items: center;
    div{
      flex: 1;
      background-image: url(../../assets/b.png);
      background-size: 100% 100%;
      height: 50px;
      align-items: center;
      display: flex;
      float: left;
      margin-left: 20px;
    span{
      padding: 10px;
      float: left;
      flex: 1;
    }
    }
    img{
      float: left;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
