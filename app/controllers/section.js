const Section = require('../models/section')


exports.getAll = (req, res) => {
  Section.find({}).exec((err, sections) => {
    if(err) console.log(err)
    return res.json({ code: 0, sections })		
  })
}

exports.createSection = (req, res) => {
  console.log(req.body)
  const section = new Section(req.body)
  section.save(function(err, section) {
    if(err) console.log(err)
    return res.json({ code: 0, msg: '创建成功' })		
  })
}
