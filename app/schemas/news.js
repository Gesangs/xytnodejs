var mongoose = require('mongoose')

var NewsSchema = new mongoose.Schema({
	title: String,
	abstract: String,
	content: String,
	createAt:{
		type: Date,
		default: Date.now()
	},
	type: Number,
	author: String
})

NewsSchema.statics = {
	findByType: function (type, cb) {
		return this
		.find({ type })
		.sort({ createAt: -1 })
		.exec(cb)
	},
	findAll: function (cb) {
		return this
		.find({})
		.sort({ createAt: -1 })
		.exec(cb)
	}
}

module.exports = NewsSchema