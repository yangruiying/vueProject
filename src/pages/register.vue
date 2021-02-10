<template>
  <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-upload
        class="avatar-uploader"
        :action="this.config.uploadurl+'/imageUpload/uploadImage'"
        name="imageFile"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
        <img v-if="ruleForm.imagePath" :src="ruleForm.imagePath" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-form-item label="用户名" prop="userName">
            <el-col span="20">
                <el-input v-model="ruleForm.userName" autocomplete="off" ></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="账号" prop="account">
            <el-col span="20">
                <el-input v-model="ruleForm.account" autocomplete="off" ></el-input>
            </el-col>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-col span="20">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" ></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-col span="20">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-col>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>

<script>
import req from '@/api/register.js'
export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var chaeckUserName=(rule, value, callback)=>{
          if (value === '') {
          callback(new Error('请输入用户名'));
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var chaeckAccount = (rule, value, callback)=>{
          if (value === '') {
          callback(new Error('请输入账号'));
        }
      }
      return {
        ruleForm: {
          password: '',
          checkPass: '',
          userName:'',
          account:'',
          imagePath:'',
          role:1
        },
        rules: {
          userName:[
              {required: true,validator: chaeckUserName, trigger: 'blur'}
          ],
          account:[
              {required: true,validator: chaeckAccount, trigger: 'blur'}
          ],
          password: [
            { required: true ,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        req('addUser',{...this.ruleForm}).then(data =>{
            this.$router.push({path:'/login'})
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        this.ruleForm.imagePath = file.response.data;
      }
    }
  }
</script>

<style lang="scss">
  
.avatar-uploader{
    // background: red;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .el-upload{
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    }
    .avatar{
    
    }
}
  
//   .avatar-uploader .el-upload:hover {
//     border-color: #409EFF;
//   }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>