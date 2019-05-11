const mongoose = require('mongoose')
const MessageSchema = require('../schemas/message.js')
const Message = mongoose.model('Message', MessageSchema)

module.exports = Message