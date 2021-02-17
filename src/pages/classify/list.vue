<template>
  <div class="container">
 <van-nav-bar
  :title="title"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="$router.push('classify')"
  @click-right="onClickRight"
/>
<van-tabs v-model="active" @click="changeStatus">
  <van-tab title="在售" name="1"></van-tab>
  <van-tab title="未售/停售" name="2"></van-tab>
</van-tabs>
<van-tabs type="card" style="margin-top:10px" @click="changeCarSort">
  <van-tab title="全部" name=""></van-tab>
  <van-tab v-for="(item,index) in sortList" :key="index" :title="item.value" :name="item.id"></van-tab>
</van-tabs>
<van-card
  v-for="(item,index) in second" :key="index"
  @click="toDetail(item.sortId,item.carIcon)"
  :desc="item.minPrice+'-'+item.maxPrice"
  :title="item.name"
  tag="在售"
  :thumb="item.carIcon"
/>

</div>
</template>

<script>

import req from '@/api/sort.js'
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
      sortList:[],
      id:this.$route.query.id,
      title:this.$route.query.name,
      loadData:{
        sortId:this.$route.query.id,
        status:"",
        carSort:""
      }
    }
  },
  mounted () {
    this.getSecondSort()
    this.getCarSort()
  },
  methods: {
    toDetail(sortId,carIcon){
      this.$router.push({path:"carDetail",query:{sortId:sortId,carIcon:carIcon}})
    },
    changeStatus(name,title){
      this.loadData.status = name;
      this.getSecondSort()
    },
    changeCarSort(name,title){
      this.loadData.carSort = name;
      this.getSecondSort()
    },
    getSecondSort (item) {
      this.currentClassify = item
      req('getSecondSort', this.loadData).then(data => {
        this.second = data.data.data
        console.log(JSON.stringify(this.second))
      })
    },
    getCommDetail (goodsId) {
      // sessionStorage.setItem('goodsDetail', JSON.stringify(item))
      // this.$router.push({path: '/goodsDetail'})
      req('getGoodsDetail',{goodsId:goodsId}).then(data =>{
            sessionStorage.setItem('goodsDetail', JSON.stringify(data.data.data))
            this.$router.push({path: '/goodsDetail'})
        })
    },
    getCarSort(){
      req('getCarSort', {sortId:this.id}).then(data => {
        this.sortList = data.data.data.map(result =>{
          if(result.carSort == 0){
            return {id:result.carSort,value:'轿车'}
          }else if(result.carSort == 1){
            return {id:result.carSort,value:'suv'}
          }else if(result.carSort == 2){
            return {id:result.carSort,value:'跑车'}
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.van-card__desc{
  color:rgb(255, 94, 0);
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
}
.van-card__title{
  color: black;
  font-weight: bold;
  font-size: 15px;
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
