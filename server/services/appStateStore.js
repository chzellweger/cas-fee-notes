const db = require('./db.js')

function publicGetState(type, callback) {
  db.find({ type: type }, function(err, doc) {
    if (err) {
      console.log('ERROR: ' + err.code + ' (' + err.message + ')')
      return
    }
    if (callback) callback(err, doc)
  })
}

function publicPutState(type, state, callback) {
  if (!state) {
    callback()
    return
  }
  db.update({ type: type }, state, { upsert: true, returnUpdatedDocs: true }, function(
    err,
    numAffected,
    affectedDocuments,
    upsert
  ) {
    if (err) {
      console.log('ERROR: ' + err.code + ' (' + err.message + ')')
      return
    }
    callback(err, numAffected, affectedDocuments, upsert)
  })
}

module.exports = {
  all: publicGetState,
  put: publicPutState
}
