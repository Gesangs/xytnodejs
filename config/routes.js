var Index = require('../app/controllers/index.js');
var User = require('../app/controllers/user.js');
var Course = require('../app/controllers/course.js');
var Message = require('../app/controllers/message.js')
module.exports = (app) => {
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
		next();
	})
		/*** 登录 ***/
	app.get('/', Index.index)
	app.post('/user/signup', User.signup)
	app.post('/user/signin', User.signin)
	app.get('/logout', User.logout)
	app.get('/user/info', User.getUserInfo)
	app.post('/check', User.checkName)
		/*** 课程 ***/
	app.get('/content', Course.homepage)
		// course page
	app.get('/icon-ht-class', User.findRequired, User.signinRequired, Course.todaycourse);
	app.get('/icon-ht-class/pre', User.findRequired, User.signinRequired, Course.precourse);
	app.get('/icon-ht-class/next', User.findRequired, User.signinRequired, Course.nextcourse);
	app.get('/icon-chengji', User.findRequired, User.signinRequired, Course.chengji)
	app.get('/icon-fankui', User.signinRequired, Message.fankui)
	app.post('/user/message', User.signinRequired, Message.save)
	app.get('/icon-kaoshi', User.findRequired, User.signinRequired, Course.kaoshi)
	app.get('/icon-wode', User.signinRequired, User.wode)
	app.get('/icon-chat', User.signinRequired, User.chat)

		/*** 录入 ***/
	app.get('/icon-xuankebaoming',User.findRequired, User.signinRequired, Course.xuanke)
	app.get('/admin/course',User.signinRequired, Course.admin);
	app.post('/admin/course/insert', Course.adminsave);
	app.post('/xuanke/insert', Course.xuankesave)
	app.post('/wode/update',User.saveTouxiang, User.wodeupdate);
	app.post('/chengji',Course.seek)
}