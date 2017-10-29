const store = require('../services/appStateStore.js')

module.exports.getNotes = function(req, res) {
  console.log('getting notes in note-controller')
  try {
    store.all('notes', function(err, state) {
      if (err) throw new Error(err)
      console.log(state)
      res.json(state)
    })
  } catch(e) {
    res.json(e)
  }
}

module.exports.putNotes = function(req, res) {
  console.log('put notes')
  console.log(req.body.data)
  
  if(!req.body.data) {
    res.json('no data to save')
    return
  }

  try {
    store.put('notes', req.body.data, function(err, doc) {
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
