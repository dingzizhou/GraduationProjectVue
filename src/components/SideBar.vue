<script setup lang="ts">
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore();
</script>

<template>
<el-container>
  <el-header style="height: 5%;">
    <!-- <h1>SideBarHeader</h1> -->
  </el-header>
  <el-main>
    <el-menu router>
      <!-- <el-menu-item index="0" route="home">
        <span>主页</span>
      </el-menu-item> -->
      <el-menu-item index="0" route="adminUser" v-if="tokenStore.type=='0'">
        <icon-people theme="outline" size="24" fill="#333" style="margin-right: 10px;"/>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-divider />
      <el-menu-item index="1" route="allFile">
        <icon-file-cabinet theme="outline" size="24" fill="#333" style="margin-right: 10px;"/>
        <template #title>全部</template>
      </el-menu-item>
      <!-- <el-menu-item index="2" route="photo">
        <icon-film theme="outline" size="24" fill="#333" style="margin-right: 10px;"/>
        <template #title>相册</template>
      </el-menu-item>
      <el-menu-item>
        <icon-doc-detail theme="outline" size="24" fill="#333" style="margin-right: 10px;"/>
        <span>文档</span>
      </el-menu-item>
      <el-menu-item>
        <icon-video-one theme="outline" size="24" fill="#333" style="margin-right: 10px;"/>
        <span>视频</span>
      </el-menu-item> -->
      <el-menu-item index="2" route="allFile">
        <icon-video-one theme="outline" size="24" fill="#333" style="margin-right: 10px;"/>
        <template #title>电影</template>
      </el-menu-item>
      <el-menu-item>
        <icon-delete theme="outline" size="24" fill="#333" style="margin-right: 10px;"/>
        <span>回收站</span>
      </el-menu-item>
    </el-menu>
  </el-main>
  <el-footer>
    <!-- <h1>SideBarFlooter</h1> -->
  </el-footer>
</el-container>


</template>

<style scoped>

</style>