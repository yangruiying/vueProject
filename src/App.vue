<template>
  <div id="app">
    <router-view/>

  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      count:0
    }
  },
  mounted() {
    setTimeout(()=>{   //设置延迟执行
    this.count = this.getGlobal.count
},1000);
  },
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
