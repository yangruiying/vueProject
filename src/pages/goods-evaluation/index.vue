<template>
  <div>
      <el-rate v-model="formDate.rate"></el-rate>
      <textarea class='message' placeholder="请输入评价" v-model="formDate.message"></textarea>
      <el-button type="primary" @click="addEvaluate">提交评价</el-button>
  </div>
</template>

<script>
import req from '@/api/goods-evaluation.js'
export default {
  data(){
    return {
      formDate:{
        userId:sessionStorage.getItem("userId"),
        goodsId: JSON.parse(sessionStorage.getItem('goodsDetail')).goodsId,
        message:'',
        rate:''
      }
      
    }
  },
  methods:{
    addEvaluate(){
      req('addEvaluate',{...this.formDate}).then(data =>{
        req("changeState",{orderId:this.$route.query.orderId,state:3}).then(data => {
          this.$router.push({path:'comm-home'})
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .message{
    width: 80%;
    height: 100px;
  }
</style>