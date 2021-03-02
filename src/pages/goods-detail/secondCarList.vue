<template>

  <div>
 <van-nav-bar
  v-if="bannerShow == ''"
  title="条件选车"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="$router.push('classify')"
  @click-right="onClickRight"
/>
<van-dropdown-menu>
  <van-dropdown-item v-model="value1" :options="option1" @open="chooseCarSort"/>
  <van-dropdown-item v-model="value2" :options="option2" />
  <van-dropdown-item v-model="value3" :options="option3" />
</van-dropdown-menu>
<div class="myTag">
  <van-tag v-if="firstShow" closeable size="medium" type="primary" @close="firstClose">
    {{firstSortName}}
  </van-tag>
  <van-tag v-if="secondShow" closeable size="medium" type="primary" @close="secondClose">
    {{name}}
  </van-tag>
</div>

<van-card
  v-for="(item,index) in carList" :key="index"
  @click="toDetail(item)"
  :desc="item.intro"
  :title="item.title"
  :price="item.price"
  tag="在售"
  :thumb="item.indexPath"
  style="padding-bottom:60px"
/>
<van-popup v-model="show" position="bottom" :style="{ height: '36%' }">
  <h3>自定义价格</h3>
  <van-form @submit="onSubmit">
  <van-field
    v-model="minPrice"
    name="最低价格"
    label="最低价格"
    placeholder="请输入最低价格"
    :rules="[{ required: true, message: '请输入最低价格' }]"
  />
  <van-field
    v-model="maxPrice"
    name="最高价格"
    label="最高价格"
    placeholder="请输入最高价格"
    :rules="[{ required: true, message: '请输入最高价格' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
  </van-popup>
</div>
</template>

<script>

import req from '@/api/goods.js'
import reqq from '@/api/sort.js'
export default{
  name: 'secondCarList',
  props:{
    bannerShow: {
      type: String,
      default: ''
    },},
  data () {
    return {
      value1: "",
      value2: 0,
      value3:0,
      option1: [
        { text: '品牌', value: "" },
      ],
      option2: [
        { text: '价格升序', value: 0 },
        { text: '价格降序', value: 1 },
      ],
      option3: [
        { text: '价格不限', value: 0 },
        { text: '5-8万', value: 1 },
        { text: '8-15万', value: 2 },
        { text: '15-20万', value: 3 },
        { text: '20-30万', value: 4 },
        { text: '30-50万', value: 5 },
        { text: '50-80万', value: 6 },
        { text: '自定义', value: 7 },
      ],
      minPrice:0,
      maxPrice:0,
      carList:[],
      show: false,
      firstShow:false,
      secondShow:false,
      sortId:this.$route.query.sortId,
      name:this.$route.query.name,
      firstSortId:this.$route.query.firstSortId,
      firstSortName:this.$route.query.firstSortName,
      show2:false,
      first:[]
    }
  },
  mounted () {
    if (this.firstSortName != "" && this.firstSortName != null){
      this.firstShow = true
    }
    if (this.name != "" && this.name != null) {
      this.secondShow = true
    }
    this.getData(),
    this.init()
    this.getFirstSort()
  },
  methods: {
    getFirstSort () {
      reqq('getFirstSort', {}).then(data => {
        console.log(JSON.stringify(data))
        this.first = data.data.data
      })
    },
    chooseCarSort(){
      this.$router.push({path:"firstSort"})
    },
    firstClose() {
      this.firstShow = false;
      this.firstSortId = ""
      this.secondShow = false;
      this.sortId = ""
      this.getData()
    },
    secondClose() {
      this.secondShow = false;
      this.sortId = ""
      this.getData()
    },
    init(){
      if(this.$route.query.value3 != null){
        this.value3 = parseInt(this.$route.query.value3)
      }
      if(this.$route.query.value1 != null){
        this.value1 = parseInt(this.$route.query.value1)
      }
    },
    onSubmit(values) {
      this.show = false,
      this.getData()
    },
    getData(){
      req('getGoods',{minPrice:this.minPrice,maxPrice:this.maxPrice,firstSort:this.firstSortId,sortId:this.sortId,orderType:this.value2,type:2}).then(data =>{
            this.carList = data.data.data
            console.log(JSON.stringify(this.carList))
        })
    },
    toDetail(goodsDetail){
      sessionStorage.setItem("goodsDetail",JSON.stringify(goodsDetail))
      this.$router.push({path:"/goodsDetail"})
      // this.$router.push({path:"/goodsDetail",query:{sortId:sortId,carIcon:carIcon}})
    },
    showPopup() {
      this.show = true;
    },
  },
  watch:{
    value3(value){
      if(value == 0){
        this.minPrice = 0
        this.maxPrice = 0
      }else if(value == 1){
        this.minPrice = 50000
        this.maxPrice = 80000
      }else if (value == 2){
        this.minPrice = 80000
        this.maxPrice = 150000
      }else if (value == 3){
        this.minPrice = 150000
        this.maxPrice = 200000
      }else if (value == 4){
        this.minPrice = 200000
        this.maxPrice = 300000
      }else if (value == 5){
        this.minPrice = 300000
        this.maxPrice = 500000
      }else if (value == 6){
        this.minPrice = 500000
        this.maxPrice = 800000
      }else if (value == 7){
        this.show = true
      }
      this.getData()
    },
    value1(){
      this.getData()
    },
    value2(){
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.van-card__price{
  color:rgb(255, 94, 0);
 
}
.van-tag--medium{
  border-radius: 10px;
  background: rgb(236, 236, 236);
  color: black;
  margin-top: 10px;
}
.myTag{
  text-align: left;
  margin-left: 10px;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0;
  width: 100%;
  height: 630px;
  
  }

</style>
