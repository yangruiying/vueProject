<template>
<div class="container">
  <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="$router.go(-1)">
    <template #title>
      <van-tabs v-model="active" @click = getTapShow>
        <van-tab title="全款"></van-tab>
        <van-tab title="贷款"></van-tab>
      </van-tabs>
    </template>
  </van-nav-bar>
  <div class="fullPay" v-show="fullPayShow">
    <el-card class="box-card">
      <van-cell center title="全款花费总额" :value="parseInt(price+parseFloat(carTax)+parseFloat(carService)+thirdPartyChoose+carLossChoose)" label="裸车价+必要花费+商业保险" />
    </el-card>
  <van-collapse v-model="activeNames" >
  <van-collapse-item name="1" disabled :is-link="false">
    <template #title>
      <van-cell-group>
        <van-field label="裸车价" :value="price" readonly input-align="right"/>  
      </van-cell-group>
    </template>
  </van-collapse-item>
  <van-collapse-item  name="2">
    <template #title>
      <van-cell-group>
        <van-field label="必要花费" :value="parseFloat(carTax)+parseFloat(carService)" readonly input-align="right"/>  
      </van-cell-group>
    </template>
    
  <van-form @submit="onSubmit">
    <van-field
      v-model="carTax"
      name="购置税"
      label="购置税"
      input-align="right"
      type="number"
      right-icon="edit"
    />
    <van-field
      v-model="carService"
      name="综合服务费"
      label="综合服务费"
      input-align="right"
      type="number"
      right-icon="edit"
    />
  </van-form>

  </van-collapse-item>
  <van-collapse-item  name="3">
    <template #title>
      <van-cell-group>
        <van-field label="商业保险" :value="thirdPartyChoose+carLossChoose" readonly input-align="right"/>  
      </van-cell-group>
    </template>
    <van-checkbox-group v-model="insuranceList" @checkbox-size="50">
      <van-checkbox name="a" label-disabled="true"><van-field :label="'第三方责任险 '+columnsChoose" :value="thirdParty" readonly input-align="right" @click="cheak()" right-icon="arrow"/></van-checkbox>
      <van-checkbox name="b" label-disabled="true"><van-field label="车辆损失险" :value="price*0.01" readonly input-align="right" right-icon="cash-back-record"/></van-checkbox>
    </van-checkbox-group>
  </van-collapse-item>
