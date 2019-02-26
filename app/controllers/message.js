var Message = require('../models/message')
exports.save = function(req,res){
	var _message = req.body.message;
	if (_message.cid) {
		Message.findById(_message.cid, function(err, message) {
			var reply = {
				from: _message.from,
				to: _message.tid,
				content: _message.content
			}
			message.reply.push(reply)
			message.save(function(err, message) {
				if(err) {
					console.log(err)
				}
				res.redirect('/icon-fankui')
			})
		})
	}
	else {
		var message = new Message(_message);
		message.save(function(err,message){
			if(err){
					console.log(err)
				}
			res.redirect('/icon-fankui');
		});
	}
}


// fankui page
exports.fankui = function(req,res){
	Message
		.find({})
		.populate('from', 'username touxiang')
		.populate('reply.from reply.to', 'username touxiang')
		.sort({'meta.updateAt':-1})
		.exec(function(err, messages) {
			console.log(messages)
			res.render('icon-fankui', {
				messages: messages,
			})

	})
}