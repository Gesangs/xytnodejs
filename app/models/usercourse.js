var mongoose = require('mongoose')
var userCourseSchema = require('../schemas/usercourse.js')
var userCourse = mongoose.model('userCourse',userCourseSchema)

module.exports = userCourse