<script setup lang="ts">
import { Upload,Plus } from '@element-plus/icons-vue';
import Thumbnail from '@/components/Thumbnail.vue'
import axios from '@/axios'
import { useTokenStore } from '@/stores/token';
import { ref, type Ref } from 'vue';
import { ElMessage } from 'element-plus';
import FileTool from '@/utils/FileTool'
import VideoPlayer from '@/components/VideoPlayer.vue';
const backENV = import.meta.env.VITE_SPRINGBOOT_RUNENV
const basicFileUrl = import.meta.env.VITE_BASICFILEURL
const baseURL = import.meta.env.VITE_APP_BaseURL;
const tokenStore = useTokenStore();

var fileTool = new FileTool
var currentFolder = ""
interface filePath{
  fileName:string,
  filePath:string,
  uuid:string,
  fileSize:string,
  fileType:number,
  updateTime:string
}
const filePathList:Ref<filePath[]> = ref([])
const videoDialogVisible = ref(false)
const requestUrl = ref()
function getAllFile(folder:string) {
  axios({
    url:'/api/getChildrenFilesByFolder',
    method:'get',
    params:{
      folder:folder
    }
  })
  .then((response)=>{
    if(response.status == 200){
      filePathList.value = response.data
      filePathList.value.sort((n1,n2)=>{
        return -n1.fileType+n2.fileType
      })
    }
    else if(response.status >=400&&response.status<500){
      ElMessage({
        message:response.data,
        type:'error'
      })
    }
    else if(response.data.status>=500&&response.status<600){
      ElMessage({
        message:"服务器内部错误",
        type:'error'
      })
    }
  })
}

function openFolder(fatherFolder:string){
  currentFolder=fatherFolder
  getAllFile(fatherFolder)
}

function openFile(url:string){
  // alert("这是一个文件")
  // alert(url+filePathList.value[index])
  alert(encodeURI(url))
  var fileType = fileTool.getFileTypeByFileName(url)
  if(fileType == "video"){
    requestUrl.value = encodeURI(url)
    videoDialogVisible.value = true
  }
}

function goBackPath(){
  axios({
    url:'/api/goBackByCurrentFolder',
    method:'get',
    params:{
      currentFolder:currentFolder
    }
  })
  .then((response)=>{
    if(response.status == 200){
      filePathList.value = response.data.fileList
      currentFolder = response.data.currentFolder;
      filePathList.value.sort((n1,n2)=>{
        return -n1.fileType+n2.fileType
      })
    }
  },(error)=>{
    if(error.response.status == 404){
      ElMessage.warning("已经到最上层了！");
    }
    else{
      ElMessage.error("服务器错误");
    }
  })
}

getAllFile(currentFolder)
</script>

<template>
<h1>全部</h1>
<div class="" style="margin-top: 5px;">
  <el-button type="primary" :icon="Upload">上传</el-button>
  <el-button type="default" :icon="Plus">新建</el-button>
  <el-button type="default" :icon="Plus">创建离线下载</el-button>
</div>
<el-divider style="margin-top: 10px;margin-bottom: 10px;"/>
<el-button @click="goBackPath()">返回上级</el-button>
<el-button @click="getAllFile(currentFolder)">刷新</el-button>
<div class="">
  <div style="display: flex;flex-wrap: wrap;">
    <div v-for="(item,index) in filePathList" @click="item.fileType === 1 ? openFolder(item.uuid) : openFile(item.uuid)">
      <Thumbnail :title="item.fileName" :time="item.updateTime" :type="item.fileType === 1 ? 'folder':fileTool.getFileTypeByFileName(item.fileName)"
      :url="item.fileName"></Thumbnail>
    </div>
  </div>
</div>


<el-dialog v-model="videoDialogVisible" center align-center destroy-on-close style="width: 70%;height: 90%;">
  <!-- <VideoPlayer url="//localhost:8080/video/devToken/test" :fluid="true"></VideoPlayer> -->
  <VideoPlayer :url="'//localhost:8080/video?token='+tokenStore.token+'&url='+requestUrl" :fluid="true"></VideoPlayer>
</el-dialog>
</template>

<style scoped>

</style>