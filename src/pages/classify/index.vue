<template>
  <div class="container">
    <ul class="book-classify">
      <li :class="{active: item.sortId === currentClassify.sortId}" v-for="(item, index) in first" :key="index" @click="getSecondSort(item)">
        <b></b>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in second" :key="index">
        <div class="book-classify-item-title">{{item.name}}</div>
        <ul class="book-list">
          <li v-for="(childItem, childIndex) in item.goodsList" :key="childIndex" @click="getCommDetail(childItem)">
            <img :src="childItem.indexPath" alt="">
            <div>{{childItem.title}}</div>
            <div>
              ￥{{childItem.price}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
// import req from '@/api/comm-classify.js'

// export default {
//   name: 'comm-classify',
//   data () {
//     return {
//       oneClassifyList: [],
//       currentClassify: {},
//       commList: []}
//   },
//   mounted () {
//     this.getClassify()
//   },
//   methods: {
//     getClassify () {
//       req('getClassify', {}).then(data => {
//         this.oneClassifyList = data.data.oneClassifyList

//         this.currentClassify = this.oneClassifyList[0]

//         this.getTwoClassify(this.currentClassify)
//       })
//     },
//     getTwoClassify (item) {
//       this.currentClassify = item

//       req('getTwoClassify', {classifyId: item.classifyId}).then(data => {
//         this.commList = data.data.twoClassifyList
//       })
//     },
//     getCommDetail (item) {
//       sessionStorage.setItem('currentComm', JSON.stringify(item))

//       this.$router.push({path: '/comm-detail'})
//     }
//   }
// }
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
    getFirstSort () {
      req('getFirstSort', {}).then(data => {
        this.first = data.data.data
        this.currentClassify = this.first[0]
        this.getSecondSort(this.currentClassify)
      })
    },
    getSecondSort (item) {
      this.currentClassify = item
      req('getSecondSort', {...item}).then(data => {
        this.second = data.data.data
      })
    },
    getCommDetail (item) {
      sessionStorage.setItem('goodsDetail', JSON.stringify(item))
      this.$router.push({path: '/goodsDetail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50px;
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
      color: rgb(197, 156, 104);
      background: #ddd;

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: rgb(197, 156, 104);
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

    .book-classify-item {
      .book-classify-item-title {
        background: rgb(125, 134, 138);
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
          width: 50%;
          margin-bottom: 10px;

          img {
            width: 70%;
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
