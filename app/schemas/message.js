const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessageSchema = new mongoose.Schema({
	from: { type: ObjectId, ref: 'User' },
	reply: [{
		from: { type: ObjectId, ref: 'User' },
		to: { type: ObjectId, ref: 'User' },
		content: String,
	}],
	to: { type: ObjectId, ref: 'News' },
	content: String,
	createAt: {
		type: Date,
		default: Date.now()
	}
})

// MessageSchema.pre('save', function(next) {
//   if (this.isNew) {
//     this.meta.createAt = this.meta.updateAt = Date.now()
//   }
//   else {
//     this.meta.updateAt = Date.now()
//   }

//   next()
// })
module.exports = MessageSchema