<template>
  <div class="container">
  <van-nav-bar
  :title="name"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="$router.push('classify')"
  @click-right="onClickRight"
/>
<van-image
  fit="fill"
  :src="carIcon"
  class="carImg"
/>
<div>
  <div>{{name}}</div>
  <van-grid :column-num="2">
  <van-grid-item icon="comment" color="#1989fa" text="论坛" @click="toTopic"/>
  <van-grid-item icon="exchange" text="二手车价"  @click="toSecondCar"/>
</van-grid>
</div>
<van-card
  v-for="(item,index) in carList" :key="index"
  :price="item.price"
  :desc="item.intro"
  :title="item.title"
  :thumb="item.indexPath"
>
  <template #tags>
    <van-tag plain type="danger">标签</van-tag>
    <van-tag plain type="danger">标签</van-tag>
  </template>
  <template #footer>
    <van-button  type="info">获取底价</van-button>
    <van-button  plain icon="records"  style="float:left" class="compute" @click="toCompute(item.price)">
      计算
    </van-button>
  </template>
</van-card>
  </div>
</template>

<script>
import req from '@/api/goods.js'
export default {
  data () {
    return {
      
      carIcon:this.$route.query.carIcon,
      sortId:this.$route.query.sortId,
      name:this.$route.query.name,
      firstSortId:this.$route.query.firstSortId,
      firstSortName:this.$route.query.firstSortName,
      carList:[]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    toSecondCar(){
      this.$router.push({path:"/classify",query:{firstSortId:this.firstSortId,firstSortName:this.firstSortName,sortId:this.sortId,name:this.name,toPath:1}})
    },
    toTopic(){
      this.$router.push({path:"/topList",query:{topicTitle:this.name,sortId:this.sortId}})
    },
    getData(){
      req('getGoodsBySortId',{sortId:this.sortId,type:1}).then(data =>{
            this.carList = data.data.data
        })
    },
    toCompute(price){
      this.$router.push({path:"compute",query:{price:price}})
    }
  }
}
</script>


<style lang="scss" >
 .container {
  position: absolute;
  top: 0;
  width: 100%;
}
 .carImg{
  
}
.van-button--round{
  border-radius: 10px;
}
.van-button{
  height: 35px;
  border-radius: 5px;
}
.compute{
  .van-icon-records{
    color:#1989fa
}
}
</style>
