import router from '@/router'
import { useTokenStore } from '@/stores/token'
import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.timeout=3000

axios.interceptors.response.use(
  function(response){
    if(response.data.code == 401){
      ElMessage.error('token过期或者错误')
      router.push("/login")
    }
   return response
  },function(err){
    return Promise.reject(err);
  }
)

axios.interceptors.request.use(function (config) {
  const tokenStore = useTokenStore()
  // config.headers['Authorization'] = tokenStore.token
  config.headers['Authorization'] = "devToken"
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export default axios