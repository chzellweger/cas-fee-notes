const store = require('../services/appStateStore.js')

module.exports.getItems = function(req, res, type) {
  store.all(type, function(err, state) {
    if (err) {
      console.log('ERROR: ' + err.code + ' (' + err.message + ')')
      return
    }
    res.json(state)
  })
}

module.exports.putItems = function(req, res, type) {
  if (!req.body.data) {
    res.json('no data to save')
    return
  }
  
  store.put(type, req.body.data, function(err, numAffected, doc) {
    if (err) {
      console.log('ERROR: ' + err.code + ' (' + err.message + ')');
      return
    }
    res.json(doc)
  })
}
