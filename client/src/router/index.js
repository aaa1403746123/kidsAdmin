import Vue from "vue";
import VueRouter from "vue-router";
import layout from '../layout/index.vue'
import {removeToken, getToken} from '../until/app.js'
Vue.use(VueRouter);

const routes = [
     {
      path:"/",redirect:'console',meta:{title:''},hidden:true
     },
      {
        path:"/login",name:"login",component:()=>import('../views/login.vue'),meta:{title:'登录'},hidden:true
      },
      {
        path:"/register",name:"register",component:()=>import('../views/register.vue'),meta:{title:'注册'},hidden:true
      },
      {
        path:'/console',
        name:'console',
        meta:{title:'控制台'},
        redirect:"index",
        component:layout,
        children:[
          {
            path:'/index',name:'index',component:()=>import('../views/index.vue'),meta:{title:'首页'}
          }
        ]
      },
      {
        path:'/infoIndex',
        name:'infoIndex',
        meta:{title:'信息'},
        component:layout,
        children:[
          {
            path:'/infoindex',name:'infoindex',component:()=>import('../views/info.vue'),meta:{title:'我的信息'}
          }
        ]
      },
      {path:'*',component:()=>('../views/404found.vue'),hidden:true,meta:{title:"没找到"}}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// router.beforeEach((to, from, next) => {
//   const isLogin = getToken() ? true : false;
//   if (to.path == "/login" || to.path == "/register") {
//     removeToken()
//     next();
//   } else {
//     isLogin ? next() : next("/login");
//   }
// })
 
export default router;
