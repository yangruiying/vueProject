<template>
<div>
<div class="userInfo">
    <img :src="userInfo.imagePath">
    <h3>{{userInfo.userName}}</h3>
    <div>粉丝数：{{fanNum}}</div>
    <div>关注：{{attenNum}}</div>
    <el-button  @click="$router.push({path: 'change-info'})">修改资料</el-button>
</div>
<div class="order">
    <div class="publish"  @click="$router.push({path: 'mine-publish'})">
        <img src="../../assets/dingdan.png">
        <div>我发布的</div>
    </div>

    <div class="sell" @click="$router.push({path: 'mine-sell'})">
        <img src="../../assets/jinbi.png">
        <div>我卖出的</div>
    </div>

    <div class="buy" @click="$router.push({path: 'mine-buy'})">
        <img src="../../assets/gouwu.png">
        <div>我买到的</div>
    </div>
</div>
</div>
</template>

<script>
import req from '@/api/user.js'
export default {
  data () {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
      userId: sessionStorage.getItem('userId'),
      fanNum: '',
      attenNum: ''
    }
  },
  mounted () {
    this.getFansNum()
    this.getAttenNum()
  },
  methods: {
    getFansNum () {
      req('getFansNum', {userId: this.userId}).then(data => {
        this.fanNum = data.data.data
      })
    },
    getAttenNum () {
      req('getAttenNum', {userId: this.userId}).then(data => {
        this.attenNum = data.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userInfo{
    width: 100%;
    height: 100px;
    background: aqua;
    padding-top: 20px;
    img{
        width: 50px;
        height: 50px;
        float: left;
        margin-left: 20px;
    }
    h3{
        float: left;
        margin-left: 20px;
    }
}
.order{
    display: flex;
    div{
        flex: 1;
        img{
            width: 35px;
            height: 35px;
        }
    }
}
</style>
