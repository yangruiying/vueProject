<template>
<div style="background: rgb(241, 239, 235);">
  <!-- <div class="search">
    <el-input placeholder="请输入搜索内容"></el-input>
  </div> -->
  <div class="topicTitle">{{topicTitle}}论坛</div>
    <div class="topic" v-for="(item,index) in goodsList" :key="index">
      <div class="usrInfo">
        <van-image
          round
          :src="item.imagePath"
          fit="fill"
        />
        <div class="userName">
          {{item.userName}}
        </div>
      </div>
      <div @click="getGoodsDetail(item.goodsId)">
      <div class="title">{{item.title}}</div>
      <div :class="item.imgLists.length > 1 ? 'imgList' : 'imgListSingle'">
        <van-image v-for="(item2,index2) in item.imgLists" :key="index2" fit="cover" :src="item2.url" />
      </div>
      </div>
      <div style="margin-top:10px;font-size:10px;text-align:left">
            {{item.updateTime}}
      </div>
      <van-divider />
  </div>

</div>
</template>

<script>
import req from '@/api/goods.js'
export default {
  data () {
    return {
      list: [
        {
          goodsName: 'aaa',
          goodsPrice: 25665
        },
        {
          goodsName: 'bbb',
          goodsPrice: 25665
        }
      ],
      goodsList: [],
      userId: sessionStorage.getItem('userId'),
      userInfo: sessionStorage.getItem('userInfo'),
      attenList: [],
      fansList: [],
      newList:[],
      city:sessionStorage.getItem("city"),
      cityGoodsList:[],
      hotGoodsList:[],
      topicTitle:this.$route.query.topicTitle,
      sortId:this.$route.query.sortId,
    }
  },
  mounted () {
    this.getGoods()
    this.getAttenList()
    this.getFans()
    this.getGoodsByCity()
    this.getNew()
    this.getHotGoods()
  },
  methods: {
    getHotGoods(){
      req("getHotGoods",{}).then(data => {
        this.hotGoodsList = data.data.data
      })
    },
    getNew(){
      req('getNew',{}).then(data => {
        this.newList = data.data.data
      })
    },
    getGoodsByCity () {
      req('getGoodsByCity', {cityName:this.city}).then(data => {
        this.cityGoodsList = data.data.data
      })
    },
    toClassify(sortId){
      this.$router.push({path:'/classify',query: {sortId:sortId}})
    },
    getGoods () {
      this.$route.meta.title[0].titleName="奥迪A4L论坛"
      req('getGoods', {type:3,sortId:this.sortId}).then(data => {
        this.goodsList = data.data.data
        console.log(JSON.stringify(this.goodsList))
      },
      this.userId = sessionStorage.getItem('userId')
      )
    },
    getGoodsDetail (goodsId) {
      // sessionStorage.setItem('goodsDetail', JSON.stringify(data))
      // this.$router.push({path: '/goodsDetail'})
      req('getGoodsDetail',{goodsId:goodsId}).then(data =>{
            sessionStorage.setItem('goodsDetail', JSON.stringify(data.data.data))
            this.$router.push({path: '/topicDetail'})
        })
    },
    getHomePage (userId) {
      sessionStorage.setItem("homeUserId",userId)
      this.$router.push({path: '/home-page'})
    },
    getAttenList () {
      req('getAttenGoodsList', {userId: this.userId}).then(data => {
        this.attenList = data.data.data
      })
    },
    getFans (){
      req('getFans',{}).then(data => {
        this.fansList = data.data.data
      })
    },
    
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.topicTitle{
  font-size: 23px;
  text-align: left;
  padding-left: 20px;
  background: white;
  font-weight: bold;
}
.van-divider{
  border-color: gray;
}
.topic{
  background: white;
  padding: 20px;
  padding-bottom: 1px;
  .title{
    font-size: 16px;
    text-align: left;
    width: 100%;
    word-wrap:break-word;
    margin-top: 10px;
  }
  .imgList{
    margin-top: 10px;
    height: 130px;
    width: 100%;
    display: flex;
    .van-image{
      flex:1
    }
  }
  .imgListSingle{
    margin-top: 10px;
    height: 200px;
    width: 100%;
    display: flex;
    .van-image{
      flex:1
    }
  }
 /deep/ .usrInfo{
   display: flex;
       .van-image{
      width: 40px;
      height: 40px;
      }
      .userName{
        margin-top: 5px;
        margin-left: 10px;
      }
    }
}

</style>
