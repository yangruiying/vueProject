<template>
  <div>
    <van-nav-bar
      title="修改地址"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="publish()"
    />
      <div class="info">
      <div>姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <el-input v-model="formData.name"></el-input>
      </div>

      <div class="info">
      <div>手机：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <el-input v-model="formData.phone"></el-input>
      </div>

      <div class="info">
      <div>所在省份：</div>
      <el-select @change="getCityArea(formData.privinceId)" v-model="formData.privinceId">
          <el-option v-for="(item , index) in  privince" :key="index" :label="item.value" :value="item.id">
          </el-option>
      </el-select>
      </div>

      <div class="info">
      <div>所在城市：</div>
      <el-select @change="getRegionArea(formData.cityId)" v-model="formData.cityId">
          <el-option v-for="(item , index) in  city" :key="index" :label="item.value" :value="item.id">
          </el-option>
      </el-select>
      </div>

      <div class="info">
      <div>所在区：&nbsp;&nbsp;&nbsp;</div>
      <el-select v-model="formData.regionId">
          <el-option v-for="(item , index) in  region" :key="index" :label="item.value" :value="item.id">
          </el-option>
      </el-select>
      </div>
      <div class="info"><div>详细地址:&nbsp;&nbsp;</div><textarea class="intro" placeholder="如街道、小区、乡镇、村等" v-model="formData.detailAddress"></textarea></div>
      <el-button class="submit" @click="addAddress">修改地址</el-button>
  </div>
</template>

<script>
import req from '@/api/address.js'
export default {
  data () {
    return {
      privince: [],
      city: [],
      region: [],
      formData: {
        addressId:'',
        userId: sessionStorage.getItem('userId'),
        privinceId: '',
        cityId: '',
        regionId: '',
        detailAddress: '',
        name: '',
        phone: ''
      }
    }
  },
  mounted () {
    this.getPrivinceArea(0)
    this.formData.privinceId = this.$route.query.privinceId
    this.getCityArea(this.formData.privinceId)
    this.formData.cityId = this.$route.query.cityId
    this.getRegionArea(this.formData.cityId)
    this.formData.regionId = this.$route.query.regionId
    this.formData.detailAddress = this.$route.query.detailAddress
    this.formData.name = this.$route.query.name
    this.formData.phone = this.$route.query.phone
    this.formData.addressId = this.$route.query.addressId
  },
  methods: {
    getPrivinceArea (id) {
      req('listArea', {id: id}).then(data => {
        this.privince = data.data.data
      })
    },
    getCityArea (id) {
      req('listArea', {id: id}).then(data => {
        this.city = data.data.data
      })
    },
    getRegionArea (id) {
      req('listArea', {id: id}).then(data => {
        this.region = data.data.data
      })
    },
    addAddress () {
      req('updateAddress', {...this.formData}).then(data => {
        this.region = data.data.data
        this.$router.push({path: '/select-address'})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
    display: flex;
    margin: 20px;
    .el-input{
        width: 60%;
    }
}
textarea{
    width: 60%;
    height: 50px;
}
</style>
