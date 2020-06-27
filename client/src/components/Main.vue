<template>
<div :class="[isclose?'close':'open']">
  <div class="main">
     <router-view></router-view>
  </div>
</div>
</template>
<script>
export default {
      name:'leftmenu',
     data(){
       return{
         
       }
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
.main{
  position: fixed;
  left: 200px;
  top: 60px;
  right: 0px;
  bottom: 0px;
  padding: 20px 0 0 20px;
}
.close .main{
  left: 64px;
  transition: all 1s ease;
}
.open .main{
  left: 200px;
  transition: all 1s ease;
}
</style>