import axios from 'axios'
import {Loading,Message} from 'element-ui'
let loading;
function startloading(){
   loading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
function endloading(){
  loading.close();
}
  //const BASEURL=process.env.NODE_EVN==="production"? " ": '/devapi'
  let http=axios.create({
     baseURL: "http://127.0.0.1:3000/users/",
    //baseURL:BASEURL,
    timeout: 1000
  })
  http.interceptors.request.use(function (config) {
    startloading()
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  let {data}=response
     endloading()
    if(data.status!=200){
        Message.error(data.msg)
        return Promise.reject(data);
    }else{
      return response;
    }
    
  }, function (error) {
    endloading()
    Message.error(error.response.data.msg)
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  

  
export default http;