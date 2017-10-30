const db = require('./db.js')

function publicGetState(type, callback) {
  try {
    db.find({ type: type }, function(err, doc) {
      if(err) { console.log(err) }
      if (callback) callback(err, doc)
    })
  } catch (e) {
    console.log(e)
  }
}

function publicPutState(type, state, callback) {
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
