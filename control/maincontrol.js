const HomeSwiper = require('../mongo/homeswiper')
const All = require('../mongo/All.js')
const Talk = require('../mongo/talk.js')
const  sd = require('silly-datetime');
const request=require('request')
exports.homeswiper = function (req, res) {
	HomeSwiper.find().then((result) => {
		res.json({ "result": result })
	})
}
//类别列表
exports.allList = function (req, res) {
	let { type } = req.query;
	All.find({ type }).then(result => {
		res.json({ "result": result })
	})
}
//最近火热				
exports.latesthot = function (req, res) {
	All.find({ type: 'latesthot' }).sort({ '_id': -1 }).then(result => {
		let arr = []
		for (let i = 0; i < 3; i++) {
			arr.push(result[i])
		}
		res.json({ 'result': arr })
	})
}
//今日推荐
exports.day = function (req, res) {
	All.find({ type: 'day' }).then((result) => {

		if (result.length > 0) {
			let arr = []
			for (let i = 0; i < 3; i++) {
				let a = Math.floor(Math.random() * (result.length - 3))
				arr[i] = result[a]
			}
			res.json({ "result": arr })
		} else {
			res.json({ 'message': '空' })
		}
	})
}

//宝贝推荐
exports.baby = function (req, res) {
	All.find({ type: 'baby' }).then((result) => {
		if (result.length > 0) {
			let arr = []
			for (let i = 0; i < 3; i++) {
				let a = Math.floor(Math.random() * (result.length - 3))
				arr[i] = result[a]
			}
			res.json({ "result": arr })
		} else {
			res.json({ 'message': '空' })
		}
	})
}
//情绪管理
exports.felling = function (req, res) {
	All.find({ type: 'felling' }).then((result) => {
		if (result.length > 0) {
			let arr = []
			for (let i = 0; i < 3; i++) {
				let a = Math.floor(Math.random() * (result.length - 3))
				arr[i] = result[a]
			}
			res.json({ "result": arr })
		} else {
			res.json({ 'message': '空' })
		}

	})
}
//详情页
exports.detail = async function (req, res) {
	var { _id } = req.query
	var atype = ""
	var adetail = await All.find({ _id })
	atype = adetail[0].type;
	var aother = await All.find({ "type": atype })
	for(let i = 0,len = aother.length; i < len; i++){
		let currentRandom = parseInt(Math.random() * (len - 1));
		let current = aother[i];
		aother[i] = aother[currentRandom];
		aother[currentRandom] = current;
	  }
	var alldetail = adetail.concat(aother)
	//数组去重
	for (let i = 0; i < alldetail.length; i++) {
		for (var j = i + 1; j < alldetail.length; j++) {
			if (alldetail[i]._id == alldetail[j]._id) {
				alldetail.splice(j, 1)
				j--
			}
		}
	}
	res.json({ "result": alldetail })
}
exports.search = function (req, res) {
	console.log(req.query.query)
	var qs=new RegExp(req.query.query);
	console.log(JSON.stringify(qs))
	All.find({'title':qs}).then(result => {
		res.json({ "result": result })
		console.log(result)
	}).catch(err => {
		console.log(err)
	})


}
//发布动态
exports.addpush = function (req, res) {
	let obj = req.body
	obj.datenow=sd.format(new Date(), 'YYYY-MM-DD HH:mm')
	var talk = new Talk(obj)
	talk.save(err => {
		console.log(err)
		return
	})
	res.status(200).json({ message: 'success' })
}
//分段获取数据
exports.getdata = function (req, res) {
	let q = req.query
	Talk.find().then(result => {
		let obj = {}
		obj.total = result.length;
		function group(array, subGroupLength) {
			let index = 0;
			let newArray = [];
			while (index < array.length) {
				newArray.push(array.slice(index, index += subGroupLength));
			}
			return newArray;
		}
		var groupedArray = group(result.reverse(), q.pagesize);
		obj.medata = groupedArray[q.pagenum - 1]
		res.json({ message: 'success', data: obj })
	})
}

exports.postpinlun = function (req, res) {
	var data = req.body

	Talk.find({ _id: data.talkid }).then(result => {
		console.log(result)
		if (result.length > 0) {
			{
				Talk.updateOne({
					_id: data.talkid
				}, {
					'$push': {
						pinlun: {
							nickName: data.pinlun[0].nickName,
							tonickName: data.pinlun[0].tonickName,
							pinlunitem: data.pinlun[0].pinlunitem
					}
				}
				},(err=>{
					console.log(err)
				})
					)
			}
		}else{
			console.log('cao')
		} 
	})

	res.json({ msg: 'success' })
}
exports.login=function(req,res){
		let {code}=req.body
	request({uri:`https://api.weixin.qq.com/sns/jscode2session?appid=wxaa3964c6e00121f6&secret=a9dc764b9bcc680942d465ddffd0eb71&js_code=${code}&grant_type=authorization_code`},(err,result,body)=>{
		res.json({msg:'success',data:result.body})
	})
}