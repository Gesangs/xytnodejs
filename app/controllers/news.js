const News = require('../models/news')

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
    const limit = +req.query.limit || 3
    const page = +req.query.page || 0
    News.count((err, total) => {
      News.find({})
        .sort({ '_id': -1 })
        .skip(limit * page)
        .limit(limit)
        .exec((err, news) => {
          if (err) console.log(err)
          return res.json({ code: 0, news, total })
        })
    })
  }
}

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

// 新闻搜索, 根据标题名
exports.search = (req, res) => {
  const { key } = req.body
  News.find({ title: {$regex: key, $options:'i'} })
    .sort({ '_id': -1 })
    .exec((err, news) => {
			if (err) console.log(err)
			return res.json({ code: 0, news })
		})
}