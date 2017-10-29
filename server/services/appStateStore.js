const db = require('./db.js')

function publicGetState(type, callback) {
  console.log('getting state, type ' + type + ' in appStateStore')
  try {
    db.find({ type: type }, function(err, doc) {
      console.log('db-op find, type ' + type + ' in appStateStore')
      if(err) { console.log(err) }
      if (callback) callback(err, doc)
    })
  } catch (e) {
    console.log(e)
  }
}

function publicPutState(type, state, callback) {
  console.log('putting state, type ' + type + ' in appStateStore')
  if (!state) {
    callback()
  }
  try {
    db.update({ type: type }, state, { upsert: true }, function(
      err,
      numAffected,
      affectedDocuments,
      upsert
    ) {
      console.log('db-op update, type ' + type + ' in appStateStore')
      if (err) console.log(err)
      callback(err, numAffected, affectedDocuments, upsert)
    })
  } catch (e) {
    console.log('cannot update because..:')
    console.log(e)
  }
}

module.exports = {
  all: publicGetState,
  put: publicPutState
}
