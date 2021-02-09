<template>
  <div id="app">
    <router-view/>
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
  margin-top: 50px;
  /* background: rgb(241, 239, 235); */
  
}
</style>
<style lang="scss">
@import "./styles/global.css";
@import "./styles/global.scss";
@import "./styles/iconfont/iconfont.css";
</style>
