const Index = require('../app/controllers/index.js');
const User = require('../app/controllers/user.js');
const Message = require('../app/controllers/message.js')
const News = require('../app/controllers/news')
const Section = require('../app/controllers/section')
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
		// course page
	app.post('/user/post_message', Message.save)
	app.get('/news/get_message', Message.getAllByOne)
	app.get('/user/get_lately_message', Message.getLatelyByUser)
	app.post('/message/search', Message.search)
	app.get('/message', Message.getAll)


	app.get('/icon-wode', User.signinRequired, User.wode)
	app.get('/icon-chat', User.signinRequired, User.chat)

		/*** 录入 ***/
	app.post('/wode/update',User.saveTouxiang, User.wodeupdate);


	// 资讯
	app.get('/news', News.getNews)
	app.post('/news/search', News.search)
	app.post('/admin/save_news', News.save)
	app.post('/admin/delete_news', News.delete)
	app.post('/admin/update_news', News.update)

	// 资讯版块
	app.get('/section', Section.getAll)
	app.post('/section/create', Section.createSection)


	// 用户
	app.get('/user', User.getAllUser)
	app.post('/user/search', User.search)
	app.post('/user/check_name', User.checkName)
}