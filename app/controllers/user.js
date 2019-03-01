var User = require('../models/user.js')
var fs = require("fs")
var path = require('path')
// 注册
exports.signup = function(req, res) {
	const { xuehao, password } = req.body;
	User.findOne({ xuehao }, function(err, user) {
		if(err) console.log(err)
		if(user) {
			return res.json({ code: 1, msg: '此学号已被注册' })
		} else {
			var user = new User({
				xuehao,
				password
			})
			user.save(function(err, user) {
			if(err) console.log(err)
			return res.json({ code: 0, msg: '注册成功' })			
		})
		}
	})
}

// 登录
exports.signin = function(req, res) {
	const { xuehao, password } = req.body
	User.findOne({ xuehao }, function(err, user) {
		if(err) console.log(err)
		if(!user) {
			return res.json({ code: 2, msg: '账号不存在，请注册' })			
		}
		user.comparePassword(password, function(err, isMatch) {
			if(err) console.log(err)
			if(isMatch) {
				res.json({ code: 0, msg: '登录成功' })
			} else{
				res.json({ code: 1, msg: '密码错误' })				
			}
		})
	})
}

exports.getUserInfo = (req, res) => {
	const { xuehao } = req.query
	User.findOne({ xuehao }, (err, user) => {
		if(err) console.log(err)
		if(user) {
			return res.json({ code: 0, user })		
		} else {
			return res.json({ code: 1, msg: '账号不存在，请注册' })			
		}
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
			console.log(user.role);
		return res.redirect('/')
		}
	next()
}
exports.saveTouxiang = function(req, res, next) {
	const txdata = req.files.avatar;
	
	if(txdata) {
		const filePath = txdata.path
		const { xuehao } = req.body
		const originalFilename = txdata.originalFilename
		fs.readFile(filePath, function(err, data) {
			const type = txdata.type.split('/')[1]
			const touxiang = xuehao + '-avatar.' + type
			const newPath = path.join(__dirname, '../../', 'public/touxiang/' + touxiang)

			fs.writeFile(newPath, data, function(err) {
				req.body.touxiang = touxiang
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

exports.checkName = function(req, res) {
	var user = req.body.username;
	User.findOne({uesrname: user}, function(err, user) {
		if(err) {
			log(err);
		}
		if(user) {
			res.render("该昵称被占用！")
		}
	})
}

exports.wodeupdate = function(req, res){
	const { xuehao } = req.body
	delete req.body.xuehao
	User.update({ xuehao }, { $set: req.body }, (err, u) => {
		if (err) console.log(err)
		User.findOne({ xuehao }, (err, user) => {
			return res.json({ code: 0, user })
		})
	})
}

exports.chat = function(req,res){
	res.render('icon-chat', {title: '聊天机器人'})
}

