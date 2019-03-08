const News = require('../models/news')

exports.save = (req, res) => {
  const news = new News(req.body)
  news.save((err, news) => {
    if(err) console.log(err)
    return res.json({ code: 0, msg: '上传成功' })			
  })
}

exports.getNews = (req, res) => {
  if (req.query && req.query.id) {
    News.findById(req.query.id, (err, news) => {
      return res.json({ code: 0, news })
    })
  } else {
    News.findAll((err, news) => {
      if (err) console.log(err)
      return res.json({ code: 0, news })
    })
  }
}

exports.delete = (req, res) => {
  News.deleteOne({ _id: req.body._id }, (err, news) => {
    return res.json({ code: 0, msg: '删除成功' })
  })
}

exports.update = (req, res) => {
  const { _id } = req.body
  delete req.body._id
  News.update({ _id }, {$set: req.body }, (err, n) => {
    return res.json({ code: 0, msg: '更新成功' })
  })
}