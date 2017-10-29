const store = require('../services/appStateStore.js')

module.exports.getState = function(req, res) {
  console.log('getting state in state-controller')
  try {
    store.all('state', function(err, state) {
      if (err) throw new Error(err)
      res.json(state)
    })
  } catch(e) {
    res.json(e)
  }
}

module.exports.putState = function(req, res) {
  console.log('put state')
  console.log(req.body.data)
  
  if(!req.body.data) {
    res.json('no data to save')
  }

  try {
    store.put('state', req.body.data, function(err, doc) {
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
