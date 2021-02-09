<template>
<div style="background: rgb(241, 239, 235);">
  <!-- <div class="search">
    <el-input placeholder="请输入搜索内容"></el-input>
  </div> -->
  <div class="sort">
    <div class="content">
      <img src="../../assets/shouji.png" @click="toClassify(1)">
      <div>数码</div>
    </div>

    <div class="content" @click="toClassify(3)">
      <img src="../../assets/tushu.png">
      <div>图书</div>
    </div>

    <div class="content" @click="toClassify(2)">
      <img src="../../assets/shoe.png">
      <div>鞋</div>
    </div>

    <div class="content" @click="toClassify(5)">
      <img src="../../assets/dianqi.png">
      <div>电器</div>
    </div>

    <div class="content" @click="toClassify(4)">
      <img src="../../assets/fuzhuang.png">
      <div>服装</div>
    </div>
  </div>
  <div class="firstLayer">
    <div class="a1-1">
      <div>热门商品</div>
      <div class="getImage">
      <div><img class="leftImg" :src="hotGoodsList[0].indexPath" @click="getGoodsDetail(hotGoodsList[0].goodsId)"></div>
      <div><img class="rightImg" :src="hotGoodsList[1].indexPath" @click="getGoodsDetail(hotGoodsList[1].goodsId)"></div>
    </div>
    </div>

    <div class="a1-1">
      <div>热门卖家</div>
      <div class="getImage">
       <div><img class="leftImg" :src="fansList[0].imagePath" @click="getHomePage(fansList[0].userId)"></div>
       <div><img class="rightImg" :src="fansList[1].imagePath" @click="getHomePage(fansList[1].userId)"></div>
      </div>
    </div>

    <!-- <div class="a1-1">
      <div>同城商品</div>
      <div class="getImage">
      <div><img class="leftImg" :src="cityGoodsList[0].indexPath" @click="getGoodsDetail(cityGoodsList[0].goodsId)"></div>
      <div><img class="rightImg" :src="cityGoodsList[1].indexPath" @click="getGoodsDetail(cityGoodsList[1].goodsId)"></div>
      </div>
    </div> -->

    <div class="a1-1">
      <div>最新发布</div>
      <div class="getImage">
       <div><img class="leftImg" :src="newList[0].indexPath" @click="getGoodsDetail(newList[0].goodsId)"></div>
       <div><img class="rightImg" :src="newList[1].indexPath" @click="getGoodsDetail(newList[1].goodsId)"></div>
    </div>
  </div>
  </div>
  <div class="module-title">为您推荐</div>
  
  <div class="showGoods" >
    <ul class="goods-list" style="background: rgb(241, 239, 235);">
          <li v-for="(childItem, childIndex) in attenList" :key="childIndex" @click="getGoodsDetail(childItem.goodsId)">
              <el-card  :body-style="{ padding: '0px' }">
                <img :src="childItem.indexPath" class="image">
                <div style="padding: 14px;">
                  <span>{{childItem.title}}</span>
                  <div class="bottom clearfix">
                    <!-- <time class="time">{{ currentDate }}</time> -->
                    <price class="price">￥{{childItem.price}}</price>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                  </div>
                </div>
              </el-card>
          </li>
        </ul>
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
      hotGoodsList:[]
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
      },
      this.userId = sessionStorage.getItem('userId')
      )
    },
    getGoodsDetail (goodsId) {
      // sessionStorage.setItem('goodsDetail', JSON.stringify(data))
      // this.$router.push({path: '/goodsDetail'})
      req('getGoodsDetail',{goodsId:goodsId}).then(data =>{
            sessionStorage.setItem('goodsDetail', JSON.stringify(data.data.data))
            this.$router.push({path: '/goodsDetail'})
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
