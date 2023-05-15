<script setup lang="ts">
import { Upload,Plus } from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

import { nextTick, onMounted, ref, type Ref } from 'vue';

const createUserVisible = ref(false);
const changePasswordVisible = ref(false);
const userCreateInfo = ref({
  username:"",
  password:"",
})
const newPassword = ref("");
const newPasswordUuid = ref("");
const userList = ref()
const userNum = ref()
const currentPage = ref(1)
const pageSize = ref(15)

function createUser(){
  axios({
    url:'/api/createUser',
    method:'post',
    headers:{'Content-Type':'multipart/form-data'},
    data:userCreateInfo.value,
  })
  .then((response)=>{
    ElMessage.success("成功")
    getUserNum()
    getUserList(currentPage.value,pageSize.value)
  },(error)=>{
    ElMessage.error("失败,"+error.response.data)
  })
  createUserVisible.value = false
  userCreateInfo.value.username = ""
  userCreateInfo.value.password = ""
}

function getUserList(pageNum:number,pageSize:number){
  axios({
    url:'/api/listUser',
    method:'get',
    params:{
      pageNum:pageNum,
      pageSize:pageSize,
    }
  })
  .then((response)=>{
    userList.value = response.data
  })
}

function getUserNum(){
  axios({
    url:'/api/getUserNumber',
    method:'get'
  })
  .then((response)=>{
    userNum.value = response.data
  },(error)=>{
    ElMessage.error(error.response.data)
  })
}

const changePassword = () =>{
  axios({
    url:'/api/changePassword',
    method:'post',
    data:{
      uuid:newPasswordUuid.value,
      password:newPassword.value
    },
    headers:{'Content-Type':'multipart/form-data'}
  })
  .then((response)=>{
    ElMessage.success("修改成功")
  },(error)=>{
    ElMessage.error(error.response.data)
  })

  changePasswordVisible.value = false
  newPassword.value = ""
}

const deleteUser = (uuid:string) =>{
  // 再次确认
  ElMessageBox.confirm(
    '确认删除吗',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    axios({
      url:'/api/deleteUser',
      method:'post',
      data:{
        uuid:uuid
      },
      headers:{'Content-Type':'multipart/form-data'}
    })
    .then((response)=>{
      ElMessage.success("删除成功")
      getUserNum()
      getUserList(currentPage.value,pageSize.value)
    },(error)=>{
      ElMessage.error(error.response.data)
    })
    
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}

// 分页相关函数
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getUserList(currentPage.value,pageSize.value)
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getUserList(currentPage.value,pageSize.value)
}

getUserNum()
getUserList(currentPage.value,pageSize.value)
</script>

<template>
<h1>用户管理</h1>
<div class="" style="margin-top: 5px;">
  <el-popover placement="bottom"  :width="160" :visible="createUserVisible">
    <template #reference>
      <el-button type="primary" :icon="Plus" @click="createUserVisible=true">新建用户</el-button>
    </template>
    <template #default>
      <el-input placeholder="用户名" v-model="userCreateInfo.username"/>
      <el-input placeholder="密码" v-model="userCreateInfo.password"  style="margin-top: 5px;"/>
      <div style="margin-top: 5px;">
        <el-button @click="createUserVisible = false">取消</el-button>
        <el-button type="primary" @click="createUser()">确认</el-button>
      </div>
    </template>
  </el-popover>
</div>
<el-divider style="margin-top: 10px;margin-bottom: 10px;"/>
<div style="display: flex;justify-content: center;align-items: center;">
  <el-table :data="userList" border style="width: 70%">
    <el-table-column prop="username" label="用户名" align="center"/>
    <el-table-column label="类型" align="center">
      <template #default="scope">
        <el-tag v-if="scope.row.type == 1" type="success">普通用户</el-tag>
        <el-tag v-if="scope.row.type == 0">管理员</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" >
      <template #default="scope">
        <el-button type="primary" @click="changePasswordVisible=true,newPasswordUuid=scope.row.uuid">修改密码</el-button>
        <el-button type="danger" @click="deleteUser(scope.row.uuid)">删除用户</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
<div style="display: flex;justify-content: center;align-items: center;margin-top:20px">
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[1,10, 15, 20, 30]"
    :small="false"
    :background="true"
    layout="sizes, prev, pager, next"
    :total="userNum"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
   />
</div>

<el-dialog v-model="changePasswordVisible" center>
  <div style="text-align: center;">
    {{ "输入新密码：" }}
    <el-input v-model="newPassword" style="width:200px;"/>
  </div>
  <template #footer>
    <div style="margin-top: 5px;">
      <el-button @click="changePasswordVisible = false">取消</el-button>
      <el-button type="primary" @click="changePassword()">确认</el-button>
    </div>
  </template>
</el-dialog>

</template>

<style scoped>
</style>