import cookie from 'cookie_js'
const admintoken='Admin_token'
export function getToken(){
    return cookie.get(admintoken)
}
export function setToken(token){
    return cookie.set(admintoken,token)
}
export function removeToken(){
    return cookie.remove(admintoken)
}
export function setUser(user){
    return cookie.set('Admininfo',user)
}