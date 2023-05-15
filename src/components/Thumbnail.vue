<script setup lang="ts">
import folder_mini from '@/assets/folder_mini.png'
import zip_mini from '@/assets/zip_mini.png'
import word_mini from '@/assets/word_mini.png'
import video_mini from '@/assets/video_mini.png'
import { useTokenStore } from '@/stores/token';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
const baseURL = import.meta.env.VITE_APP_BaseURL;
const props = defineProps({
  type:String, //文件类型
  uuid:String, //文件缩略图请求地址
  title:String, //文件标题
  time:String, //文件创建时间
})
const tokenStore = useTokenStore();


const shareFile = () =>{
  ElMessageBox.prompt('输入分享几日', '分享文件', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
  .then(({ value }) => {
    axios({
      url:'/api/shareFile',
      method:'post',
      headers:{'Content-Type':'multipart/form-data'},
      data:{
        uuid:props.uuid,
        time:value
      }
    })
    .then((response)=>{
      ElMessageBox({
        type: 'success',
        message: "分享成功，分享码是："+response.data,
      })
    },(error)=>{
      console.log(error)
      ElMessage.error(error.response.data)
    })
    
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}

const renameFile = () =>{
  ElMessageBox.prompt('输入新文件名', '重命名文件', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern:
      /^[^\\/:*?"<>|]{1,255}$/,
    inputErrorMessage: '不符合要求的名字',
  })
  .then(({ value }) => {
    axios({
      url:'/api/renameFile',
      method:'post',
      headers:{'Content-Type':'multipart/form-data'},
      data:{
        uuid:props.uuid,
        newName:value
      }
    })
    .then((response)=>{
      ElMessage({
        type: 'success',
        message: "修改成功",
      })
    },(error)=>{
      console.log(error)
      ElMessage.error(error.response.data)
    })
    
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}

const deleteFile = () =>{
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
      url:'/api/deleteFile',
      method:'post',
      data:{
        uuid:props.uuid
      },
      headers:{'Content-Type':'multipart/form-data'}
    })
    .then((response)=>{
      ElMessage.success("删除成功")
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
</script>

<template>
<!-- <h1>Thumbnail</h1> -->
<div style="width: 140px;height: 140px;text-align: center; margin: 20px;">

  <el-popover>
    <template #reference>
      <div>
        <el-image v-if="type === 'folder'" :src="folder_mini" fit="contain" style="width:110px;height: 90px;"/>
        <el-image v-else-if="type === 'zip'" :src="zip_mini" fit="contain" style="width:110px;height: 90px;"/>
        <el-image v-else-if="type === 'word'" :src="word_mini" fit="contain" style="width:110px;height: 90px;"/>
        <el-image v-else-if="type === 'video'" :src="video_mini" fit="contain" style="width:110px;height: 90px;"/>
        <el-image v-else-if="type === 'pdf'" :src="baseURL+'/thumbnail/'+'pdf'+'?token='+tokenStore.token+'&uuid='+uuid" fit="contain" style="width:110px;height: 90px;"/>
        <el-image v-else :src="baseURL+'/thumbnail/'+'img'+'?token='+tokenStore.token+'&uuid='+uuid" fit="contain" style="width:110px;height: 90px;" 
          :preview-src-list="[baseURL+'/thumbnail/'+'img'+'?token='+tokenStore.token+'&uuid='+uuid]" :initial-index="0"/>
        <div>
          <el-text style="font-weight: bold;">{{ title }}</el-text>
        </div>
        <div>
          <el-text type="info">{{ time }}</el-text>
        </div>
      </div>
    </template>
    <template #default>
      <div style="text-align: center" v-if="type != 'folder'">
        <el-link :href="'//localhost:8080/download?uuid='+uuid+'&token='+tokenStore.token">
          <el-button>下载</el-button>
        </el-link>
      </div>
      <div style="text-align: center;margin-top: 10px;">
        <el-button @click="shareFile()">分享</el-button>
      </div>
      <div style="text-align: center;margin-top: 10px;">
        <el-button @click="renameFile()">重命名</el-button>
      </div>
      <div style="text-align: center;margin-top: 10px;">
        <el-button @click="deleteFile()">删除</el-button>
      </div>
    </template>
  </el-popover>
  <!-- <el-image v-if="type === 'folder'" :src="folder_mini" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else-if="type === 'zip'" :src="zip_mini" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else-if="type === 'word'" :src="word_mini" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else-if="type === 'video'" :src="video_mini" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else-if="type === 'pdf'" :src="baseURL+'/thumbnail/'+'pdf'+'?token='+tokenStore.token+'&uuid='+uuid" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else :src="baseURL+'/thumbnail/'+'img'+'?token='+tokenStore.token+'&uuid='+uuid" fit="contain" style="width:110px;height: 90px;" 
    :preview-src-list="[baseURL+'/thumbnail/'+'img'+'?token='+tokenStore.token+'&uuid='+uuid]" :initial-index="0"/>
  <div>
    <el-text style="font-weight: bold;">{{ title }}</el-text>
  </div>
  <div>
    <el-text type="info">{{ time }}</el-text>
  </div> -->
</div>


<span></span>
</template>

<style scoped>

</style>