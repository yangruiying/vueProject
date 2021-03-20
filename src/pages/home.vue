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

      
      <el-footer v-show="false">
         <!-- 店长 -->
        <div @click="$router.push({path: '/comm-home'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <span class="iconfont icon-shouye" :style="{color: currentPath === '/comm-home' || currentPath === '/attention' || currentPath === '/location' ? config.pColor : '#333333'}"></span>
          <div :style="{color: currentPath === '/comm-home' || currentPath === '/attention'  || currentPath === '/location'  ? config.pColor : '#333333'}">论坛</div>
        </div>
        <div @click="$router.push({path: '/classify'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <span class="iconfont icon-fenlei" :style="{color: currentPath === '/classify' ? config.pColor : '#333333'}"></span>
          <div :style="{color: currentPath === '/classify' ? config.pColor : '#333333'}">分类</div>
        </div>
        <div @click="$router.push({path: 'publish'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <span class="iconfont icon-iconfontzhizuobiaozhunbduan31" :style="{color: currentPath === '/publish' ? config.pColor : '#333333'}"></span>
          <div :style="{color: currentPath === '/publish' ? config.pColor : '#333333'}">上架</div>
        </div>
        <div @click="$router.push({path: '/message'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <!-- <div class="noRead" v-if="count !== 0">{{count}}</div> -->
          <el-badge :value="count" v-if="count === 0" hidden="true">
          <span class="iconfont icon-xiaoxi" :style="{color: currentPath === '/message' ? config.pColor : '#333333'}"></span>
          <div :style="{color: currentPath === '/message' ? config.pColor : '#333333'}">消息</div>
          </el-badge>
          
          <el-badge :value="count" v-else>
          <span class="iconfont icon-xiaoxi" :style="{color: currentPath === '/message' ? config.pColor : '#333333'}"></span>
          <div :style="{color: currentPath === '/message' ? config.pColor : '#333333'}">消息</div>
          </el-badge>

        </div>
        <div @click="$router.push({path: '/mine'})">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <span class="iconfont icon-gerenzhongxin" :style="{color: currentPath === '/mine' ? config.pColor : '#333333'}"></span>
          <div :style="{color: currentPath === '/mine' ? config.pColor : '#333333'}">我的</div>
        </div>
      </el-footer>
      <van-tabbar route v-show="$route.meta.footerShow">
  <van-tabbar-item replace to="/comm-home" icon="home-o">论坛</van-tabbar-item>
  <van-tabbar-item replace to="/classify" icon="logistics">选车</van-tabbar-item>
  <van-tabbar-item replace to="/publish" icon="cart-o">上架</van-tabbar-item>
  <van-tabbar-item replace to="/message" icon="chat-o" :badge="count == 0 ? null : count">消息</van-tabbar-item>
  <van-tabbar-item replace to="/mine" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
    </el-container>
  </div>
</template>

<script>

import req from '@/api/chat.js'
import BMap from 'BMap'
// import BMap from 'http://api.map.baidu.com/api?v=2.0&ak=GeK4oOvKuNkv3ZHO4A8VDLpSZzzVNgiS'
export default {
  name: 'home',
  data () {
    return {
      mainStyle: {

      },
      color:'rgb(254,58,59)',
      userId: sessionStorage.getItem('userId'),
      count: '',
      chatList: '',
      test: 1,
      LocationCity:"正在定位"    //给渲染层定义一个初始值
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
    this.getChatList();
    this.city();
  },
  methods: {
    city(){    //定义获取城市方法
            const geolocation = new BMap.Geolocation();
            var _this = this
            geolocation.getCurrentPosition(function getinfo(position){
                let city = position.address.city;             //获取城市信息
                let province = position.address.province;    //获取省份信息
                _this.LocationCity = city
                sessionStorage.setItem("city",city)
            }, function(e) {
                _this.LocationCity = "定位失败"
            }, {provider: 'baidu'});		
        },
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
        this.getGlobal.count = this.count
      })
    },  
    conectWebSocket () {
      var sel = this
      // 判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
        this.websocket = new WebSocket('ws://'+this.config.baseurl+'/websocket/' + this.userId + 'home' + '/' + 'aaa')
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
@import "@/styles/global.scss";
.el-badge{
  position: absolute;
}
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
/deep/ .iconfont{
  font-size: 23px;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:$pColor;
  color: #ffffff;
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
  height: 56px !important; 
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
      width: 26px;
      height: 26px;
    }

    div {
      position: relative;
      top: 0px;
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
