const mongoose=require('mongoose')
var gravatar = require('gravatar');
var UserSchema=new mongoose.Schema({
		account:{
            required:true,
            type:String
        },
        password:{
            required:true,
            type:String
        },
        name:{
            type:String,
            required:true
        },
        avatar:{
            default:gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: '404'}),
            type:String
        }
})
var User=mongoose.model('User',UserSchema)
// function a(){
// 	var  d={
// 		 "account":666666,
// 		 "password":666666,
// 		 "name":"王思聪" 
// 	 }
// 	var user=new User(d)
// 	user.save()
// }
// a()


module.exports=User