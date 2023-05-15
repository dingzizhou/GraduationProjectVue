<script setup lang="ts">
import { useTokenStore } from '@/stores/token';
import router from '@/router';
import { User,Lock } from '@element-plus/icons-vue'
import axios from '@/axios/index';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const tokenStore = useTokenStore();

const loginForm = ref({
  username:"admin",
  password:"admin",
})

let rules = ref({
  username:[{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
})

function login(){
  var dataValue = loginForm.value
  axios({
    url:'/api/login',
    method:'post',
    data:dataValue,
    headers:{'Content-Type':'multipart/form-data'}
  })
  .then(function(response){
    if(response.status == 200){
      tokenStore.setToken(response.data.token)
      tokenStore.setType(response.data.type)
      ElMessage.success("登录成功")
      router.push("/allFile")
    }
    else if(response.status == 500){
      ElMessage.error(response.data)
    }
    else{
      ElMessage.error("账号或者密码错误")
    }
  })
}

</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">管理员登录</div>
      <!-- 登录表单 -->
      <el-form
        status-icon
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            :prefix-icon="User"
            placeholder="用户名"
          />
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :prefix-icon="Lock"
            show-password
            placeholder="密码"
            @keyup.enter.native="login"
          />
        </el-form-item>
      </el-form>
      <!-- 登录按钮 -->
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.login-card {
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    padding: 170px 60px 180px;
    width: 350px;
}
.login-title {
    color: #303133;
    font-weight: bold;
    font-size: 1rem;
}
.login-form {
    margin-top: 1.2rem;
}
.login-card button {
    margin-top: 1rem;
    width: 100%; 
}
</style>