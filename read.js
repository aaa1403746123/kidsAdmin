const fs=require('fs')
const mongoose=require('mongoose')
const All=require('./mongo/All.js')
mongoose.connect('mongodb://localhost:27017/zaojiao',(err)=>{
    if(err){
        console.log('连接失败')
    }else{
        console.log('连接成功')
    }
})
function add(dir){
    var readDir = fs.readdirSync("./public/"+dir);
    for(let i=0;i<readDir.length;i++){
            var oldpath='./public/'+dir+'/'+readDir[i]
            var reg = /[\u4e00-\u9fa5]/g;   
            var newpath='./public/'+dir+'/'+(readDir[i].match(reg).join(""))
                newpath=newpath+".mp3"

         fs.rename(oldpath,newpath,err=>{
            if(err) throw err
            var baseurl="localhost"
            var all=new All({
                pic:"http://localhost:3000/images/pic.jpg",
                title:readDir[i].match(reg).join(""),
                introduce:"童谣",
                type:dir,
                audiosrc:"http://localhost:3000/"+dir+"/"+readDir[i].match(reg).join("")+'.mp3'
            })
            all.save(err=>{
                if(err){
                    console.log(err)
                }
            })
         })
    }
}

add(tongyao)