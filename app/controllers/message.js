const Message = require('../models/message')
const getAllUtil = require('../util')

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
exports.getAll = (req, res) => getAllUtil(req, res, Message, 'message')

// 搜索评论，根据内容
exports.search = (req, res) => {
	const { key } = req.body
	Message
		.find({ content: {$regex: key, $options:'i'} })
		.sort({ '_id': -1 })
		.exec((err, mes) => {
			if (err) console.log(err)
			return res.json({ code: 0, message: mes })
		})
}

exports.delete = (req, res) => {
	Message.deleteOne({ _id: req.query._id }, (err, news) => {
    return res.json({ code: 0, msg: '删除成功' })
  })
}