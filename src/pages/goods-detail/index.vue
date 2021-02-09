<template>
  <div>
    <div class="userInfo">
      <img :src="goodsDetail.imagePath" @click="$router.push({path:'/home-page'})">
      <div class="userName">{{goodsDetail.userName}}</div>
      <div v-if="isUserGoods === 0">
      <div class="fans">
      <el-button  @click="addFans"  v-if="getIsFan === 0" class="guanzhu">关注</el-button>
      <el-button  @click="cancelFans" v-else class="quguan">已关注</el-button>
      </div>
      </div>
    </div>
    <div class="price">
      <h3>￥{{goodsDetail.price}}</h3>
    </div>
    <div class="title">
      <h2>{{goodsDetail.title}}</h2>
    </div>
    
    <div class="intro">
      <h3>{{goodsDetail.intro}}</h3>
    </div>
    
    <div class="imgList">
      <div v-for="(item , index) in gooodsImgList" :key="index" ><img :src="item.url"></div>

      <div class="leaveMessage">
          <h3 align="left">全部留言</h3>
          <div class="addMessage">
            <div class="getInput"><el-input v-model="message" placeholder="感兴趣请留言"></el-input></div>
            <el-button @click="addLeaveMessage">提交留言</el-button>
          </div>

          <div>
            <el-tree
            :data="messageList"
            :props="defaultProps"
            @node-click="nodeClick"
            default-expand-all
           :expand-on-click-node="false"
           indent="0"
           >
            <div class="slot-tree-node" slot-scope="{ data }">
              <div class="userInfo">
              <img :src="data.imagePath">
              <h3 align="left">{{data.userName}}</h3>
              <div >
                <p align="left" class="recoverContend"><span v-if="data.recoverName!=' '&&data.recoverName!=null">回复@{{data.recoverName}}：</span>{{data.message}}</p>
              </div>
              </div>
         <div class="test">
              <el-popover
              placement="left"
              width="250"
              trigger="click"
              
               >
                <el-input :placeholder="'回复@'+data.userName" v-model="recoverMessage"></el-input>
                <el-button @click="addRecover(data.lId)">提交回复</el-button>
             <el-button slot="reference" type="primary" class="recover" style="left: 0;">回复</el-button>
            </el-popover>
          </div>
          
              <!-- {{data}} -->
            </div>
            
          </el-tree>
          </div>
      </div>
      
    </div>

  


<div  v-if="isUserGoods === 0">
    <el-footer>
      <div>
       <div v-if="isFavor === 0"><img src="../../assets/weizan.png" class="icon"  @click="addFavor"></div>
       <div v-else><img src="../../assets/yizan.png" class="icon"  @click="delFavor"></div>
       <div class="ziti">点赞</div>
      </div>

      <div class="nextIcon">
       <div><img src="../../assets/liuyan.png" class="icon"  ></div>
      <div class="ziti">留言</div>
      </div>

      <div class="nextIcon">
       <div  v-if="isCollection === 0"><img src="../../assets/shoucang.png" class="icon"  @click="addCollection"></div>
       <div v-else><img src="../../assets/yishoucang.png" class="icon"  @click="delCollection"></div>
      <div class="ziti">收藏</div>
      </div>
      <el-button @click="toChat">客服</el-button>
      
    </el-footer>

    

</div>
  <div v-else>
      <el-footer>
        <div @click="$router.push({path:'/goods-edit'})">编辑</div>
      </el-footer>
  </div>

  </div>
</template>

