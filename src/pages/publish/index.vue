<template>
  <div>
      <div class="banner">
          <div @click="$router.push({path: 'home'})"><span class="iconfont icon-fanhui"></span></div>
          <div class="title-name">发布</div>
          <div><div class="publish" @click="publish">发布</div></div>
      </div>
    <textarea class="title" placeholder="请输入物品标题" v-model="formData.title"></textarea>
    <textarea class="intro" placeholder="品牌型号，新旧程度，入手渠道，转手原因" v-model="formData.intro"></textarea>
    <div class="uploadImage">
    <el-upload
    v-for="i in size+1"
    :key='i'
    :before-upload="beforeAlbumUpload"
    :on-success="handleAlbumSuccess"
    :show-file-list="false"
    accept="image/*"
    action="http://localhost:8080/imageUpload/uploadImage"
    class="avatar-uploader"
    name="imageFile">
    <img :src="formData.url[i-1]" alt="专辑图片" class="avatar" v-if="formData.url[i-1] !== ''">
    <div v-else><i class="el-icon-plus avatar-uploader-icon"></i></div>
    </el-upload>
    </div>
    <div class="sort">
      <div>分类</div>
      <div>
      <el-select @change="getSecondSort"  v-model="formData.firstSort">
        <el-option v-for="item in first" :key="item.sortId" :label="item.name" :value="item.sortId"></el-option>
      </el-select>
      </div>
      <div>
      <el-select class="secondSort" v-model="formData.secondSort">
        <el-option v-for="item in second" :key="item.sortId" :label="item.name" :value="item.sortId"></el-option>
      </el-select>
      </div>
    </div>
    <el-form class="condition">
        <el-form-item label="价格" label-width="60px">
        <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item label="入手价" label-width="60px">
        <el-input v-model="formData.iniPrice"></el-input>
        </el-form-item>
        <el-form-item label="邮费" label-width="60px" >
        <el-input v-model="formData.shipping"></el-input>
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
      test: '',
      size: 0,
      formData: {
        title: '',
        intro: '',
        price: '',
        iniPrice: '',
        shipping: '',
        url: [''],
        firstSort: '',
        secondSort: '',
        userId: sessionStorage.getItem('userId')
      },
      imgUrl: '',
      first: [],
      second: [],
      firstSelected: {
        sortId: ''
      }
    }
  },
  mounted () {
    this.getFirstSort()
  },
  methods: {
    handleAlbumSuccess (response, file, fileList) {
      this.formData.url.pop()
      this.imgUrl = response.data
      this.formData.url.push(response.data)
      this.formData.url.push('')
      this.size++
    },
    publish () {
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
.banner{
    position: absolute;
    padding-right: 100px;
    height: 60px;
    width: 100%;
    display: flex;
    position: fixed;
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
      background: rgb(229, 255, 0);
      display: flex;
      margin: 0 auto;
      align-items: center;
    }
}
.title{
  width: 100%;
  height: 30px;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 20px;
  border-bottom-width: 1px;
  border-color: rgb(194, 194, 194);
}
.intro{
  width: 100%;
  height: 200px;
  border: none;
  font-size: 20px;
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
</style>
