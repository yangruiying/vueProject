<template>
<div>
  <!-- {{this.userId}}
  {{this.userInfo}} -->
  <div class="search">
    <el-input placeholder="请输入搜索内容"></el-input>
  </div>
  <!-- <div class="block">
    <span class="demonstration">热门商品</span>
    <el-carousel height="150px">
      <el-carousel-item v-for="(childItem, childIndex) in goodsList" :key="childIndex">
        <img :src="childItem.indexPath" @click="getGoodsDetail(childItem)">
      </el-carousel-item>
    </el-carousel>
  </div> -->
  <div class="sort">
    <div class="content">
      <img src="../../assets/shouji.png">
      <div>手机</div>
    </div>

    <div class="content">
      <img src="../../assets/tushu.png">
      <div>图书</div>
    </div>

    <div class="content">
      <img src="../../assets/shoe.png">
      <div>鞋</div>
    </div>

    <div class="content">
      <img src="../../assets/diannao.png">
      <div>电脑</div>
    </div>

    <div class="content">
      <img src="../../assets/fuzhuang.png">
      <div>服装</div>
    </div>
  </div>
  <div class="firstLayer">
    <div class="a1-1">
      <div>热门商品</div>
      <div class="getImage">
      <div><img class="leftImg" :src="goodsList[0].indexPath" @click="getGoodsDetail(childItem)"></div>
      <div><img class="rightImg" :src="goodsList[1].indexPath" @click="getGoodsDetail(childItem)"></div>
    </div>
    </div>

    <div class="a1-1">
      <div>热门卖家</div>
      <div class="getImage">
       <div><img class="leftImg" :src="fansList[0].imagePath" @click="getGoodsDetail(childItem)"></div>
       <div><img class="rightImg" :src="fansList[1].imagePath" @click="getGoodsDetail(childItem)"></div>
      </div>
    </div>

    <div class="a1-1">
      <div>同城商品</div>
      <div class="getImage">
      <div><img class="leftImg" :src="goodsList[0].indexPath" @click="getGoodsDetail(childItem)"></div>
      <div><img class="rightImg" :src="goodsList[1].indexPath" @click="getGoodsDetail(childItem)"></div>
      </div>
    </div>

    <div class="a1-1">
      <div>关注商品</div>
      <div class="getImage">
       <div><img class="leftImg" :src="fansList[0].imagePath" @click="getGoodsDetail(childItem)"></div>
       <div><img class="rightImg" :src="fansList[1].imagePath" @click="getGoodsDetail(childItem)"></div>
    </div>
  </div>
  </div>
  <div class="module-title">我的关注</div>
  <div class="showGoods">
    <ul class="book-list">
          <li v-for="(childItem, childIndex) in attenList" :key="childIndex" @click="getGoodsDetail(childItem)">
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
      fansList: []
    }
  },
  mounted () {
    this.getGoods()
    this.getAttenList()
    this.getFans()
  },
  methods: {
    getGoods () {
      req('getGoods', {}).then(data => {
        this.goodsList = data.data.data
      },
      this.userId = sessionStorage.getItem('userId')
      )
    },
    getGoodsDetail (data) {
      sessionStorage.setItem('goodsDetail', JSON.stringify(data))
      this.$router.push({path: '/goodsDetail'})
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
    width: 50px;
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
    margin-top: 10px;
  }
  .module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  background: #ddd;
  margin-top: 10px;
}
.showGoods{
  width: 100%;
  height: 350px;
}
.book-list {
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
