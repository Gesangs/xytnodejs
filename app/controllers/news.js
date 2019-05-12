const News = require('../models/news')
const getAllUtil = require('../util')

// 添加文章
exports.save = (req, res) => {
  const news = new News(req.body)
  news.save((err, news) => {
    if(err) console.log(err)
    return res.json({ code: 0, msg: '上传成功' })			
  })
}

// 获取文章详情
exports.getNews = (req, res) => {
  if (req.query && req.query.id) {
    News.findById(req.query.id, (err, news) => {
      return res.json({ code: 0, news })
    })
  } else {
    getAllUtil(req, res, News, 'news')
  }
}

// TODO 通过type获取资讯


// 删除文章
exports.delete = (req, res) => {
  News.deleteOne({ _id: req.body._id }, (err, news) => {
    return res.json({ code: 0, msg: '删除成功' })
  })
}

// 管理员更新
exports.update = (req, res) => {
  const { _id } = req.body
  delete req.body._id
  News.update({ _id }, { $set: req.body }, (err, n) => {
    return res.json({ code: 0, msg: '更新成功' })
  })
}

// 用户点赞
exports.giveALike = (req, res) => {
  const { _id } = req.body
  News.update({ _id }, { $inc: { like: 1 } }, (err, n) => {
    return res.json({ code: 0, msg: n.like })
  })
}

exports.getByType = (req, res) => {
  const { type } = req.query
  News.find({ type }).exec((err, news) => {
    return res.json({ code: 0, news })
  })
}

// 新闻搜索, 根据标题名或文章内容
exports.search = (req, res) => {
  const { key } = req.body
	const reg = new RegExp(key, 'i')
  News.find({ $or: [
		{title: {$regex: reg}},
		{content: {$regex: reg}}
	]})
    .sort({ '_id': -1 })
    .exec((err, news) => {
			if (err) console.log(err)
			return res.json({ code: 0, news })
		})
}