<script>
import req from '@/api/goods.js'
import reqqq from '@/api/user.js'
export default {
  data () {
    return {
      defaultProps:{
        children: 'recoverList',
        label: 'message'
      },
      goodsDetail: JSON.parse(sessionStorage.getItem('goodsDetail')),
      userId: sessionStorage.getItem('userId'),
      goodsId: JSON.parse(sessionStorage.getItem('goodsDetail')).goodsId,
      gooodsImgList: [],
      isUserGoods: '',
      message: '',
      recoverMessage: '',
      messageList:[],
      homeUserId:JSON.parse(sessionStorage.getItem('goodsDetail')).userId,
      formData: {
        userId: sessionStorage.getItem('userId'),
        fans: JSON.parse(sessionStorage.getItem('goodsDetail')).userId
      },
      getIsFan: '',
      isFavor: '',
      isCollection: ''
    }
  },
  mounted () {
    this.getImgList()
    this.isFans()
    this.getIsUserGoods()
    this.getIsFavor()
    this.getIsCollection()
    this.getHmeInfo()
    this.getLeaveMessage()
    this.addBrower()
  },
  methods: {
    addBrower(){
      req('addBrower',{userId:this.userId,goodsId:this.goodsId})
    },
    addRecover(parentId){
      req('addRecover',{goodsId:this.goodsId,message:this.recoverMessage,userId:this.userId,parentId:parentId}).then(data =>{
        this.getLeaveMessage()
      })
    },
    getLeaveMessage(){
      req('getLeaveMessage',{goodsId:this.goodsId}).then(data =>{
        this.messageList=data.data.data
      })
    },
    addLeaveMessage(){
      req('addLeaveMessage',{goodsId:this.goodsId,message:this.message,userId:this.userId}).then(data=>{
        this.getLeaveMessage()
      })
    },
    getHmeInfo () {
      sessionStorage.setItem('homeUserId',this.homeUserId)
    },
    toChat () {
      // sessionStorage.setItem('toUser')
      this.$router.push({path: '/chat'})
    },
    getImgList () {
      req('getImgList', {goodsId: this.goodsDetail.goodsId}).then(data => {
        this.gooodsImgList = data.data.data
      })
    },
    isFans () {
      reqqq('isFans', {...this.formData}).then(data => {
        this.getIsFan = data.data.data
      })
    },
    addFans () {
      reqqq('addFans', {...this.formData}).then(data => {
        this.isFans()
      })
    },
    cancelFans () {
      reqqq('cancelFans', {...this.formData}).then(data => {
        this.isFans()
      })
    },
    getIsUserGoods () {
      req('getIsUserGoods', {userId: this.userId, goodsId: this.goodsId}).then(data => {
        this.isUserGoods = data.data.data
      })
    },
    getIsFavor () {
      req('isFavor', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.isFavor = data.data.data
      })
    },
    addFavor () {
      req('addFavor', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.getIsFavor()
      })
    },
    delFavor () {
      req('delFavor', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.getIsFavor()
      })
    },
    
    getIsCollection () {
      req('isCollection', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.isCollection = data.data.data
      })
    },
    addCollection () {
      req('addCollection', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.getIsCollection()
      })
    },
    delCollection () {
      req('delCollection', {goodsId: this.goodsId, userId: this.userId}).then(data => {
        this.getIsCollection()
      })
    }
  }
}
</script>


<style lang="scss">
.test{
  width: 100%;
  text-align: right;
  .el-button{
    margin-right: 35px;
    background: none;
    border: none;
    color: black;
  }
  .el-input{
    background: red;
  }
}

.el-tree{
  //height: 200px;
  padding-top: 20px;
  width: 100%;
  margin-bottom: 20px;
  .el-tree-node{
    width: 100%;
    margin-top: 10px;
    .el-tree-node__content{
      height: auto;
      width:  100%;
      
    }
    img{
        width: 50px;
        height: 50px;
        margin-left: 20px;
    }
    .el-tree-node__children{
      // padding-bottom: 35px;
      // margin-top: 20px;
      // margin-left: -16px;
      
      .el-tree-node__content{
      margin-left: 30px;
      margin-bottom: 15px;
    }
     
    }
    h3{
        width: 80%;
        padding-left: 80px;
        font-size: 15px;
      }
      p{
        font-size: 19px;
        font-weight: normal;
        width: 60%;
        // height: 500px;
        margin-left: 80px;
        
        margin-top: -15px;
        word-break:normal;
        white-space:pre-wrap; 
        word-wrap: break-word;

      }
    
  }

}

.banner{
  display: flex;
  position: absolute;
  top: 15px;
}
.userInfo{
  position: relative;
  //display: flex;
  width: 100%;
  height: auto;
  img{
    margin-left: 10px;
    height: 50px;
    width: 50px;
    margin-right: 10px;
    float: left;
  }
  .userName{
    float: left;
  }
  .fans{
    float: right;
    margin-right: 20px;
    .guanzhu{
      background: red;
      color: black;
      width: 80px;
    }
    .quguan{
      background: #c4cad1;
      color: black;
      width: 80px;
    }
  }
}
.price{
  display: flex;
  h3{
    margin-left: 10px;
    color: red;
  }
}
.title{
  display: flex;
  padding-left: 10px;
  width: 100%;
}
.intro{
  display: flex;
  padding-left: 10px;
  width: 100%;
}
.imgList{
  width: 100%;
  margin-bottom: 80px;
  div{
    width: 100%;
    position: relative;
  }
  img{
    margin: 0 auto;
    width: 300px;
    
    // height: 350px;
  }
  .leaveMessage{
    
    h3{
      margin-left: 10px;
    }
    .addMessage{
      display: flex;
    .getInput{
      width: 80%;
      margin-left: 10px;
    }
    }
    .mesInfo{
      margin-top: 20px;
      
      .recover{
        margin-right: -260px;
      }
      .userInfo{
        
      img{
        width: 50px;
        height: 50px;
        margin-left: 20px;
        
      }
      h3{
        width: 80%;
        margin-left: 80px;
        font-size: 15px;
      }
      }
      h5{
        font-size: 20px;
        font-weight: normal;
        width: 80%;
        margin-left: 80px;
        margin-top: -15px;
      }
    }
  }
}

.el-footer{
  display: flex;
  position: fixed;
  width: 100%;
  height: 15px;
  background:gray;
  bottom: 0;
  align-items: center;
  .nextIcon{
    margin-left: 20px;
  }
  .el-button{
    position: fixed;
    right: 20px;
    background: red;
    width: 80px;
    font-size: 19px;
    color: white;
    border-radius: 10px;
    font-weight: 500;
  }
  .icon{
    width: 30px;
    height: 30px;
  }
}
</style>
