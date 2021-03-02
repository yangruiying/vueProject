<template>
  <div class="container">
  <van-nav-bar
  :title="name"
  left-text="返回"
  left-arrow
  @click-left="$router.go(-1)"
  @click-right="onClickRight"
/>
<van-image
  fit="fill"
  :src="carIcon"
  class="carImg"
/>
<div>
  <div class="title">{{name}}</div>
  <van-grid :column-num="2" class="iconList">
  <van-grid-item icon="comment" color="#1989fa" text="论坛" @click="toTopic" class="comment"/>
  <van-grid-item icon="exchange" text="二手车价"  @click="toSecondCar" class="exchange"/>
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
    <van-tag plain type="danger">{{firstSortName}}</van-tag>
    <van-tag plain type="danger">{{name}}</van-tag>
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
      this.$router.push({path:"/secondCarList",query:{firstSortId:this.firstSortId,firstSortName:this.firstSortName,sortId:this.sortId,name:this.name,toPath:1}})
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

.title{
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}
.comment{
  .van-grid-item__icon{
    color: rgb(247, 19, 19);
  }
}
.exchange{
  .van-grid-item__icon{
    color: rgb(40, 36, 235);
  }
}
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
