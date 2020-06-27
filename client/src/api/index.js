import {request} from '@/until/request.js'
export function Login(paramas){
    return request({url:'/login',method:'post',data:paramas})
}
export function Register(paramas){
    return request({url:'/register',method:'post',data:paramas})
}