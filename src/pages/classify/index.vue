<template>
  <div class="container">
  <van-tabs v-model="active">
  <van-tab title="选车"></van-tab>
  <van-tab title="新能源"></van-tab>
  <van-tab title="二手车"></van-tab>
  <van-tab title="新车热卖"></van-tab>
</van-tabs>
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
      currentClassify: {}
    }
  },
  mounted () {
    this.getFirstSort()
  },
  methods: {
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
