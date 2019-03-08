const Message = require('../models/message')


exports.save = (req, res) => {
	const message = new Message(req.body)
	message.save((err, mes) => {
		if (err) console.log(err)
		return res.json({ code: 0, msg: '发表成功' })
	})	
}

exports.getAll = (req, res) => {
	const { to } = req.query
	if (to !== 1) {
		Message
			.find({ to })
			.populate('from', 'username touxiang')
			.exec((err, mes) => {
				if (err) console.log(err)
				return res.json({ code: 0, message: mes.reverse() })
			})
	}
}