<script setup lang="ts">
import Player from 'xgplayer'
import { defineComponent, getCurrentInstance, onMounted, onUnmounted, ref } from 'vue';

let player:any = null;

const props = defineProps({
  url:String,
  fluid:Boolean,
})

onMounted(()=>{
  player = new Player({
    id:'mse',
    url:props.url,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    cssFullscreen: true,
    fluid:props.fluid,
  })
})

onUnmounted(()=>{
  player.once(
    'destroy',()=>{}
  )
})
</script>

<template>
<div id="mse"></div>
</template>