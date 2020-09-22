<template>
<div>
  <div id="app">
    <img src="../assets/main.png">
    <router-view/>
  </div>
  <el-form inline label-width="65px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
      <div class="register-btn">
      <el-button type="text" @click="$router.push({path: '/register'})">我要注册</el-button>
    </div>

    <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
    </el-form>
</div>
</template>

<script>
import axios from 'axios'
import req from '@/api/user.js'
const qs = require('qs')
export default {
  name: 'login',
  data () {
    return {
      formData: {
        account: '',
        password: ''
      },
      userId: []
    }
  },
  methods: {
    login () {
      axios({
        method: 'post',
        url: process.env.BASE_API + '/auth/form',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
      }).then(data => {
        this.userId = data.data.data.userId
        if (this.userId !== null) {
          sessionStorage.setItem('userId', this.userId)
          req('getUserInfo', {userId: this.userId}).then(data => {
            sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))
          })
          this.$router.push({path: '/comm-home'})
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-form {
  margin-top: 100px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;

    /deep/ .el-form-item__error {
      padding-top: 0;
    }
  }
}
.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
}

.login-btn {
  display: block;
  margin: 0 auto;
  width: 100px;
  height: 40px;
  margin-top: -30px;
}
</style>
