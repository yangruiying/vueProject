<template>
  <div style="background:white;height:100vh">
      <van-nav-bar
    
      :title="this.formData.goodsId == null ? '上架二手车' : '修改二手车'"
      left-text="返回"
      right-text="发布"
      left-arrow
      @click-left="$router.push({path:'/classify'})"
      @click-right="publish()"
      
    />
    <textarea class="title" placeholder="请输入车辆标题" v-model="formData.title"></textarea>
    <textarea class="intro" placeholder="品牌型号，新旧程度，入手渠道，转手原因" v-model="formData.intro"></textarea>
    <div class="uploadImage">
    <el-upload
      :action="this.config.uploadurl+'/imageUpload/uploadImage'"
      name="imageFile"
      :file-list="fileList"
      list-type="picture-card"
      accept="image/*"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="onSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    </div>
    <div style="text-align:left" @click="toSecondCar">
    <van-tag  round size="medium" type="primary" icon="arrow">
      <span v-if="name!=''&&name!=null">{{firstSortName + '  '}}{{name}}</span>
      <span v-else>请选择品牌</span>
    </van-tag>
    <van-icon name="arrow"  />
    </div>
    <el-form class="condition">
        <el-form-item label="价格" label-width="60px">
        <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item label="入手价" label-width="60px">
        <el-input v-model="formData.iniPrice"></el-input>
        </el-form-item>
    </el-form>
    <div>{{test}}</div>
    
  </div>
</template>

<script>
import req from '@/api/goods.js'
import reqqq from '@/api/sort.js'
// const qs = require('qs')
export default {
  name: 'publish',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      test: '',
      size: 0,
      formData: {
        goodsId:this.$route.query.goodsId,
        title: this.$route.query.title,
        intro: this.$route.query.intro,
        url: this.$route.query.url,
        price: this.$route.query.price,
        iniPrice: this.$route.query.iniPrice,
        shipping: undefined,
        url: this.$route.query.url,
        firstSort: '',
        secondSort: '',
        userId: sessionStorage.getItem('userId'),
        cityName:sessionStorage.getItem("city"),
        type:2
      },
      fileList: [],
      imgUrl: '',
      first: [],
      second: [],
      firstSelected: {
        sortId: ''
      },
      sortId:this.$route.query.sortId,
      name:this.$route.query.name,
      firstSortId:this.$route.query.firstSortId,
      firstSortName:this.$route.query.firstSortName,
    }
  },
  mounted () {
    this.fileList = this.formData.url.map(result => {
        return {url:result}
      })
    this.getFirstSort()
  },
  methods: {
    toSecondCar(){
      this.$router.push({path:"/classify",query:{firstSortId:this.firstSortId,
      firstSortName:this.firstSortName,sortId:this.sortId,name:this.name,
      toPath:3,goodsId:this.formData.goodsId,title:this.formData.title,
      intro:this.formData.intro,url:this.formData.url,
      price:this.formData.price,iniPrice:this.formData.iniPrice,goodsId:this.formData.goodsId}})
    },
    onSuccess(file, fileList){
        // alert(JSON.stringify(fileList))
        this.fileList=fileList
        if (this.formData.url == null) {
          this.formData.url = []
        }
        this.formData.url.push(file.data)
        // alert(this.formData.url)
    },
    handleRemove(file, fileList) {
      this.formData.url=this.formData.url.filter(item => {
        return item != JSON.stringify(file.response.data)
      })
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    handleAlbumSuccess (response, file, fileList) {
      this.formData.url.pop()
      this.imgUrl = response.data
      this.formData.url.push(response.data)
      this.formData.url.push('')
      this.size++
    },
    publish () {
      console.log(this.formData)
      req('addGoods', {...this.formData}).then(data => {
        this.test = data.data.code
        if (data.data.code === 0) {
          this.$router.push({path: '/home'})
        }
      })
    },
    getFirstSort () {
      reqqq('getFirstSort', {}).then(data => {
        this.first = data.data.data
      })
    },
    getSecondSort () {
      reqqq('getSecondSort', {sortId: this.formData.firstSort}).then(data => {
        this.second = data.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/global.scss";
.banner{
    position: fixed;
    padding-right: 100px;
    background: $pColor;
    height: 50px;
    width: 100%;
    display: flex;
    
    top: 0;
    justify-content: space-between;
    align-items: center;
    div{
        justify-content: center;
        font-size: 15px;
    }
    .title-name{
      font-size: 20px;
    }
    .publish{
      width: 60px;
      height: 30px;
      border-radius: 5px;
      margin-right: 10px;
      display: flex;
      
      align-items: center;
    }
}
.title{
  width: 95%;
  height: 30px;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 20px;
  border-bottom-width: 1px;
  border-color: rgb(194, 194, 194);
  margin-top: 10px;
}
.intro{
  width: 95%;
  height: 200px;
  border: none;
  font-size: 16px;
  margin-top: 15px;
}
.uploadImage{
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 414px;
  align-items: center;
  margin-left: 10px;
  .el-upload{
    display: flex;
    width: 60px;
    height: 60px;
  img{
    width: 122px;
    height: 122px;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 5px;
  }
  div{
    width: 122px;
    height: 122px;
    border:1px dashed #000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .avatar-uploader-icon{
    position: relative;
    font-size: 80px;
    color: rgb(156, 156, 156);
    justify-content: space-between;
    align-items: center;
  }
  }
}
.condition{
  position: relative;
  margin-top: 10px;
  .el-input{
    position: relative;
    width: 92%;
  }
}
.sort{
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  width: 100%;
  div{
    flex: 1;
  }
}
/deep/ .el-upload--picture-card{
  width: 100px;
  height: 100px;

}
  /deep/ .el-upload--picture-card i {
    font-size: 30px;
    color: #8c939d;
    display: block;
    margin-top: 35px;
  }
  /deep/  .el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 100px;
  }

  .van-tag{
    margin-left: 10px;
    margin-top: 20px;
    padding: 8px;
    background: rgb(235, 235, 235);
    color: black;
    padding-right: 20px;
  }
  .van-icon{
    right: 20px;
    top: 3px;
  }
  .container {
  position: absolute;
  top: 0px;
  bottom: 0;
  width: 100%;
  height: 100vh;
  
  }
</style>
