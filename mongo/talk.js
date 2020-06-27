//动态
const mongoose=require('mongoose')
var TalkSchema=new mongoose.Schema({
            textvalue:{
                type:String,
                required:true
             },
             images:{
                type:Array
             },
             avatarUrl:{
                type:String,
                required:true
             },
             nickName:{
                type:String,
                required:true
             },
          people_number:{
              type:String,
              default:0
          },
          pinlun:[{
            nickName:{type:String,required:true},
            tonickName:{type:String},
            pinlunitem:{type:String,required:true}
        }],
        datenow:{
           type:String,
           required:true
        }
          
})
var Talk=mongoose.model('Talk', TalkSchema)
 module.exports=Talk