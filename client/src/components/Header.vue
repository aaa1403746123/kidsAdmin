<template>
<div :class="[isclose?'close':'open']">
  <div class="Header_nav">
  <div class="left">
    <i class="el-icon-s-unfold" @click="close"></i>
  </div>
  <div class="right">
    <div class="rightinfo">
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592990315678&di=ce7835566294d9eb5335c3d7d3cdca76&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D3571592872%2C3353494284%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1200%26h%3D1290">
    <div class="name">靓仔adfas adsfa</div>
  </div>
  <div class="exit">
     <i class="el-icon-warning" @click="exit"></i>
  </div>
  </div>
</div>
</div>
</template>
<script>
export default {
    name:'Header_nav',
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
      close(){
        this.$store.commit("app/CHANGE_STATUS")
      },
      exit(){
        console.log('fuck')
      }
    }
}
</script>
<style scoped>
.Header_nav{
  position: fixed;
  left: 200px;
  top: 0px;
  right: 0px;
  height: 60px;
  background-color:white;
  box-shadow: 0 3px  16px  0 rgba(0, 0, 0,.1);
}
.el-icon-s-unfold{
  float: left;
  font-size: 60px;
  margin-left: 5px;
}
.right{
  float: right;
  line-height: 60px;
}

.close .Header_nav{
  left: 64px;
  transition: all 1s ease;
}
.open .Header_nav{
  left: 200px;
  transition: all 1s ease;
}
.right{
  display: flex;
  margin-right: 30px;
}
.rightinfo{
  display: flex;
  justify-content: center;
  align-items: center;
}
.rightinfo img{
  width:40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
}
.name{
  margin-right: 20px;
}
</style>