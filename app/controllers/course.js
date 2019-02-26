let mongoose = require('mongoose')
let Course = require('../models/course.js');
let User = require('../models/user.js');
let userCourse = require('../models/usercourse.js')
let moment = require('moment');
let querystring = require("querystring");
let http = require('http')

// home page
exports.homepage = function (req, res) {
	res.render('homepage', { title: '个人校园' })
}

const swapWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

let now; let time; let weekths;
// course page
exports.todaycourse = function (req, res) {
	let _user = req.session.user;
	now = moment();
	time = swapWeek[moment(now).format('d')]; res.locals.time = time;
	weekths = (moment(now).format('w') - moment([2017, 8, 4]).format('w') + 1).toString();
	User.findOne({ _id: _user._id }, function (err, user) {
		Course.fetch(user.zhuanye, user.banji, time, weekths, function (err, courses) {
			userCourse.fetch(user.username, time, function (err, usercourses) {
				if (err) {
					console.log(err)
				}
				res.render('icon-ht-class', {
					week: time,
					weekth: weekths,
					courses: courses || [],
					usercourses: usercourses
				})
			})
		})
	})
};
exports.precourse = function (req, res) {
	let user = req.session.user
	now = moment(now).subtract(1, "d");
	time = swapWeek[moment(now).format('d')];
	weekths = (moment(now).format('w') - moment([2017, 8, 4]).format('w') + 1).toString();
	User.findOne({ _id: user._id }, function (err, user) {
		Course.fetch(user.zhuanye, user.banji, time, weekths, function (err, courses) {
			userCourse.fetch(user.username, time, function (err, usercourses) {
				if (err) {
					console.log(err)
				}
				res.render('icon-ht-class', {
					week: time,
					weekth: weekths,
					courses: courses || [],
					usercourses: usercourses
				})
			})
		})
	})
};
exports.nextcourse = function (req, res) {
	let user = req.session.user
	now = moment(now).add(1, "d");
	time = swapWeek[moment(now).format('d')];
	weekths = (moment(now).format('w') - moment([2017, 8, 4]).format('w') + 1).toString();
	User.findOne({ _id: user._id }, function (err, user) {
		Course.fetch(user.zhuanye, user.banji, time, weekths, function (err, courses) {
			userCourse.fetch(user.username, time, function (err, usercourses) {
				if (err) {
					console.log(err)
				}
				res.render('icon-ht-class', {
					week: time,
					weekth: weekths,
					courses: courses || [],
					usercourses: usercourses
				})
			})
		})
	})
};

// chengji page
exports.chengji = function (req, res) {
	res.render('icon-chengji', { title: '查询成绩' })
}

// kaoshi page
exports.kaoshi = function (req, res) {
	res.render('icon-kaoshi')
}


// xuankebaoming page
exports.xuanke = function (req, res) {
	res.render('icon-xuankebaoming', {
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
exports.admin = function (req, res) {
	res.render('admin', {
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
exports.adminsave = function (req, res) {
	let courseObj = req.body.course;
	courseObj.cweekth = Array.isArray(courseObj.cweekth) ? courseObj.cweekth : [courseObj.cweekth];
	switch (courseObj.cweekth[0]) {
		case '000':
			for (let i = 1; i <= 15; i++) {
				courseObj.cweekth.push(i.toString());
			} break;
		case '111':
			for (let i = 1; i <= 15; i += 2) {
				courseObj.cweekth.push(i.toString());
			} break;
		case '222':
			for (let i = 0; i <= 15; i += 2) {
				courseObj.cweekth.push(i.toString());
			} break;
	}
	if (courseObj.cname && courseObj.teacher) {
		Course.findOne({ zhuanye: courseObj.zhuanye, banji: courseObj.banji }, function (err, course) {
			course = course || new Course({ zhuanye: courseObj.zhuanye, banji: courseObj.banji })
			let kebiao = {
				cname: courseObj.cname,
				jieci: courseObj.jieci,
				cweek: courseObj.cweek,
				teacher: courseObj.teacher,
				point: courseObj.point,
				cweekth: courseObj.cweekth
			}
			course.kebiao.push(kebiao);
			course.save(function (err, course) {
				if (err) {
					console.log(err)
				}
				res.redirect('/')
			})
		})
	}
	else {
		let course = new Course({
			zhuanye: courseObj.zhuanye,
			banji: courseObj.banji
		});
		course.save(function (err, course) {
			if (err) {
				console.log(err)
			}
			res.redirect('/icon-ht-class');
		});
	}
};

exports.xuankesave = function (req, res) {
	let user = req.session.user;
	let courseObj1 = req.body.usercourse;
	let _usercourse = null;
	_usercourse = new userCourse({
		user: user.username,
		cname: courseObj1.cname,
		jieci: courseObj1.jieci,
		cweek: courseObj1.cweek,
		teacher: courseObj1.teacher,
		point: courseObj1.point,
	});
	_usercourse.save(function (err, usercourse) {
		if (err) {
			console.log(err)
		}
		res.redirect('/');
	});
}

exports.seek = function (req, res) {
	let msg = req.body.cj;
	let wholeData;
	let postData = querystring.stringify({
		"name": msg.name,
		"level": msg.level,
		"id_num": msg.number
	})
	let options = {
		hostname: 'ecjtu.org',
		port: 80,
		path: '/cet/cet.php',
		method: 'POST',
		headers: {
			'Accept': '*/*',
			'Accept-Language': 'zh-CN,zh;q=0.8',
			'Content-Length': postData.length,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Cookie': 'UM_distinctid=15cdd0862083c9-0c2fcf1405f5dc-396b4e08-e1000-15cdd08620965f',
			'Host': 'ecjtu.org',
			'Origin': 'http://ecjtu.org',
			'Proxy-Connection': 'keep-alive',
			'Referer': 'http://ecjtu.org/cet/',
			'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
			'X-Requested-With': 'XMLHttpRequest'
		}

	};
	let qwe = http.request(options, function (asd) {
		let buffers = [];
		console.log('Status: ' + asd.statusCode)
		console.log('headers: ' + JSON.stringify(asd.headers))
		asd.on('data', function (chunk) {
			console.log(Buffer.isBuffer(chunk));
			buffers.push(chunk);
		})

		asd.on('end', function () {
			console.log("结束！")
			wholeData = Buffer.concat(buffers);
			wholeData = JSON.parse(wholeData)
			wholeData = wholeData.data.w_test
			console.log('content' + wholeData);
			res.render('icon-chengji', {
				zkz: wholeData.crtNum,
				zf: wholeData.total,
				tl: wholeData.listen,
				yd: wholeData.reading,
				xz: wholeData.writing
			})
		})
	})
	qwe.on('error', function (e) {
		console.log(e.message)
	})
	qwe.write(postData)
	qwe.end()
}