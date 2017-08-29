var User = require('../models/user.js')
var fs = require("fs")
var path = require('path')
// signup
exports.signup = function(req, res) {
	var _user = req.body.user;
	User.findOne({username: _user.username}, function(err,user) {
		if(err) {
			console.log(err)
		}
		if(user) {
			req.flash('error','此用户名已被占用');
			return res.redirect('/')
		}
		else {
			var user = new User(_user)
			user.save(function(err, user) {
				if(err) {
			console.log(err)
			}
			req.flash('error','注册成功');
			res.redirect('/')
		})
		}
	})
}
//signin
exports.signin = function(req, res) {
	var _user = req.body.user;
	var name = _user.username;
	var password = _user.password;
	User.findOne({username: name}, function(err, user) {
		if(err) {
			console.log(err)
		}

		if(!user) {
			req.flash('error','用户名不存在');
			return res.redirect('/')
		}

		user.comparePassword(password, function(err, isMatch) {
			if(err){
				console.log(err)
			}
			if(isMatch) {
				console.log('yes!')
				req.flash('info','登录成功');
				req.session.user = user;
				return res.redirect('/content')
			}
			else{
				req.flash('error','密码错误');
				console.log('error!')
				return res.redirect('/')
			}
		})
	})
}
// logout
exports.logout = function(req, res) {
	delete req.session.user;
	delete res.locals.user;
	res.redirect('/');
}

exports.signinRequired = function(req, res, next) {
	var user = req.session.user
	if(!user) {
		req.flash('error','请登录!');
		return res.redirect('/')
	}
	next()
}
exports.findRequired = function(req, res, next) {
	var user = req.session.user;
		if(user.zhuanye === null || user.banji === null) {
		req.flash('error','请完善个人信息！');
		return res.redirect('/icon-wode')
	}
	next()
}
exports.adminRequired = function(req, res, next) {
	var user = req.session.user;
		if(typeof(user.role) === 'undefined' || user.role === "" || user.role <= 10) {
		return res.redirect('/')
		}
	next()
}
exports.saveTouxiang = function(req, res, next) {
	var user = req.session.user;
	var txdata = req.files.uploadTouxiang;
	var filePath = txdata.path
	var originalFilename = txdata.originalFilename

	if(originalFilename) {
		fs.readFile(filePath, function(err, data) {
			var txname = user.username
			var type = txdata.type.split('/')[1]
			var touxiang = txname + '.' + type
			var newPath = path.join(__dirname, '../../', 'public/touxiang/' + touxiang)

			fs.writeFile(newPath, data, function(err) {
				req.touxiang = touxiang
				next()
			});

		});
	}
	else {
		next()
	}
}
// wode page
exports.wode = function(req,res){
	var user = req.session.user;
	User.findOne({_id:user._id},function(err, user) {
		res.render('icon-wode',{
		title: '个人信息',
		user: {
            username: user.username,
            xuehao: user.xuehao,
            zhuanye: user.zhuanye,
            banji: user.banji,
            sex: user.sex,
            touxiang:user.touxiang
        }
	})
  })
}

exports.wodeupdate = function(req,res){
	var user = req.session.user;
	var _user = req.body.user;
	var id = user._id;
	var xuehao = _user.xuehao
	var zhuanye = _user.zhuanye
	var banji = _user.banji
	var sex = _user.sex;
	var touxiang = req.touxiang
	if(typeof(touxiang) !== "undefined") {
		User.update({_id:id}, {$set:{touxiang:touxiang}}, function(err, user) {
		    if (err) {
		      console.log(err)
		    }
		  })
	}
	if(zhuanye !== "") {
		User.update({_id:id}, {$set:{zhuanye:zhuanye}}, function(err, user) {
		    if (err) {
		      console.log(err)
		    }
		  })
	}
	if(banji !== "") {
		User.update({_id:id}, {$set:{banji:banji}}, function(err, user) {
		    if (err) {
		      console.log(err)
		    }
		  })
	}
	if(sex !== "") {
		User.update({_id:id}, {$set:{sex:sex}}, function(err, user) {
		    if (err) {
		      console.log(err)
		    }
		  })
	}
		User.update({_id:id}, {$set:{xuehao:xuehao}}, function(err, user) {
		    if (err) {
		      console.log(err)

		    }
		  })
	User.findOne({_id:id}, function(err, user){
		if(err) {
			console.log(err);
		}
		req.session.user = user;
		req.session.save();
	})
	return res.redirect('/icon-wode')
}

exports.chat = function(req,res){
	res.render('icon-chat', {title: '聊天机器人'})
}