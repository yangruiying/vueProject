<template>
  <div class="container">
  <van-nav-bar
  title="详情"
  left-text="返回"
  left-arrow
  @click-left="$router.go(-1)"
  @click-right="onClickRight"
/>
<van-row class="row1">
  <van-col span="8">原价</van-col>
  <van-col span="8">活动价</van-col>
  <van-col span="8" @click="toSecond()">二手车价<van-icon name="arrow"/></van-col>
</van-row>

<van-row class="row2">
  <van-col span="8">{{goodsDetail.iniPrice}}</van-col>
  <van-col span="8">{{goodsDetail.price}}</van-col>
  <van-col span="8">{{goodsDetail.secondMinPrice == null ? '暂无价格' : goodsDetail.secondMinPrice + '起'}}</van-col>
</van-row>
<mu-container>
<mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
  <mu-card-media :title="goodsDetail.firstSortName" :sub-title="goodsDetail.secondSortName">
    <img :src="goodsDetail.indexPath">
  </mu-card-media>
  <mu-card-title :title="goodsDetail.title" ></mu-card-title>
  <mu-card-text>
    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
  </mu-card-text>
  <!-- <mu-card-actions>
    <mu-button flat>Action 1</mu-button>
    <mu-button flat>Action 2</mu-button>
  </mu-card-actions> -->
</mu-card>
</mu-container>
  </div>
</template>

<script>
import req from '@/api/goods.js'
export default {
  data () {
    return {
      goodsDetail:""
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData(){
      req("getGoodsDetail",{goodsId:this.$route.query.goodsId}).then(data =>{
        console.log(JSON.stringify(data))
        this.goodsDetail = data.data.data
      })
    },
    toSecond(){
      this.$router.push({path:"/secondCarList",query:{firstSortId:this.goodsDetail.firstSort,firstSortName:this.goodsDetail.firstSortName,
      sortId:this.goodsDetail.secondSortId,name:this.goodsDetail.secondSortName}})
    }
  }
}
</script>


<style lang="scss" >
.row1{
  font-size: 10px;
  margin-top: 20px;
}
.row2{
  font-size: 16px;
  font-weight: bold;
  color: rgb(252, 16, 16);
  margin-bottom: 20px;
}
</style>
