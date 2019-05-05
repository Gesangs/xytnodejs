const Message = require('../models/message')

// 发表评论
exports.save = (req, res) => {
	const message = new Message(req.body)
	message.save((err, mes) => {
		if (err) console.log(err)
		return res.json({ code: 0, msg: '发表成功' })
	})	
}

// 获取某篇文章的评论
exports.getAllByOne = (req, res) => {
	const { to } = req.query
	Message
		.find({ to })
		.populate('from', 'username touxiang xuehao')
		.exec((err, mes) => {
			if (err) console.log(err)
			return res.json({ code: 0, message: mes.reverse() })
		})
}

// 获取用户最近的评论
exports.getLatelyByUser = (req, res) => {
	const { from } = req.query
	Message
		.find({ from })
		.limit(4)
		.populate('to', '_id title abstract createAt')
		.exec((err, mes) => {
			if (err) console.log(err)
			return res.json({ code: 0, message: mes })
		})
}

// 获取所有评论
exports.getAll = (req, res) => {
	Message
		.find({})
		.sort({ '_id': -1 })
		.exec((err, mes) => {
			if (err) console.log(err)
			return res.json({ code: 0, message: mes })
		})
}

// 搜索评论，根据学号或内容
exports.search = (req, res) => {
	const { key } = req.query
	const search = /^\d+$/.test(key) 
		? { xuehao: key } 
		: { content: {$regex: key, $options:'i'} }
	Message
		.find(search)
		.sort({ '_id': -1 })
		.exec((err, mes) => {
			if (err) console.log(err)
			return res.json({ code: 0, message: mes })
		})
}