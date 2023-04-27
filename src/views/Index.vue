<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';
</script>

<template>
<!-- <h1>Home</h1> -->
<div style="height: 100%">
  <el-container>
    <el-aside width="200px" style="height: 100%;">
      <SideBar/>
    </el-aside>
    <el-container>
      <!-- <el-header><NavBar></NavBar></el-header> -->
      <el-main style="width: 100%;"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</div>
</template>

<style scoped>
.el-container{
  height: 100%;
  width: 100%;
}
</style>