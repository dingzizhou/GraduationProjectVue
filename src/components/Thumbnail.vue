<script setup lang="ts">
import folder_mini from '@/assets/folder_mini.png'
import zip_mini from '@/assets/zip_mini.png'
import word_mini from '@/assets/word_mini.png'
import video_mini from '@/assets/video_mini.png'
import { useTokenStore } from '@/stores/token';
const baseURL = import.meta.env.VITE_APP_BaseURL;
const props = defineProps({
  type:String, //文件类型
  uuid:String, //文件缩略图请求地址
  title:String, //文件标题
  time:String, //文件创建时间
})
const tokenStore = useTokenStore();
</script>

<template>
<!-- <h1>Thumbnail</h1> -->
<div style="width: 140px;height: 140px;text-align: center; margin: 20px;">
  <el-image v-if="type === 'folder'" :src="folder_mini" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else-if="type === 'zip'" :src="zip_mini" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else-if="type === 'word'" :src="word_mini" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else-if="type === 'video'" :src="video_mini" fit="contain" style="width:110px;height: 90px;"/>
  <el-image v-else-if="type === 'pdf'" :src="baseURL+'/thumbnail/'+'pdf'+'?token='+tokenStore.token+'&uuid='+uuid" fit="contain" style="width:110px;height: 90px;"/>
  <!-- <el-image v-else :src="baseURL+'/thumbnail/'+type+'/'+tokenStore.token+'/'+url" fit="contain" style="width:110px;height: 90px;" /> -->
  <el-image v-else :src="baseURL+'/thumbnail/'+'img'+'?token='+tokenStore.token+'&uuid='+uuid" fit="contain" style="width:110px;height: 90px;" 
    :preview-src-list="[baseURL+'/thumbnail/'+'img'+'?token='+tokenStore.token+'&uuid='+uuid]" :initial-index="0"/>
  <div>
    <el-text style="font-weight: bold;">{{ title }}</el-text>
    <!-- <p style="font-weight: bold;font-size: 20px;">{{title}}</p> -->
  </div>
  <div>
    <el-text type="info">{{ time }}</el-text>
    <!-- <p style="font-size: 12px;">time</p> -->
  </div>
</div>


<span></span>
</template>

<style scoped>

</style>