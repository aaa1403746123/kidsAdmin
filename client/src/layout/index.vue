<template>
<div class="index">
    <Header></Header>
    <LeftMenu></LeftMenu>
    <Main/>
</div>
</template>
<script>
import Header from '../components/Header.vue'
import LeftMenu from '../components/LeftMenu.vue'
import Main from '../components/Main.vue'
export default {
    name:'index',
    data(){
       return{
    
       } 
    },
    
    methods:{
     
    },
    components:{
        Header,
        LeftMenu,
        Main
    }
}
</script>
<style scoped>

</style>