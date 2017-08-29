var Index = require('../app/controllers/index.js');
var User = require('../app/controllers/user.js');
var Course = require('../app/controllers/course.js');
var Message = require('../app/controllers/message.js')
module.exports = function(app){
	app.use(function(req, res, next) {
		res.locals.user = req.session.user;
		res.locals.errors = req.flash('error');
  		res.locals.infos = req.flash('info');
		next();})

	/*** 登录 ***/
app.get('/', Index.index)
app.post('/user/signup', User.signup)
app.post('/user/signin', User.signin)
app.get('/logout', User.logout)
	/*** 课程 ***/
app.get('/content', Course.homepage)
	// course page
app.get('/icon-ht-class', User.findRequired, User.signinRequired, Course.todaycourse);
app.get('/icon-ht-class/pre', User.findRequired, User.signinRequired, Course.precourse);
app.get('/icon-ht-class/next', User.findRequired, User.signinRequired, Course.nextcourse);
app.get('/icon-chengji', User.findRequired, User.signinRequired, Course.chengji)
app.get('/icon-fankui',  Message.fankui)
app.post('/user/message', User.signinRequired, Message.save)
app.get('/icon-kaoshi', User.findRequired, User.signinRequired, Course.kaoshi)
app.get('/icon-wode', User.signinRequired, User.wode)
app.get('/icon-chat', User.chat)

	/*** 录入 ***/
app.get('/icon-xuankebaoming',User.findRequired, User.signinRequired, Course.xuanke)
app.get('/admin/course',User.adminRequired, User.signinRequired, Course.admin);
app.post('/admin/course/insert', Course.adminsave);
app.post('/xuanke/insert', Course.xuankesave)
app.post('/wode/update',User.saveTouxiang, User.wodeupdate);
app.post('/chengji',Course.seek)
}