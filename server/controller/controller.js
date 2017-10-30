const store = require('../services/appStateStore.js')

module.exports.getItems = function(req, res, type) {
  console.log('getting ' + type + ' in controller')
  try {
    store.all(type, function(err, state) {
      if (err) throw new Error(err)
      res.json(state)
    })
  } catch(e) {
    res.json(e)
  }
}

module.exports.putItems = function(req, res, type) {
  console.log('put' + type)
  console.log(req.body.data)
  
  if(!req.body.data) {
    res.json('no data to save')
  }

  try {
    store.put(type, req.body.data, function(err, doc) {
      if (err) {
        console.log(err)
        res.json(err)
      }
      res.json(doc)
    })
  }
  catch(e) {
    console.log(e)
    res.json(e)
  }
}
