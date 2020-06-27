//这个用于后台管理
const express=require('express')
const router=express.Router()
const User=require('../mongo/user')
const fs=require('fs')
const multer=require('multer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar'); 
const keys = require('../config/keys');
const HomeSwiper=require('../mongo/homeswiper')
const formidable=require('formidable')
const All=require('../mongo/All')
router.post('/register', (req, res) => {
  // 查询数据库中是否拥有邮箱
  User.findOne({ account: req.body.account }).then(user => {
    if (user) {
      return res.status(400).json('邮箱已被注册!');
    } else {
      const avatar = gravatar.url(req.body.account, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const newUser = new User({
        name: req.body.name,
        account: req.body.account,
        avatar,
        password: req.body.password 
      });

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  POST api/users/login
// @desc   返回token jwt passport
// @access public

router.post('/login', (req, res) => {
  const account = req.body.account;
  const password = req.body.password;
  // 查询数据库
 
  User.find({ account }).then(user => {
    if (user<=0) {
      return res.status(400).send({msg:'用户不存在!'}); 
    }
    // 密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = {
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
        // res.json({msg:"success"});
      } else {
        return res.status(400).json('密码错误!');
      }
    });
  }).catch(err=>[
    console.log(err)
  ]);
});

router.post('/uploads', multer({ dest: 'upload/images' }).single('photos'),(req, res) => {
  if (req.file.length === 0) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
     res.render("error", {message: "上传文件不能为空！"});
     return
   } else {
     let file = req.file;
     fs.renameSync('./upload/images/' + file.filename,'./upload/images/'+file.filename+'.png');
   //  存入数据库
   //  console.log(path.join(path.resolve(__dirname, '..'), file.path+'.png'))
     homeswiper=new HomeSwiper({
       homeswiper: file.filename+'.png',
       navigator_src:'/pages/read/index'
     })
     homeswiper.save(err=>{
       console.log(err)
     })
     // 设置响应类型及编码
     res.set({
       'content-type': 'application/json; charset=utf-8'
     });
     res.json({'msg':'success'})
   }
 })
router.post('/alldata',(req,res)=>{
  var form = new formidable.IncomingForm();
  form.keepExtensions=true;
  form.multiples=true;
  form.uploadDir = "./upload/data";
  form.parse(req, (err, fields, files) => {
    var alldata=new All({
      pic:"http://img2.imgtn.bdimg.com/it/u=1354268575,1268995723&fm=26&gp=0.jpg",
      title:files.someExpressFiles.name,
      introduce:files.someExpressFiles.name,
      tid
    })
  })
 
  // var readDir = fs.readdirSync("./upload/data");
  // console.log(readDir);
//   var files = [];
//   form.on('file', function (name, file) {
//     files.push([name, file]);
// });
// console.log(files)
// form.parse(req,function(error,fields,files)  {
//   if (error) {
//     console.log("error" + error.message);
//     return;
//     }
//     for(var k=0;k<files.someExpressFiles.length;k++){
//       var fileName=files.someExpressFiles[k].name;
//     console.log(fileName) 
//       // fs.renameSync(files.myfile.path,fileUrl);
//   }

//   })
})

module.exports=router

