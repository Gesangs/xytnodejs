var mongoose = require('mongoose')

var SectionSchema = new mongoose.Schema({
	name: String,
	abstract: String,
	count: Number,
	type: Number,
	createAt:{
		type: Date,
		default: Date.now()
	}
})

SectionSchema.statics = {
	findByType: function (type, cb) {
		return this
		.find({ type })
		.sort({ _id: -1 })
		.exec(cb)
	},
	findAll: function (cb) {
		return this
		.find({})
		.sort({ _id: -1 })
		.exec(cb)
	}
}

module.exports = SectionSchema