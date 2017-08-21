var mongoose = require('mongoose')
var CourseSchema = require('../schemas/course.js')
var Course = mongoose.model('Course',CourseSchema)

module.exports = Course