</van-collapse>
  <van-popup v-model="show" position="bottom">
  <van-picker
    title="选择赔付额度"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="show = false"
    @change="onChange"
  />
  </van-popup>
  </div>


  <div class="loan" v-show="loan">
    <el-card class="box-card">
      <van-cell center title="贷款花费总额" :value="parseInt(price+parseFloat(carTax)+parseFloat(carService)+thirdPartyChoose+carLossChoose+sumLoadMoney)" label="裸车价+必要花费+商业保险" />
      <van-divider />
      <van-row style="margin-left:10px">
        <van-col span="8" class="smallFont">首付总额</van-col>
        <van-col span="8" class="smallFont">贷款总额</van-col>
        <van-col span="8" class="smallFont">多花费</van-col>
      </van-row>
      <van-row style="margin-left:10px">
        <van-col span="8">{{price*firstPay}}</van-col>
        <van-col span="8">{{price - (price * firstPay)}}</van-col>
        <van-col span="8">{{parseInt(sumLoadMoney)}}</van-col>
      </van-row>
    </el-card>
  <van-collapse v-model="activeNames" >
  <van-collapse-item name="1" :is-link="false" disabled>
    <template #title>
      <van-cell-group>
        <van-field label="裸车价" :value="price" readonly input-align="right"/>  
      </van-cell-group>
    </template>
  </van-collapse-item>
  <van-collapse-item  name="2">
    <template #title>
      <van-cell-group>
        <van-field label="必要花费" :value="parseFloat(carTax)+parseFloat(carService)" readonly input-align="right"/>  
      </van-cell-group>
    </template>
    
  <van-form @submit="onSubmit">
    <van-field
      v-model="carTax"
      name="购置税"
      label="购置税"
      input-align="right"
      type="number"
      right-icon="edit"
    />
    <van-field
      v-model="carService"
      name="综合服务费"
      label="综合服务费"
      input-align="right"
      type="number"
      right-icon="edit"
    />
  </van-form>

  </van-collapse-item>
  <van-collapse-item  name="3">
    <template #title>
      <van-cell-group>
        <van-field label="商业保险" :value="thirdPartyChoose+carLossChoose" readonly input-align="right"/>  
      </van-cell-group>
    </template>
    <van-checkbox-group v-model="insuranceList" @checkbox-size="50">
      <van-checkbox name="a" label-disabled="true"><van-field :label="'第三方责任险 '+columnsChoose" :value="thirdParty" readonly input-align="right" @click="cheak()" right-icon="arrow"/></van-checkbox>
      <van-checkbox name="b" label-disabled="true"><van-field label="车辆损失险" :value="price*0.01" readonly input-align="right" right-icon="cash-back-record"/></van-checkbox>
    </van-checkbox-group>
  </van-collapse-item>

  <van-popup v-model="show" position="bottom">
  <van-picker
    title="选择赔付额度"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="show = false"
    @change="onChange"
  />
  </van-popup>
    <van-collapse-item name="1" :is-link="false" disabled>
    <template #title>
      <van-cell-group>
        <van-field label="首付额度" :value="firstPay* 100 +'%'" readonly input-align="right"/>  
      </van-cell-group>
    </template>
  </van-collapse-item>
  <el-row>
    <el-col :span="2" :offset="2"><span style="font-size:14px;line-height:2"  class="smallFont">比例</span></el-col>
    <el-col :span="20">
      <div>
        <el-radio v-model="firstPay" :label="0.3" border size="small">30%</el-radio>
        <el-radio v-model="firstPay" :label="0.4" border size="small">40%</el-radio>
        <el-radio v-model="firstPay" :label="0.5" border size="small">50%</el-radio>
        <el-radio v-model="firstPay" :label="0.6" border size="small">60%</el-radio>
        <el-radio v-model="firstPay" :label="0.8" border size="small">80%</el-radio>
      </div>
    </el-col>
  </el-row>
  <van-collapse-item name="1" :is-link="false" disabled>
    <template #title>
      <van-cell-group>
        <van-field label="月供金额" :value="parseFloat((price+parseFloat(carTax)+parseFloat(carService)+thirdPartyChoose+carLossChoose+sumLoadMoney)/payTime).toFixed(2)" readonly input-align="right"/>  
      </van-cell-group>
    </template>
  </van-collapse-item>
  <el-row>
    <el-col :span="2" :offset="2"><span style="font-size:14px;line-height:2"  class="smallFont">期限</span></el-col>
    <el-col :span="20">
      <div>
        <el-radio v-model="payTime" :label="12" border size="small">12期</el-radio>
        <el-radio v-model="payTime" :label="24" border size="small">24期</el-radio>
        <el-radio v-model="payTime" :label="36" border size="small">36期</el-radio>
        <el-radio v-model="payTime" :label="48" border size="small">48期</el-radio>
        <el-radio v-model="payTime" :label="60" border size="small">60期</el-radio>
      </div>
    </el-col>
  </el-row>
  <van-collapse-item name="1" :is-link="false" disabled>
    <template #title>
      <van-cell-group>
        <van-field label="利率"  input-align="right" v-model="loanInterest" :formatter="formatter" right-icon="http://xzsd-1301643402.cos.ap-beijing.myqcloud.com/2021021023522118748.jpg"/>  
      </van-cell-group>
    </template>
  </van-collapse-item>
  </van-collapse>
  
  </div>
</div>
</template>

