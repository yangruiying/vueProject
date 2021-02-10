<template>
<div>
<div class="userInfo">
    <img :src="userInfo.imagePath">
    <h3>{{userInfo.userName}}</h3>
    <div>粉丝数：{{fanNum}}</div>
    <div>关注：{{attenNum}}</div>
    <!-- <el-button  @click="$router.push({path: 'change-info'})">修改资料</el-button> -->
</div>
<div class="nav">
  <div class="content" @click="index1=0">上架的物品</div>
  <div class="content" @click="index1=1">评价</div>
</div>
<div  v-if="index1 === 1" class="evaluate">
  <div v-for="(item,index) in evaluateList" :key="index" class="evaluateItem">
     <img :src="item.indexPath">
     <span>{{item.message}}</span>
  </div>
</div>
<div class="showGoods" v-else>
    <ul class="goods-list">
          <li v-for="(childItem, childIndex) in goodsList" :key="childIndex" @click="getGoodsDetail(childItem)">
            <!-- <img :src="childItem.goodsImagePath" alt=""> -->
            <img :src="childItem.indexPath">
            <div>{{childItem.title}}</div>
            <div>
              ￥{{childItem.price}}
            </div>
          </li>
        </ul>
  </div>
</div>
</template>

<script>
import req from '@/api/home-page.js'
export default {
  data () {
    return {
      userInfo: [],
      userId: sessionStorage.getItem('homeUserId'),
      fanNum: '',
      attenNum: '',
      goodsList:[],
      evaluateList:[],
      index1:0
    }
  },
  mounted () {
    this.getHomeUser()
    this.getFansNum()
    this.getAttenNum()
    this.getGoods()
    this.getEvaluate()
  },
  methods: {
    getEvaluate(){
      req('getEvaluate',{userId:this.userId}).then(data => {
        this.evaluateList = data.data.data
      })
    },
    getHomeUser () {
      req('getUserInfo',{userId:this.userId}).then(data => {
        this.userInfo = data.data.data
      })
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
    },
    getGoods () {
      req('getGoodsById', {userId:this.userId}).then(data => {
        this.goodsList = data.data.data
      },
      this.userId = sessionStorage.getItem('userId')
      )
    },
    getGoodsDetail (data) {
      sessionStorage.setItem('goodsDetail', JSON.stringify(data))
      this.$router.push({path: '/goodsDetail'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.evaluate{
  text-align: left;
  .evaluateItem{
    margin-left: 20px;
    height: 60px;
    display: flex;
    img{
    width: 50px;
    height: 50px;
  }
  span{
    
    
  }
  }
  
}
.nav{
  display: flex;
  .content{
    padding: 10px;
    flex: 1;
  }
}
.userInfo{
    width: 100%;
    height: 100px;
    background: $pColor;
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
.goods-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;

        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 50%;
          margin-bottom: 10px;

          img {
            width: 150px;
            height: 150px;
          }

          div:nth-child(2) {
            font-size: 12px;
          }

          div:nth-child(3) {
            color: red;
            font-size: 14px;
            font-weight: bold;

            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
</style>
