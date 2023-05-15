/// <reference types="vite/client" />
declare module 'vue-simple-uploader';
interface ImportMetaEnv {
  VITE_APP_BaseURL:string,
  VITE_SPRINGBOOT_RUNENV:number,
  VITE_BASICFILEURL:string,
}
