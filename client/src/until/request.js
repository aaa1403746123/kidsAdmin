import http from './http.js'
export function request(data){
  return new Promise((resolve,reject)=>{
        http.request({
        ...data       
        }).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
        })
        }