const All = require('../mongo/All.js')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/zaojiao',(err)=>{
    if(err){
        console.log('连接失败')
    }else{
        console.log('连接成功')
    }
})
All.find().then(result=>{
    result.forEach((v,i)=>{
        var nsrc=v.audiosrc.replace("https://sharefs.yun.kugou.com","https://ygdl.xyz")
        All.findOneAndUpdate({_id:v._id},{"audiosrc":nsrc}).then(()=>{
            console.log('1')
        }).catch(err=>{
            console.log(err)
        })
       
    })
    
})