const Section = require('../models/section')
const News = require('../models/news')


exports.getAll = (req, res) => {
  Section.find({}).exec((err, sections) => {
    if(err) console.log(err)
    return res.json({ code: 0, sections })		
  })
}

exports.createSection = (req, res) => {
  const section = new Section(req.body)
  section.save(function(err, section) {
    if(err) console.log(err)
    return res.json({ code: 0, msg: '创建成功' })		
  })
}

exports.delete = (req, res) => {
  const { type } = req.query
  Section.deleteOne({ type }, (err, news) => {
    News.remove({ type }, (err, news) => {
      return res.json({ code: 0, msg: '删除成功' })
    })
  })
}

exports.update = (req, res) => {
  const { _id, desc } = req.body
  Section.update({ _id }, { $set: { abstract: desc } }, (err, news) => {
    return res.json({ code: 0, msg: '更新成功' })
  })
}