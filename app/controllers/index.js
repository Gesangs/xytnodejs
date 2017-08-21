// login page
exports.index = function(req, res){
	var _user = req.session.user
	if(_user) return res.redirect('/content')
	res.render('login')
}