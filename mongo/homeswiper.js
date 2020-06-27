const mongoose=require('mongoose')
var HomeSwiperSchema=new mongoose.Schema({
           homeswiper:{
                type:String,
                required:true
             },
             navigator_src:{
                type:String,
                required:true
             }
})
var HomeSwiper=mongoose.model('HomeSwiper',HomeSwiperSchema)
   module.exports=HomeSwiper
    