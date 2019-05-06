const getAllUtil = (req, res, Model, name) => {
  const limit = +req.query.limit || 3
    const page = +req.query.page || 0
    Model.count((err, total) => {
      Model.find({})
        .sort({ '_id': -1 })
        .skip(limit * page)
        .limit(limit)
        .exec((err, news) => {
          if (err) console.log(err)
          return res.json({ code: 0, [name]: news, total })
        })
    })
}

module.exports = getAllUtil