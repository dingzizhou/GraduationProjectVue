<script setup lang="ts">
import { Upload,Plus } from '@element-plus/icons-vue';
import Thumbnail from '@/components/Thumbnail.vue'
import axios from '@/axios'
import { useTokenStore } from '@/stores/token';
import { nextTick, onMounted, ref, type Ref } from 'vue';
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
  fatherFolder:string,
  uuid:string,
  fileSize:string,
  fileType:number,
  updateTime:string
}
const filePathList:Ref<filePath[]> = ref([])
const videoDialogVisible = ref(false)
const pdfDialogVisible = ref(false)
const createFolderVisible = ref(false)
const createFolderName = ref("")
const requestFileUuid = ref("")
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
    else if(response.status>=500&&response.status<600){
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

function openFile(url:string,uuid:string){
  // alert("这是一个文件")
  // alert(url+filePathList.value[index])
  // alert(encodeURI(url))
  var fileType = fileTool.getFileTypeByFileName(url)
  requestFileUuid.value = uuid
  if(fileType == "video"){
    videoDialogVisible.value = true
  }
  else if(fileType == "pdf"){
    pdfDialogVisible.value = true
    // window.open(baseURL+'/onlinePDF'+'?token='+tokenStore.token+'&uuid='+uuid)
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
      currentFolder = response.data.folder;
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

const visible = ref(false)
const upload = () =>{
  visible.value = true
}

const createFolder=()=>{
  // alert(createFolderName.value)
  var data = {
    fileName:createFolderName.value,
    currentFolder:currentFolder
  }
  axios({
    url:'/api/createFolder',
    method:'post',
    data:data,
    headers:{'Content-Type':'multipart/form-data'}
  })
  .then(function(response){
    ElMessage.success("创建成功")
  })
  .catch(function(error){
    ElMessage.error("创建失败")
  })
  createFolderVisible.value = false
  createFolderName.value = ''
  getAllFile(currentFolder)
}

// vue-uploader相关内容
const uploaderRef = ref(null)
// const uploaderInstance = uploaderRef.value.uploader
const options = {
  target: 'api/uploadFile?token=devToken',
  testChunks: false
}
const statusText = {
  success: '成功了',
  error: '出错了',
  uploading: '上传中',
  paused: '暂停中',
  waiting: '等待中'
}
const complete = () => {
  // alert('complete')
  ElMessage.success("上传成功")
  getAllFile(currentFolder)
}
const fileComplete = (file:any) =>{
  console.log(file)
  var data = {
    filename:file.name,
    identifier:file.uniqueIdentifier,
    totalChunks:file.chunks.length,
    totalSize:file.size,
    type:file.fileType,
    fatherFolder:currentFolder
  }
  console.log(data)
  axios({
    url:'/api/mergeFile',
    method:'post',
    data:data,
    headers:{'Content-Type':'multipart/form-data'}
  })
  .then(function(response){
    // ElMessage.success("开始合并")
  }).catch(function(error){
    ElMessage.error("失败")
  })
}


getAllFile(currentFolder)
</script>

<template>
<h1>全部</h1>
<div class="" style="margin-top: 5px;">
  <el-button type="primary" :icon="Upload" @click="upload()">上传</el-button>
  <el-popover placement="bottom"  :width="160" :visible="createFolderVisible">
    <template #reference>
      <el-button type="default" :icon="Plus" @click="createFolderVisible=true">新建文件夹</el-button>
    </template>
    <template #default>
      <el-input placeholder="输入文件名" v-model="createFolderName"/>
      <div style="margin-top: 5px;">
        <el-button @click="createFolderVisible = false">取消</el-button>
        <el-button type="primary" @click="createFolder()">确认</el-button>
      </div>
    </template>
  </el-popover>
  <el-button type="default" :icon="Plus" @click="">创建离线下载</el-button>
</div>
<el-divider style="margin-top: 10px;margin-bottom: 10px;"/>
<el-button @click="goBackPath()">返回上级</el-button>
<el-button @click="getAllFile(currentFolder)">刷新</el-button>
<div class="">
  <div style="display: flex;flex-wrap: wrap;">
    <div v-for="item in filePathList" @click="item.fileType === 1 ? openFolder(item.uuid) : openFile(item.fileName,item.uuid)">
      <!-- <el-popover placement="right" trigger="hover">
        <template #reference> -->
            <Thumbnail :title="item.fileName" :time="item.updateTime" :type="item.fileType === 1 ? 'folder':fileTool.getFileTypeByFileName(item.fileName)"
            :uuid="item.uuid"></Thumbnail>
        <!-- </template>
        <template #default>
          <div style="text-align: center">
            <el-link href="//localhost:8080/download">
              <el-button>下载</el-button>
            </el-link>
          </div>
          <div style="text-align: center;margin-top: 10px;">
            <el-button>分享</el-button>
          </div>
          <div style="text-align: center;margin-top: 10px;">
            <el-button>重命名</el-button>
          </div>
          <div style="text-align: center;margin-top: 10px;">
            <el-button>删除</el-button>
          </div>
        </template>
      </el-popover> -->
    </div>
  </div>
</div>

<el-dialog v-model="visible" center align-center destroy-on-close style="width: 70%;height: 90%;">
  <uploader
    :options="options"
    :file-status-text="statusText"
    class="uploader-example"
    ref="uploaderRef"
    @file-complete="fileComplete"
    @complete="complete"
    style="width: 90%;"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>上传</p>
      <uploader-btn>选择文件</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</el-dialog>

<el-dialog v-model="videoDialogVisible" center align-center destroy-on-close style="width: 70%;height: 90%;">
  <VideoPlayer :url="'//localhost:8080/video?token='+tokenStore.token+'&uuid='+requestFileUuid" :fluid="true"></VideoPlayer>
  <!-- <VideoPlayer :url="'//localhost:8080/video?token='+tokenStore.token+'&url='+requestUrl" :fluid="true"></VideoPlayer> -->
</el-dialog>
<el-dialog v-model="pdfDialogVisible" center align-center destroy-on-close style="width: 70%;height: 90%;">
  <iframe :src="baseURL+'/onlinePDF'+'?token='+tokenStore.token+'&uuid='+requestFileUuid" style="width: 100%;height: 800px;display: inline-block;"></iframe>
</el-dialog>
</template>

<style scoped>

</style>