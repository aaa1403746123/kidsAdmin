<template>
<div :class="[isclose?'close':'open']">
  <div class="LeftMenu">
    <el-menu default-active="1-4-1" 
    class="el-menu-vertical-demo"
    router 
    text-color="white"  
    background-color="#324057" 
    :collapse="isclose"
   >
 <template v-for="(item,index) in leftitem">
 <el-submenu  v-if="!item.hidden" :key="index" :index="index+''">
    <template slot="title" >
      <i class="el-icon-location"></i>
      <span slot="title">{{item.meta.title}}</span>
    </template>
      <el-menu-item  v-for="(item2,index2) in item.children" :key="index2" :index="item2.path">{{item2.meta.title}}</el-menu-item>
  </el-submenu>
 </template>
</el-menu>
  </div>
  </div>
</template>
<script>

export default {
      name:'leftmenu',
     data(){
       return{
         leftitem:[]
       }
     },
    created(){
     this.leftitem=this.$router.options.routes
    },
    computed:{
        isclose(){
          return this.$store.state.app.isclose
        }
    },
     methods:{

     }
}
</script>
<style scoped>
.LeftMenu{
  position: fixed;
  left: 0;
  top: 0;
  width:200px;
  height: 100vh;
  background-color: #324057;
}
.el-menu{
  border: none;
}
.el-menu-item.is-active{
    background-color: sandybrown !important;
    font-size: 16px;
    color: white;
  }
.close .LeftMenu{
  width: 64px;
  transition: width 1s ease;
}
.open .LeftMenu{
  width: 200px;
  transition: width 1s ease;
}
</style>