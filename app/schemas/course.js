var mongoose = require('mongoose')

var CourseSchema = new mongoose.Schema({
	zhuanye:String,
	banji:Number,
	kebiao:[{
		cweek:String,
		cweekth:[],
		jieci:String,
		cname:String,
		point:String,
		teacher:String,
	}],
})

CourseSchema.statics = {
	fetch:function(getzy, getbj, getweek, getw ,cb){
		return this
		.aggregate(
	    	[{$match: {zhuanye: getzy, banji: getbj}},
	    	 {$project:{kebiao:1}},
	    	 {$unwind:'$kebiao'},
	    	 {$match: {"kebiao.cweek":getweek, "kebiao.cweekth":{$in:[getw]}}}])
		.exec(cb)
	},
	findById:function(id, cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}
module.exports = CourseSchema