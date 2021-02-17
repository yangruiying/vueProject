<template>
  <div class="container">
 <van-nav-bar
  title="条件选车"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="$router.push('classify')"
  @click-right="onClickRight"
/>
<van-dropdown-menu>
  <van-dropdown-item v-model="value1" :options="option1" />
  <van-dropdown-item v-model="value2" :options="option2" />
  <van-dropdown-item v-model="value3" :options="option3" />
</van-dropdown-menu>
<van-card
  v-for="(item,index) in carList" :key="index"
  @click="toDetail(item.sortId,item.carIcon)"
  :desc="item.minPrice+'-'+item.maxPrice"
  :title="item.name"
  tag="在售"
  :thumb="item.carIcon"
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

import req from '@/api/sort.js'
export default{
  name: 'classify',
  data () {
    return {
      value1: "",
      value2: 0,
      value3:0,
      option1: [
        { text: '全部车型', value: "" },
        { text: '轿车', value: 0 },
        { text: 'SUV', value: 1 },
        { text: '跑车', value: 2 },
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
    }
  },
  mounted () {
    this.getData(),
    this.init()
  },
  methods: {
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
      req('searchCar',{minPrice:this.minPrice,maxPrice:this.maxPrice,carSort:this.value1,orderType:this.value2}).then(data =>{
            this.carList = data.data.data
            console.log(JSON.stringify(this.carList))
        })
    },
    toDetail(sortId,carIcon){
      this.$router.push({path:"carDetail",query:{sortId:sortId,carIcon:carIcon}})
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
.container {
  position: absolute;
  top: 0px;
  bottom: 0;
  width: 100%;
  height: 630px;
  
  }

</style>
