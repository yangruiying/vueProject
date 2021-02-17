<template>
  <div class="container">
  <van-nav-bar
  title="宝马"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="$router.push('classify')"
  @click-right="onClickRight"
/>
<van-image
  width="10rem"
  height="10rem"
  fit="fill"
  :src="carIcon"
/>
<div>
  <div>标题</div>
  <van-grid :column-num="2">
  <van-grid-item icon="comment" color="#1989fa" text="论坛"/>
  <van-grid-item icon="exchange" text="二手车价" />
</van-grid>
</div>
<van-card
  v-for="(item,index) in carList" :key="index"
  :price="item.price"
  :desc="item.intro"
  :title="item.title"
  thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
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
      sortId:this.$route.query.sortId,
      carIcon:this.$route.query.carIcon,
      carList:[]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData(){
      req('getGoodsBySortId',{sortId:this.sortId}).then(data =>{
            this.carList = data.data.data
        })
    },
    toCompute(price){
      this.$router.push({path:"compute",query:{price:price}})
    }
  }
}
</script>


<style lang="scss">
 .container {
  position: absolute;
  top: 0;
  width: 100%;
}
 .van-image{
  width: 100% !important
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
