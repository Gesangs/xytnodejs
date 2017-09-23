var mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	username: {
		unique:true,
		type:String
	},
	password:String,
	role:{
		type:Number,
		default:0
	},
	zhuanye:{
		type:String,
		default:''
	},
	xuehao: String,
	banji:{
		type:Number,
		default:null
	},
	sex:{
		type:String,
		default:null
	},
	touxiang:{
		type:String,
		default:'default.png'
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})



//更新之前 判断更新时间
UserSchema.pre('save',function(next){
	var user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else{
		this.meta.updateAt = Date.now()
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return bext(err)

			bcrypt.hash(user.password, salt, function(err, hash) {
				user.password = hash;
				next();
			})
	})


})

UserSchema.methods = {
	comparePassword: function(_password ,cb) {
		bcrypt.compare(_password, this.password, function(err, isMatch) {
			if(err) return cb(err)
			cb(null, isMatch)
		})
	}
}
//取出目前数据库所有的数据
UserSchema.statics = {
	fetch:function(cb){
		return this
		 .find({})
		 .sort('meta.updateAt')
		 .exec(cb)
	},
	findById:function(id, cb){
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}

module.exports = UserSchema