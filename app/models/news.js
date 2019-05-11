const mongoose = require('mongoose')
const NewsSchema = require('../schemas/news')
const News = mongoose.model('News', NewsSchema)

module.exports = News
