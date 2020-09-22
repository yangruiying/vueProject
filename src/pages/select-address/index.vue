<template>
  <div>
    <div class="goodsInfo">
      <img :src="indexPath">
      <span>{{title}}</span>
      <h3>￥{{price}}</h3>
    </div>
    <h3>选择地址</h3>
    <el-select v-model="formData.addressId" class="selectAddress">
      <el-option v-for="(item,index) in addressList" :key="index" :label="item.name + ' '+ item.phone + ' '+ item.privinceName + item.cityName + item.regionName + item.detailAddress" :value="item.addressId">
      </el-option>
    </el-select>
      <button @click="toAddAddress">新增地址</button>
      <button @click="addOrder">提交订单</button>
  </div>
</template>

<script>
import req from '@/api/address.js'
import req2 from '@/api/order.js'
export default {
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
      addressList: [],
      info: '',
      indexPath: JSON.parse(sessionStorage.getItem('goodsDetail')).indexPath,
      title: JSON.parse(sessionStorage.getItem('goodsDetail')).title,
      price: JSON.parse(sessionStorage.getItem('goodsDetail')).price,
      formData: {
        goodsId: JSON.parse(sessionStorage.getItem('goodsDetail')).goodsId,
        buyer: sessionStorage.getItem('userId'),
        addressId: ''
      }
    }
  },
  mounted () {
    this.getUserAddress()
  },
  methods: {
    back () {
      window.location.href = document.referrer
      window.history.back(-1)
    },
    toAddAddress () {
      this.$router.push({path: '/add-address'})
    },
    getUserAddress () {
      req('userAddress', {userId: this.userId}).then(data => {
        this.addressList = data.data.data
      })
    },
    addOrder () {
      req2('addOrder', {...this.formData}).then(data => {
        this.$router.push({path: '/mine-buy'})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select{
  width: 100%;
}
.goodsInfo {
  width: 100%;
  height: 100px;
  img{
    float: left;
    width: 60px;
    height: 60px;
    margin-left: 20px;
  }
  span{
    float: left;
    margin-left: 20px;
  }
  h3{
    width: 50px;
    margin-left: auto;
    color: red;
  }
}
</style>
