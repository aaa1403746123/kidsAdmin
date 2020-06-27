const mongoose=require('mongoose')
var AllSchema=new mongoose.Schema({
		   	pic:{
                type:String,
                required:true
             },
            title:{
                type:String,
                required:true
             },
             introduce:{
                type:String,
                required:true
             },
		   	 howmany:{
			    type:Number,
			    default:100
		   	 },
             type:{
             type:String,
             required:true
          },
          audiosrc:{
             type:String,
             required:true
          }
          
})
var All=mongoose.model('All', AllSchema)
 module.exports=All