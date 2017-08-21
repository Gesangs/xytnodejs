var mongoose = require('mongoose')
var Course = require('../models/course.js');
var User = require('../models/user.js');
var userCourse = require('../models/usercourse.js')
var moment = require('moment');

// home page
exports.homepage = function(req,res){
	res.render('homepage',{title: '果冻校园通'})
}

function swapWeek(time){
		switch (time) {
		case '0':
			time = '周日';
			break;
		case '1':
			time = '周一';
			break;
		case '2':
			time = '周二';
			break;
		case '3':
			time = '周三';
			break;
		case '4':
			time = "周四";
			break;
		case '5':
			time = '周五';
			break;
		case '6':
			time = '周六';
			break;
		}
		return time;
	}
	var now;var time;var weekths;
// course page
exports.todaycourse = function(req,res){
		var _user = req.session.user;
		now = moment();
		time = swapWeek(moment(now).format('d'));res.locals.time = time;
    	weekths = (moment(now).format('w') - moment([2017,6,21 ]).format('w')).toString();
    		User.findOne({_id:_user._id}, function(err, user) {
    			Course.fetch(user.zhuanye, user.banji, time, weekths, function(err, courses) {
    				userCourse.fetch(user.username, time, function(err, usercourses) {
    					if(err) {
    					console.log(err)
    					}
    					res.render('icon-ht-class',{
							week:time,
							weekth:weekths,
							courses:courses,
							usercourses:usercourses
	    			})
    			})
    		})
  		})
	};
exports.precourse = function(req,res){
		var user = req.session.user
		now = moment(now).subtract(1,"d");
		time = swapWeek(moment(now).format('d'));
    	weekths = (moment(now).format('w') - moment([2017,6,21 ]).format('w')).toString();
    	User.findOne({_id:user._id}, function(err, user) {
			Course.fetch(user.zhuanye, user.banji, time, weekths, function(err,courses) {
				userCourse.fetch(user.username, time, function(err, usercourses) {
					if(err){
						console.log(err)
					}
					res.render('icon-ht-class',{
						week:time,
						weekth:weekths,
						courses:courses,
						usercourses:usercourses
				    })
			    })
		    })
        })
	};
exports.nextcourse = function(req,res){
		var user = req.session.user
		now = moment(now).add(1,"d");
		time = swapWeek(moment(now).format('d'));
    	weekths = (moment(now).format('w') - moment([2017,6,21 ]).format('w')).toString();
    	User.findOne({_id:user._id}, function(err, user) {
    		Course.fetch(user.zhuanye, user.banji, time, weekths, function(err,courses) {
    			userCourse.fetch(user.username, time, function(err, usercourses) {
					if(err){
						console.log(err)
					}
					res.render('icon-ht-class',{
						week:time,
						weekth:weekths,
						courses:courses,
						usercourses:usercourses
				    })
			    })
	        })
        })
	};

// chengji page
exports.chengji = function(req,res){
	res.render('icon-chengji')
}

// kaoshi page
exports.kaoshi = function(req,res){
	res.render('icon-kaoshi')
}


// xuankebaoming page
exports.xuanke = function(req,res){
	res.render('icon-xuankebaoming',{
		title: '添加课程',
		usercourse: {
            cname: '',
            teacher: '',
            point: '',
            jieci: '',
            cweek: '',
        }
	})
}

//admin page
exports.admin = function(req,res){
	res.render('admin',{
		title: '课程 后台录入页',
		course: {
			zhuanye: '',
			banji: '',
            cname: '',
            teacher: '',
            point: '',
            jieci: '',
            cweek: '',
            cweekth: ''
        }
	});
};
//admin post course
exports.adminsave = function(req,res){
	var courseObj = req.body.course;
	var couseweekth = new Array(courseObj.cweekth);
		switch (couseweekth[0]) {
			case '000':
				for(var i=1;i<=15;i++) {
			couseweekth.push(i.toString());
		}
				break;
			case '111':
				for(var i=1;i<=15;i+=2) {
			couseweekth.push(i.toString());
		}
				break;
			case '222':
				for(var i=0;i<=15;i+=2) {
			couseweekth.push(i.toString());
		}
				break;
		}
		if(courseObj.cname && courseObj.teacher) {
		Course.findOne({zhuanye: courseObj.zhuanye, banji: courseObj.banji}, function(err, course) {
			var kebiao = {
				cname: courseObj.cname,
				jieci: courseObj.jieci,
				cweek: courseObj.cweek,
				teacher: courseObj.teacher,
				point: courseObj.point,
				cweekth: couseweekth
			}
			course.kebiao.push(kebiao);
			course.save(function(err, course) {
				if(err) {
					console.log(err)
				}
				res.redirect('/')
			})
		})
	}
	else {
		var course = new Course({
			zhuanye: courseObj.zhuanye,
			banji: courseObj.banji
		});
		course.save(function(err,course){
			if(err){
					console.log(err)
				}
			res.redirect('/icon-ht-class');
		});
	}
};

exports.xuankesave = function(req,res){
	var user = req.session.user;
	var courseObj1 = req.body.usercourse;
	var _usercourse = null;
	_usercourse = new userCourse({
			user: user.username,
			cname: courseObj1.cname,
			jieci: courseObj1.jieci,
			cweek: courseObj1.cweek,
			teacher: courseObj1.teacher,
			point: courseObj1.point,
		});
		_usercourse.save(function(err,usercourse){
			if(err){
					console.log(err)
				}
			res.redirect('/');
		});
	}
