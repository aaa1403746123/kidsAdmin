//该页面用于小程序获取数据
const express=require('express')
const  router=express.Router();
var multer = require('multer')
var UUID = require('uuid')
var path=require('path')
const control=require('../control/maincontrol.js')
router.get('/home/swiperdata',control.homeswiper)
router.get("/home/allList",control.allList)
router.get("/home/latesthot",control.latesthot)
router.get("/home/day",control.day)
router.get("/home/baby",control.baby)
router.get("/home/detail",control.detail)
router.get("/home/search",control.search)
//router.post('/home/publish',control.publish)
//router.get('/home/publish',control.getpublish)
router.get('/home/felling',control.felling)
router.post('/home/addpush',control.addpush)//发布动态
router.get('/home/getdata',control.getdata)
//获取留言
router.post('/home/login',control.login)
router.post('/home/pinlun',control.postpinlun)
module.exports=router 