<template>
  <div class="container">
  <van-tabs v-model="active">
  <van-tab title="选车">
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <van-grid :column-num="5">
      <van-grid-item v-for="value in 10" :key="value" icon="photo-o" text="文字" />
    </van-grid>
    <van-index-bar>
      <div v-for="(item,index) in first" :key="index">
        <van-index-anchor :index="item.firstChar" />
        <div v-for="(item,index) in item.firstSortList" :key="index">
          <van-cell :title="item.name" style="text-align:left" :icon="item.carIcon" @click="toDetail(item.sortId)"/>
        </div>
      </div>
    </van-index-bar>
  </van-tab>
  <van-tab title="新能源"></van-tab>
  <van-tab title="二手车">
  <div class="showGoods" >
    <ul class="goods-list" style="background: rgb(241, 239, 235);">
          <li v-for="(childItem, childIndex) in goodsList" :key="childIndex" @click="getGoodsDetail(childItem.goodsId)">
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
  </van-tab>
  <van-tab title="新车热卖"></van-tab>
</van-tabs>
  
  </div>
</template>

<script>

import req from '@/api/sort.js'
import req2 from '@/api/goods.js'
export default{
  name: 'classify',
  data () {
    return {
      oneClassifyList: [
        {
          classifyName: 'aaa'
        }
      ],
      first: [],
      second: [],
      currentClassify: {},
      goodsList:[]
    }
  },
  mounted () {
    this.getFirstSort(),
    this.getGoods()
  },
  methods: {
    getGoodsDetail (goodsId) {
      // sessionStorage.setItem('goodsDetail', JSON.stringify(data))
      // this.$router.push({path: '/goodsDetail'})
      req('getGoodsDetail',{goodsId:goodsId}).then(data =>{
            sessionStorage.setItem('goodsDetail', JSON.stringify(data.data.data))
            this.$router.push({path: '/goodsDetail'})
        })
    },
    getGoods () {
      req2('getGoods', {}).then(data => {
        this.goodsList = data.data.data
      },
      this.userId = sessionStorage.getItem('userId')
      )
    },
    toDetail(id){
      this.$router.push({path:'classifyList',query:{id:id}})
    },
    getFirstSort () {
      req('getFirstSort', {}).then(data => {
        console.log(JSON.stringify(data))
        this.first = data.data.data
        if (this.$route.query.sortId == null){
          this.currentClassify = this.first[0]
        }
        else{
          this.currentClassify = this.$route.query
        }
        this.getSecondSort(this.currentClassify)
      })
    },
    getSecondSort (item) {
      this.currentClassify = item
      req('getSecondSort', {...item}).then(data => {
        this.second = data.data.data
      })
    },
    getCommDetail (goodsId) {
      // sessionStorage.setItem('goodsDetail', JSON.stringify(item))
      // this.$router.push({path: '/goodsDetail'})
      req('getGoodsDetail',{goodsId:goodsId}).then(data =>{
            sessionStorage.setItem('goodsDetail', JSON.stringify(data.data.data))
            this.$router.push({path: '/goodsDetail'})
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
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
.van-cell {
  line-height:40px
}
/deep/ .van-index-anchor{
  text-align: left;
  background-color:#e9e9e9
}
.van-icon__image{
  width: 40px;
  height: 40px;
}
.price {
          font-size: 16px;
          color: rgb(255, 0, 0);
        }
.container {
  position: absolute;
  top: 0px;
  bottom: 0;
  width: 100%;
  height: 630px;
  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      

    }
    li.active {
      color: $pColor;
      background: #ddd;

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background:$pColor;
        margin-top: -10px;
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 78%;
    margin-bottom: 0px;
    .book-classify-item {
      .book-classify-item-title {
        // background: rgb(125, 134, 138);
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
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
          width: 40%;
          margin-bottom: 10px;
          margin-bottom: 10px;
          margin-right: 25px;
          img {
            width: 130px;
            height: 130px;
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
    }
  }
}
</style>
