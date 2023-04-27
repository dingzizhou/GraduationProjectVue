<script setup lang="ts">
import {ParallelHasher} from 'ts-md5';
import {Md5} from 'ts-md5';
import SparkMD5 from 'spark-md5'
import { ref } from 'vue'
import { ElMessage, type UploadInstance, type UploadUserFile } from 'element-plus'
import axios from '@/axios/index';
import { reject } from 'lodash';

const CHUNK_SIZE = 20 * 1024 * 1024; // 切片大小（10MB）
let fileList: any = undefined

let fileMd5Template
// 生成文件标准md5值
function getFileMd5(file:any) {
  let hasher = new ParallelHasher('/md5_worker.js');
  return new Promise((resolve)=>{
    hasher.hash(file).then(function(result){
      // console.log('md5 of fileBlob is', result);
      resolve(result)
    })
  })
  
}

// 生成文件切片
function createFileChunk(file:File,size = CHUNK_SIZE){
  const fileChunkList = []
  let cur = 0
  while(cur < file.size){
    fileChunkList.push(file.slice(cur,cur+size))
    cur+=size
  }
  return fileChunkList
}

function submitUpload(){
  console.log(fileList)
  for(var i = 0;i < fileList.length;i++){
    console.log(fileList[i])
    // var hash = await getFileMd5(fileList[i])
    // console.log("hash"+hash)
    // console.log("11111"+getFileMd5(fileList[i]))
    var fileChunkList = createFileChunk(fileList[i].raw)
    // console.log(fileChunkList)
    var pormiseList = []
    console.log("fileChunkList="+fileChunkList.length)
    for(var j = 0;j < fileChunkList.length;j++){
      var promise = new Promise(function(resolve,reject){
        var hash = getFileMd5(fileChunkList[j])
        console.log(j+":"+hash)
        var uploadForm = {
          file:fileChunkList[j],
          hash:hash,
          index:j
        }
        setTimeout(()=>{},10000)
        resolve(uploadForm)
      })
      pormiseList.push(promise)
      // console.log(hash)
    }
    Promise.all(pormiseList).then(
      resolve=>{
        console.log(resolve)
      },
      reject=>{
        console.log(reject)
      }
    )
  }
}
</script>

<template>
  <el-upload v-model:file-list="fileList" multiple :auto-upload="false" ref="uploadRef">
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button type="success" @click="submitUpload">
      upload to server
    </el-button>

  </el-upload>
</template>

<style scoped>

</style>
