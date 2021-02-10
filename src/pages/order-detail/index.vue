<template>
  <div>
      <!-- <div v-for="(item,index) in expressInfo.Traces" :key="index">
          <div class="TracesInfo">
              <div class="TracesTime">{{item.AcceptTime}}</div>
              <div class="TracesStation">{{item.AcceptStation}}</div>
          </div>
      </div> -->
        <div class="block">
            <div class="radio">
                排序：
                <el-radio-group v-model="reverse">
                <el-radio :label="true">倒序</el-radio>
                <el-radio :label="false">正序</el-radio>
                </el-radio-group>
            </div>

            <el-timeline :reverse="reverse">
                <el-timeline-item
                v-for="(activity, index) in expressInfo.Traces"
                :key="index"
                :timestamp="activity.AcceptTime">
                {{activity.AcceptStation}}
                </el-timeline-item>
            </el-timeline>
        </div>
      <div v-if="role === 1">
      <el-button @click="confirmExpress" v-if="state === '1'">确认收货</el-button>
      <el-button @click="confirmExpress" v-if="state === '2'">立即评价</el-button>
      </div>
      
  </div>
</template>

<script>
import req from '@/api/order.js'
export default {
    data () {
        return {
            reverse: true,
            orderId: sessionStorage.getItem('orderId'),
            userId: sessionStorage.getItem('userId'),
            expressInfo:[],
            expressCode: '',
            expressNo: '',
            state:'',
            own: JSON.parse(sessionStorage.getItem('goodsDetail')).own,
            role:''
        }
    },
    mounted () {
        this.getExpressInfo()
        this.getRole()
    },
    methods: {
        getRole () {
            if(this.userId == this.own){
                this.role = 0
            }
            else{
                this.role = 1
            }
            },
        confirmExpress(){
            req('changeState',{orderId:this.orderId,state:2}).then(data=>{
                this.$router.push({path:'/chat'})
            })
        },
        getExpressInfo(){
            req('getOrderExpress',{orderId:this.orderId}).then(data => {
                 this.expressCode = data.data.data.expressCode;
                 this.expressNo = data.data.data.expressNo;
                 this.state = data.data.data.state;
                 this.getTrack()
            })
        },
        getTrack(){
             req('getTrack',{expressCode:this.expressCode,expressNo:this.expressNo}).then(data => {
                 this.expressInfo = data.data.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
// .TracesInfo{
//     display: flex;
//     width: 90%;
//     margin: 0 auto;
//     margin-top: 10px;
//     .TracesTime{
//         width: 30%;
//         font-size: 15px;
//         color: rgb(46, 46, 46);
//     }
//     .TracesStation{
//         width: 70%;
//     }
// }
.block{
    width: 80%;
    margin: 0 auto;
}
</style>