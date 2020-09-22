<template>
  <div>
    <!-- <div class="banner"><span class="iconfont icon-fanhui" @click="$router.push({path: '/comm-home'})"></span></div> -->
    <div class="userInfo">
      <img :src="goodsDetail.imagePath"/>
      <div class="userName">{{goodsDetail.userName}}</div>
      <div v-if="isUserGoods === 0">
      <!-- <img src="../../assets/guanzhu.png" @click="addFans" v-if="getIsFan === 0" class="fans">
      <img src="../../assets/yiguanzhu.png" @click="cancelFans"  v-else class="fans"> -->
      <div class="fans">
      <el-button  @click="addFans"  v-if="getIsFan === 0" class="guanzhu">关注</el-button>
      <el-button  @click="cancelFans" v-else class="quguan">已关注</el-button>
      </div>
      </div>
    </div>
    <div class="price">
      <h3>￥{{goodsDetail.price}}</h3>
    </div>
    <div class="title">
      <h2>{{goodsDetail.title}}</h2>
    </div>
    <div class="intro">
      <h3>{{goodsDetail.intro}}</h3>
    </div>
    <div class="imgList">
      <div v-for="(item , index) in gooodsImgList" :key="index" ><img :src="item.url"></div>
    </div>
<div  v-if="isUserGoods === 0">
    <el-footer>
      <img src="../../assets/weizan.png" class="zan"  v-if="isFavor === 0" @click="addFavor">
      <img src="../../assets/yizan.png" class="zan" v-else @click="delFavor">
      <el-button @click="toChat">客服</el-button>
    </el-footer>
</div>
  </div>
</template>

<script>
import req from '@/api/goods.js'
import reqqq from '@/api/user.js'
export default {
  data () {
    return {
      goodsDetail: JSON.parse(sessionStorage.getItem('goodsDetail')),
      userId: sessionStorage.getItem('userId'),
      goodsId: JSON.parse(sessionStorage.getItem('goodsDetail')).goodsId,
      gooodsImgList: [],
      isUserGoods: '',
      formData: {
        userId: sessionStorage.getItem('userId'),
        fans: JSON.parse(sessionStorage.getItem('goodsDetail')).userId
      },
      getIsFan: '',
      isFavor: ''
    }
  },
  mounted () {
    this.getImgList()
    this.isFans()
    this.getIsUserGoods()
    this.getIsFavor()
  },
  methods: {
    toChat () {
      // sessionStorage.setItem('toUser')
      this.$router.push({path: '/chat'})
    },
    getImgList () {
      req('getImgList', {goodsId: this.goodsDetail.goodsId}).then(data => {
        this.gooodsImgList = data.data.data
      })
    },
    isFans () {
      reqqq('isFans', {...this.formData}).then(data => {
        this.getIsFan = data.data.data
      })
    },
    addFans () {
      reqqq('addFans', {...this.formData}).then(data => {
        this.isFans()
      })
    },
    cancelFans () {
      reqqq('cancelFans', {...this.formData}).then(data => {
        this.isFans()
      })
    },
    getIsUserGoods () {
      req('getIsUserGoods', {userId: this.userId, goodsId: this.goodsId}).then(data => {
        this.isUserGoods = data.data.data
      })
    },
    getIsFavor () {
      req('isFavor', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.isFavor = data.data.data
      })
    },
    addFavor () {
      req('addFavor', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.getIsFavor()
      })
    },
    delFavor () {
      req('delFavor', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.getIsFavor()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  display: flex;
  position: absolute;
  top: 15px;
}
.userInfo{
  position: relative;
  //display: flex;
  width: 100%;
  height: 50px;
  img{
    margin-left: 10px;
    height: 50px;
    width: 50px;
    margin-right: 10px;
    float: left;
  }
  .userName{
    float: left;
  }
  .fans{
    float: right;
    margin-right: 20px;
    .guanzhu{
      background: red;
      color: black;
      width: 80px;
    }
    .quguan{
      background: #c4cad1;
      color: black;
      width: 80px;
    }
  }
}
.price{
  display: flex;
  h3{
    margin-left: 10px;
    color: red;
  }
}
.title{
  display: flex;
  padding-left: 10px;
  width: 100%;
}
.intro{
  display: flex;
  padding-left: 10px;
  width: 100%;
}
.imgList{
  height: 370px;
  div{
    width: 100%;
    position: relative;
  }
  img{
    margin: 0 auto;
    width: 260px;
    height: 260px;
  }
}
.el-footer{
  display: flex;
  position: fixed;
  width: 100%;
  height: 15px;
  background:gray;
  bottom: 0;
  align-items: center;
  .el-button{
    position: fixed;
    right: 20px;
    background: red;
    width: 80px;
    font-size: 19px;
    color: white;
    border-radius: 10px;
    font-weight: 500;
  }
  .zan{
    width: 36px;
    height: 36px;
  }
}
</style>
