var mongoose = require('mongoose')

var userCourseSchema = new mongoose.Schema({
	user: String,
	cweek: String,
	jieci: String,
	cname: String,
	point: String,
	teacher: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
userCourseSchema.statics = {
	findById: function (id, cb){
		return this
		.findOne({ _id: id })
		.exec(cb)
	},
	fetch: function(getuser, getw, cb){
		return this
		 .find({ user: getuser, cweek: getw })
		 .exec(cb)
	}
}
module.exports = userCourseSchema
