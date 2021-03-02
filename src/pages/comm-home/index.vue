<template>
<div style="background: rgb(241, 239, 235);">
  <!-- <div class="search">
    <el-input placeholder="请输入搜索内容"></el-input>
  </div> -->
  
  <van-nav-bar
      title="论坛"
    />
     <van-icon name="add"  class="addIcon" @click="$router.push({path:'/topicAdd'})"/>
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
            <Time :time="new Date(item.updateTime).getTime()" />
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
      time1: (new Date()).getTime() - 60 * 3 * 10000,
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
      req('getGoods', {}).then(data => {
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
    }
    
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.addIcon{
  color: rgb(47, 0, 255);
  font-size: 50px;
  position: fixed;
  bottom: 80px;
  z-index: 999;
  right: 20px;

}
.topicImg{
  margin: 5px;
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
    height: 100px;
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
.price {
    font-size: 16px;
    color: rgb(255, 0, 0);
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    // height: 150px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

.firstLayer{
  display: flex;
  width: 95%;
  flex-wrap: wrap;
  border-radius: 10px;
  margin: 0 auto;
  background:white;
  margin-top: 10px;
  .a1-1{
    width: 50%;
    height: 100px;
    .getImage{
      width: 80%;
      margin: 0 auto;
      display: flex;
      height: 30px;
      flex-wrap: wrap;
      div{       
        width: 50%;
        height: 80px;
        .leftImg{
          width: 100%;
          height: 100%;
          border-bottom-left-radius: 10px;
          border-top-left-radius: 10px;
        }
        .rightImg{
          width: 100%;
          height: 100%;
          border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;
        }
      }
    }
  }
}
.sort{
  width: 90%;
  display: flex;
  margin-top: 30px;
  background:white;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  .content{
    // width: 50px;
    flex: 1;
    img{
      width: 30px;
      height: 30px;
    }
    span{
      width: 100%;
    }
  }

}
 .el-carousel__item img {
width:50%; height:100%;  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .search{
    display: flex;
    width: 95%;
    margin: 0 auto;
    margin-top: 0px;
  }
  .module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color:$pColor;
  background: #ddd;
  margin-top: 10px;
}
.showGoods{
  width: 95%;
  margin:0 auto;
  margin-bottom: 50px;
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
      .icon-jiazai{
        font-size: 200px;
        color: royalblue;
      }
</style>
