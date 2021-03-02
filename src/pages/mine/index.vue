<template>
<div>
<div class="userInfo">
    <div class="baseData">
      <img :src="userInfo.imagePath" @click="$router.push({path:'/home-page'})">
      <div>{{userInfo.userName}}</div>
    </div>
    <!-- <el-button  @click="$router.push({path: 'change-info'})">修改资料</el-button> -->

<div class="personData">
  <div class="contend" @click="$router.push({path:'fan'})">
    <div>粉丝</div>
    <div>{{fanNum}}</div>
  </div>

  <div  class="contend" @click="$router.push({path:'atten'})">
    <div>关注</div>
    <div>{{attenNum}}</div>
  </div>

  <div  class="contend" @click="$router.push({path:'collection'})">
    <div>收藏</div>
    <div>{{collectionNum}}</div>
  </div>

    <!-- <div  class="contend">
    <div>最近浏览</div>
    <div>{{attenNum}}</div>
  </div> -->
</div>
</div>
<div class="order">
<div class="orderCenter">
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
      attenNum: '',
      collectionNum:''
    }
  },
  mounted () {
    this.getFansNum()
    this.getAttenNum()
    this.getHmeInfo()
    this.getCollectionNum()
  },
  methods: {
    getCollectionNum(){
      req('getCollection',{userId: this.userId}).then(data => {
        this.collectionNum = data.data.data
      })
    },
    getHmeInfo () {
      sessionStorage.setItem('homeUserId',this.userId)
    },
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
    background-image: url("../../assets/mineBg.jpg");
    background-size: 100% 100%;
    padding-top: 20px;
    height: 180px;
    color: #fff;
    position: fixed;
    top: 0;
    .baseData{
      text-align: left;
      margin-left: 50px;
      margin-top: 20px;
      
      display: flex;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
      div{
        margin-left: 20px;
        margin-top: 10px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  .personData{
  display: flex;
  margin-top: 20px;
  .contend{
    flex: 1;
  }
}
}
.order{
  position: fixed;
  // background: blue;
  width: 100%;
  margin-top: 160px;
  .orderCenter{
    display: flex;
    width: 90%;
    background: #fff;
    
    // position: fixed;
    
    margin: 0 auto;
    
    
    border-radius: 5px;
    
    div{
        flex: 1;
        img{
            width: 35px;
            height: 35px;
        }
    }
}
}

</style>
