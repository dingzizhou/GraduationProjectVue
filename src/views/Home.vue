<script setup lang="ts">
import { nextTick, onMounted,ref } from 'vue';

const uploaderRef = ref(null)
const options = {
  target: 'api/uploadFile?token=devToken', // '//jsonplaceholder.typicode.com/posts/',
  testChunks: false
}
const statusText = {
  success:'success',
  error:'error',
  uploading:'uploading',
  paused:'paused',
  waiting:'waiting'
}
const complete = () => {
  alert('complete')
}
const fileComplete = () =>{
  alert('file complete')
}
onMounted(()=>{
  // nextTick(()=>{
  //   window.uploader = uploaderRef.value.uploader
  // })
})
</script>

<template>
  <uploader
    :options="options"
    :file-status-text="statusText"
    class="uploader-example"
    ref="uploaderRef"
    @file-complete="fileComplete"
    @complete="complete"
    style="width: 300px;"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>上传</p>
      <uploader-btn>选择文件</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<style scoped>

</style>