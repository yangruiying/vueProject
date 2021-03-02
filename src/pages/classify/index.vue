<template>
  <div class="container">
  <van-tabs v-model="active">
  <van-tab title="选车">
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <van-grid :column-num="4">
      <van-grid-item v-for="value in topList" :key="value" :icon="value.carIcon" :text="value.name"  @click="toDetail(value.sortId,value.name)"/>
    </van-grid>
    <van-grid :column-num="4">
      <van-grid-item @click="$router.push({path:'classifySearch',query:{value3:1}})">
        <el-radio v-model="firstPay" :label="0.3" border size="small">5-8万</el-radio>
      </van-grid-item>
      <van-grid-item @click="$router.push({path:'classifySearch',query:{value3:2}})">
        <el-radio v-model="firstPay" :label="0.3" border size="small">8-15万</el-radio>
      </van-grid-item>
      <van-grid-item @click="$router.push({path:'classifySearch',query:{value3:3}})">
        <el-radio v-model="firstPay" :label="0.3" border size="small">15-20万</el-radio>
      </van-grid-item>
      <van-grid-item @click="$router.push({path:'classifySearch',query:{value3:4}})">
        <el-radio v-model="firstPay" :label="0.3" border size="small">20-30万</el-radio>
      </van-grid-item>
    </van-grid>
    <van-grid :column-num="4">
      <van-grid-item @click="$router.push({path:'classifySearch',query:{value1:0}})">
        <el-radio v-model="firstPay" :label="0.3" border size="small">轿车</el-radio>
      </van-grid-item>
      <van-grid-item @click="$router.push({path:'classifySearch',query:{value1:1}})">
        <el-radio v-model="firstPay" :label="0.3" border size="small">SUV</el-radio>
      </van-grid-item>
      <van-grid-item @click="$router.push({path:'classifySearch',query:{value1:2}})">
        <el-radio v-model="firstPay" :label="0.3" border size="small">跑车</el-radio>
      </van-grid-item>
      <van-grid-item @click="$router.push({path:'classifySearch'})">
        <el-radio v-model="firstPay" :label="0.3" border size="small">更多条件</el-radio>
      </van-grid-item>
    </van-grid>
    
      <van-index-bar style="padding-bottom:60px">
      <div v-for="(item,index) in first" :key="index">
        <van-index-anchor :index="item.firstChar" />
        <div v-for="(item,index) in item.firstSortList" :key="index">
          <van-cell :title="item.name" style="text-align:left" :icon="item.carIcon" @click="toDetail(item.sortId,item.name)"/>
        </div>
      </div>
    </van-index-bar>
    
  </van-tab>
  
  <van-tab title="二手车" v-if="$route.query.toPath == null">
   
  <sencondCarList bannerShow="false"></sencondCarList>
  </van-tab>
</van-tabs>
  
  </div>
</template>

<script>

import req from '@/api/sort.js'
import req2 from '@/api/goods.js'
import sencondCarList from '@/pages/goods-detail/secondCarList.vue'
export default{
  name: 'classify',
  components:{sencondCarList},
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
      goodsList:[],
      topList:[]
    }
  },
  mounted () {
    this.getFirstSort(),
    this.getGoods(),
    this.getTopCar()
  },
  methods: {
    getTopCar(){
      req('getTopCar',).then(data =>{
            this.topList = data.data.data;
            console.log(JSON.stringify(this.topList))
        })
    },
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
    toDetail(id,name){
      this.$router.push({path:'classifyList',query:{id:id,name:name,toPath:this.$route.query.toPath,goodsId:this.$route.query.goodsId,
      title:this.$route.query.title,intro:this.$route.query.intro,url:this.$route.query.url,
      price:this.$route.query.price,iniPrice:this.$route.query.iniPrice,goodsId:this.$route.query.goodsId}})
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
/deep/ .van-tabs__line{
  background: #1989fa;
}
/deep/ .van-grid-item__content{
  padding: 10px 2px;
}
.van-grid{
  width: 95%;
  margin: 0 auto;
  margin-right: 16px;
}
.smallFont{
  margin-top: 4px;
  color: #969799;
  font-size: 12px;
  line-height: 18px;
}
/deep/ .el-radio__input{
  display: none;
}
/deep/.el-radio{
  margin-right: 0px;
}
/deep/.el-radio--small.is-bordered{
  padding: 6px 10px 0 3px;
  border-radius: 3px;
  height: 26px;
  margin-right: -5px;
  background: rgb(240, 240, 240);
}
.showGoods{
  width: 95%;
  margin:0 auto;
  margin-bottom: 50px;
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
