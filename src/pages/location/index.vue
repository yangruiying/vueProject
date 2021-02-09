<template>
  <div>
      <h1 class="animate__animated animate__bounce">{{this.city}}</h1>
  <div class="showGoods">
    <ul class="goods-list">
          <li v-for="(childItem, childIndex) in goodsList" :key="childIndex" @click="getGoodsDetail(childItem.goodsId)">
              <el-card :body-style="{ padding: '0px' }" >
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
import req from '@/api/location.js'
export default{
    data(){
        return{
            goodsList:'',
            city:sessionStorage.getItem("city")
        }
    },
    mounted(){
        this.getGoods()
    },
    methods:{
    getGoods () {
      req('getGoodsByCity', {cityName:this.city}).then(data => {
        this.goodsList = data.data.data
      }
      )
    },
    getGoodsDetail(goodsId){
        req('getGoodsDetail',{goodsId:goodsId}).then(data =>{
            sessionStorage.setItem('goodsDetail', JSON.stringify(data.data.data))
            this.$router.push({path: '/goodsDetail'})
        })
    }
    
    }
}
</script>

<style lang="scss" scoped>
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

            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          
        }
      }
</style>
