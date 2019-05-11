const mongoose = require('mongoose')
const SectionSchema = require('../schemas/section')
const Section = mongoose.model('Section', SectionSchema)

module.exports = Section