<script>
import req from '@/api/goods.js'
export default {
  data () {
    return {
      activeNames: [],
      price:parseFloat(this.$route.query.price),
      carTax:0,
      carService:0,
      insurance:0,
      insuranceList:[],
      show:false,
      columns: ['5万', '10万', '15万', '20万', '30万', '50万', '100万', '150万','200万'],
      columnsIndex:[50000,100000,150000,200000,300000,500000,1000000,1500000,2000000],
      columnsChoose:"5万",
      thirdParty:0,
      carLoss:parseFloat(this.$route.query.price)*0.01,
      thirdPartyChoose:0,
      carLossChoose:0,
      radio1:"",
      fullPayShow:true,
      loan:false,
      loanInterest:4.75,
      monthPay:0,
      payTime:12,
      sumLoadMoney:0,
      firstPay:0.3
    }
  },
  mounted () {
    this.getData(),
    this.init()
  },
  methods: {
    getTapShow(index){
      if(index == 0){
          this.fullPayShow = true;
          this.loan = false;   
      }else{
        this.fullPayShow = false;
        this.loan = true;   
      }
    },
    cheak(){
      this.show = true
    },
    getData(){
      req('getGoodsBySortId',{sortId:this.sortId}).then(data =>{
            this.carList = data.data.data
        })
    },
    init(){
      this.carTax = this.price*0.1,
      this.carService = this.price*0.003
      this.insurance = this.price*0.005
      this.thirdParty = 50000 * 0.008,
      this.monthPay = this.price/this.payTime
      this.sumLoadMoney = (this.price -(this.price * this.firstPay)) * this.loanInterest / 100 / 12 * this.payTime
    },
    onConfirm(name,index){
      this.columnsChoose = name
      this.show = false,
      this.thirdParty = this.columnsIndex[index]*0.008
      if (this.insuranceList.indexOf('a')!=-1) {
         this.thirdPartyChoose = this.thirdParty
      }else{
        this.thirdPartyChoose = 0
      }
    }
  },
  watch:{
    insuranceList(value){
      if(value.indexOf('a')!=-1){
        this.thirdPartyChoose = this.thirdParty
      }else{
        this.thirdPartyChoose = 0
      }
      if(value.indexOf('b')!=-1){
        this.carLossChoose = this.carLoss
      }else{
        this.carLossChoose = 0
      }
    },
    payTime(value){
      this.sumLoadMoney = (this.price -(this.price * this.firstPay)) * this.loanInterest / 100 / 12 * value
    },
    loanInterest(value){
      this.sumLoadMoney = (this.price -(this.price * this.firstPay)) * value / 100 / 12 * this.payTime
    },
    firstPay(value){
      this.sumLoadMoney = (this.price -(this.price * value)) * this.loanInterest / 100 / 12 * this.payTime
    }
  }
}
</script>


<style lang="scss">
.smallFont{
  margin-top: 4px;
  color: #969799;
  font-size: 12px;
  line-height: 18px;
}
.el-radio__input{
  display: none;
}
.el-radio{
  margin-right: 0px;
}
.el-radio--small.is-bordered{
  padding: 6px 10px 0 3px;
  border-radius: 3px;
  height: 26px;
  margin-right: -5px;
}
.van-collapse-item__content {
  background: rgb(248, 248, 248);
  .van-field__label{
  font-size: 10px;
  }
}
.van-collapse{
  margin-top: 10px;
}
.van-collapse-item__content{
.van-cell{
  background: none;
}
}

.van-checkbox{
  background: rgb(248, 248, 248);
  padding: 5px;
  .van-field__label {
    font-size: 10px;
  }
}
.van-field__label{
  width: 130px;
}
 .container {
  position: absolute;
  top: 0;
  width: 100%;
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
.el-card{
  margin: 0 auto;
  width:90%;
  margin-top: 20px;
  text-align: left;
  .el-card__body{
    padding: 10px;
  }
  .van-cell__label{
  width: 160px;
}
.van-cell__value{
  color: tomato;
  font-size: 32px;
  width: 60px;
  line-height: 45px;
  font-weight: bold;
}
.van-cell__title, .van-cell__value {
  width: 100px;
}
}
</style>
