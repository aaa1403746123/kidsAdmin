const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const path=require('path')
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb://localhost:27017/zaojiao',(err)=>{
    if(err){
        console.log('连接失败')
    }else{
        console.log('连接成功')
    }
})

app.use('/users', require(path.join(__dirname,'./routes/admin.js')));
app.use("/api",require(path.join(__dirname,'./routes/index.js')))
app.use(express.static(path.join(__dirname,'public')))
app.listen(3000,()=>{
    console.log('3000端口查看')
})
