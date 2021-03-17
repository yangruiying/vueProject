<template>
  <div>
      <van-nav-bar
    
      title="我发布的"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      
    />
    <div v-for="(item,index) in goodsList" :key="index" class="list" @click="toGoodsDetail(item.goodsId)">
        <img :src="item.indexPath">
        <div>{{item.title}}</div>
        <div style="color:red">￥{{item.price}}</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/mine.js'
export default {
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      goodsList: []
    }
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      req('getGoodsById', {userId: this.userId}).then(data => {
        this.goodsList = data.data.data
      })
    },
    toGoodsDetail (item) {
      req('getGoodsDetail', {goodsId: item}).then(data => {
        this.goodsDetail = data.data.data
        sessionStorage.setItem('goodsDetail', JSON.stringify(this.goodsDetail))
        this.$router.push({path: 'goodsDetail'})
      })
    }
  }
}
</script>

<style lang="scss">
.list{
    display: flex;
    margin-left: 30px;
    margin-top: 20px;
    img{
        width: 50px;
        height: 50px;
    }
    div{
        flex: 1;
    }
}
</style>
