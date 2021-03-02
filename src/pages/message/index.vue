<template>
  <div>
    <van-nav-bar
    
      title="消息"
      
    />
  <div class="chatframe" v-for="(item,index) in chatList" :key="index" @click="getChatDetail(item)">
    <div>
    <div style="width:90px">
      <el-badge :value="item.readCount" v-if="item.readCount === '0'" hidden="true">
        <img :src="item.imagePath">
      </el-badge>

      <el-badge :value="item.readCount" v-else>
        <img :src="item.imagePath">
      </el-badge>
      <!-- <div class="noRead" v-if="item.readCount !== '0'"><span>{{item.readCount}}</span></div> -->
    </div>
    </div>
    <div>
      <div class="mid">
        <div class="name">{{item.userName}}</div>
        <div class="msg">{{item.msg}}</div>
      </div>
    </div>


    <div class="goodsState">
    <div v-if="item.own === userId">
      <div v-if="item.state !== null">
        <div v-if="item.state === '0'">
            请尽快发货
        </div>

        <div v-if="item.state === '1'">
            等待买家收货
        </div>

        <div v-if="item.state === '2'">
            等待买家评价
        </div>
        </div>
    </div>

    <div v-if="item.own !== userId">
      <div v-if="item.state !== null">
        <div v-if="item.state === '0'">
            等待发货
        </div>

        <div v-if="item.state === '1'">
            卖家已发货
        </div>

         <div v-if="item.state === '2'">
            等待评价
        </div>
        </div>
    </div>
  </div>


    <div><img :src="item.indexPath"></div>
  </div>
  </div>
</template>

<script>
import req from '@/api/chat.js'
// import { use } from 'vue/types/umd'
export default {
  name: 'chat',
  data () {
    return {
      websocket: null,
      nickname: null,
      chatList: [],
      userId: sessionStorage.getItem('userId'),
      goodsId: '111',
      newMsgList: [],
      isBuyList: []
    }
  },
  mounted () {
    this.getChatList()
    this.conectWebSocket()
  },
  methods: {
    getIsOrder(user2,goodsId){
      req('getIsOrder',{user1:this.userId,user2:user2,goodsId:goodsId}).then(data => {
        this.isBuyList.push(data.data.data)
      })
    },
    getChatList () {
      req('chatList', {userId: this.userId}).then(data => {
        this.chatList = data.data.data
      })
    },
    getNewMsg(user,goodsId) {
      return req('getNewMsg' , {user1:this.userId , user2:user , goodsId: goodsId})
    },
    getChatDetail (data) {
      sessionStorage.setItem('goodsDetail', JSON.stringify(data))
      this.$router.push({path: '/chat'})
    },
    conectWebSocket () {
      var sel = this
      // 判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://localhost:8081/websocket/' + sel.userId + '/' + sel.goodsId)
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
        sel.getChatList()
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
      
      }
  }
}
</script>

<style lang="scss" scoped>

.chatframe{
  border-bottom-width:1px;
  border-color:rgb(12, 10, 10);
  border-style:solid;
  border-top: none;
  border-left: none;
  border-right: none;
  position: relative;
  display: flex;
  width: 100%;
  height: 68px;
  margin-top: 10px;
  img{
    width: 50px;
    height: 50px;
  }
  div{
    flex: 1;
    .mid{
      float: left;
       .name{
         font-weight: bold;

      }
        .msg{
          margin-top: 5px;
         
      }
    }
   
  }
  .goodsState{
    color: red;
  }
}
.noRead{
  position: relative;
  margin-top: -60px;
  margin-left: 60px;
  font-weight: bold;
  font-size: 15px;
  width: 19px;
  height: 16px;
  color: white;
  background: red;
  border-radius:15px;/*设置圆角*/
  padding-bottom: 2px;
  span{
    position: relative;
    margin: 0 auto;
  }
}
</style>
