<template>
  <div>
      <el-form inline label-width="160px">
      <el-form-item label="快递单号：" prop="express_no" v-model="expressNo">
        <el-input label-width="80px" v-model="expressNo"></el-input>
      </el-form-item>
      <el-form-item label="快递公司：" prop="password">
        <el-select v-model="expressCode">
            <el-option v-for="(item,index) in expressList" :key="index" :label="item.expressName" :value="item.expressCode"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
      </el-form-item>

    <el-button @click="shipGoods" type="primary">立即发货</el-button>
    </el-form>
  </div>
</template>

<script>
import req from '@/api/ship-goods.js'
export default {
    data () {
        return {
            orderId: sessionStorage.getItem('orderId'),
            expressList:[],
            expressCode:'',
            expressNo:''
        }
    },
    mounted () {
        this.getExpress()
    },
    methods: {
        getExpress(){
            req('getExpress',{}).then(data => {
                this.expressList=data.data.data
            })
        },
        shipGoods() {
            req('shipGoods',{expressNo:this.expressNo,expressCode:this.expressCode,orderId:this.orderId})
            this.$router.push({path:"/chat"})
        }
    }
}
</script>

<style>

</style>