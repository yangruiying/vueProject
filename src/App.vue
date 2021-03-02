<template>
  <div id="app">
    <router-view/>
<van-tabbar route v-show="$route.meta.footerShow">
  <van-tabbar-item replace to="/comm-home" icon="home-o">论坛</van-tabbar-item>
  <van-tabbar-item replace to="/classify" icon="logistics">选车</van-tabbar-item>
  <van-tabbar-item replace to="/publish" icon="cart-o">上架</van-tabbar-item>
  <van-tabbar-item replace to="/message" icon="chat-o">消息</van-tabbar-item>
  <van-tabbar-item replace to="/mine" icon="user-o">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #a6ff00; */
  /* color:primaryColor; */
  /* background: rgb(241, 239, 235); */
  
}
</style>
<style lang="scss">
@import "./styles/global.css";
@import "./styles/global.scss";
@import "./styles/iconfont/iconfont.css";
</style>
