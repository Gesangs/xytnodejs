var mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	xuehao: {
		unique:true,
		type: String
	},
	password: String,
	role:{
		type: Number,
		default: 1
	},
	zhuanye:{
		type: String,
		default:''
	},
	username: String,
	banji:{
		type: Number,
		default: null
	},
	sex:{
		type: Number,
		default: 0
	},
	desc: {
		type: String,
		default: ''
	},
	touxiang:{
		type: String,
		default:'default.png'
	},
	meta:{
		createAt:{
			type: Date,
			default:Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
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

UserSchema.statics = {
	findByXuehao: function(xuehao, cb) {
		return this
		.findOne(xuehao)
		.select({ password: 0, meta: 0 })
		.exec(cb)
	}
}

module.exports = UserSchema