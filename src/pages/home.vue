<template>
  <div>
    <el-container>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-header height="50px" v-show="!meta.headerHide">
        <div class="user-info">
          <span class="iconfont icon-fanhui" @click="back" v-show="meta.goBackShow"></span>
          <span
            v-for="(item, index) in titleList"
            :key="index"
            @click="toPage(item)"
            :class='[currentName === item.name ?"class1":"class2"]'>
            {{item.titleName}}
          </span>
        </div>
      </el-header>
      <el-footer v-show="meta.footerShow">
         <!-- 店长 -->
        <div @click="$router.push({path: '/comm-home'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <span class="iconfont icon-shouye" :style="{color: currentPath === '/comm-home' || currentPath === '/attention' || currentPath === '/location' ? '#C39862' : '#333333'}"></span>
          <div :style="{color: currentPath === '/comm-home' || currentPath === '/attention'  || currentPath === '/location'  ? '#C39862' : '#333333'}">首页</div>
        </div>
        <div @click="$router.push({path: '/classify'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <span class="iconfont icon-fenlei" :style="{color: currentPath === '/classify' ? '#C39862' : '#333333'}"></span>
          <div :style="{color: currentPath === '/classify' ? '#C39862' : '#333333'}">分类</div>
        </div>
        <div @click="$router.push({path: 'publish'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <span class="iconfont icon-iconfontzhizuobiaozhunbduan31" :style="{color: currentPath === '/publish' ? '#C39862' : '#333333'}"></span>
          <div :style="{color: currentPath === '/publish' ? '#C39862' : '#333333'}">上架</div>
        </div>
        <div @click="$router.push({path: '/message'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <div class="noRead" v-if="count !== 0">{{count}}</div>
          <span class="iconfont icon-xiaoxi" :style="{color: currentPath === '/message' ? '#C39862' : '#333333'}"></span>
          <div :style="{color: currentPath === '/message' ? '#C39862' : '#333333'}">消息</div>
        </div>
        <div @click="$router.push({path: '/mine'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <span class="iconfont icon-gerenzhongxin" :style="{color: currentPath === '/mine' ? '#C39862' : '#333333'}"></span>
          <div :style="{color: currentPath === '/mine' ? '#C39862' : '#333333'}">我的</div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import req from '@/api/chat.js'
export default {
  name: 'home',
  data () {
    return {
      mainStyle: {

      },
      userId: sessionStorage.getItem('userId'),
      count: '',
      chatList: '',
      test: 1
    }
  },
  computed: {
    titleList () {
      return this.$route.meta.title
    },
    goBackBtn () {
      return this.$route.meta.goBack
    },
    meta () {
      return this.$route.meta
    },
    currentPath () {
      return this.$route.path
    },
    currentName () {
      return this.$route.name
    },
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  },
  mounted() {
    this.conectWebSocket();
    this.noReadCount();
    this.getChatList()
  },
  methods: {
    back () {
      window.location.href = document.referrer
      window.history.back(-1)
    },
    toPage (data) {
      if (data.toPath !== this.$route.path) {
        this.$router.push({path: data.toPath})
      }
    },
    getChatList () {
      req('chatList', {userId: this.userId}).then(data => {
        this.chatList = data.data.data
        sessionStorage.setItem('chatList',JSON.stringify(this.chatList))
      })
    },
    noReadCount(){
      req('noReadCount' , {userId: this.userId}).then(data => {
        this.count = data.data.data
      })
    },  
    conectWebSocket () {
      var sel = this
      // 判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://localhost:8080/websocket/' + this.userId + 'home' + '/' + 'aaa')
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
        sel.noReadCount()
        sel.getChatList()
        sel.test=100
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
.class1{
  font-size: 23px;
  font-weight: 600;
  text-decoration:underline;
}
.class2{
  font-size: 16px;
}
.main-class1 {
  position: absolute;
  top: 0;
  bottom: 60px;
}

.main-class2 {
  position: absolute;
  top: 50px;
  bottom: 0;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: yellow;
  position: absolute;
  top: 0;
  position: fixed;
  width: 100%;
  .router-link-active {
    font-size: 25px;
    color: #409EFF;
    text-decoration: none;
  }

  .user-info {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 20px;
    width: 100%;

    .icon-fanhui {
      position: absolute;
      top: 50%;
      left: -20px;
      transform: translate(0, -50%);
    }

    span {
      margin: 0 10px;
    }

    .active {
      color: #C39862;
    }
  }
}

.el-main {
  padding: 0;
  width: 100%;
}

.el-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0;
  display: flex;
  position: fixed;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #ddd;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333333;

    img {
      width: 30px;
      height: 30px;
    }

    div {
      position: relative;
      top: 3px;
    }
  }
  .noRead{
    position: absolute;
    margin-left: 20px;
    margin-top: -10px;
    width: 19px;
    height: 19px;
    color: white;
    background: red;
    border-radius:15px;/*设置圆角*/
  }
}
</style>
