const path = require('path')
const Datastore = require('nedb')

const dbFile = path.resolve(__dirname, '../data/state.db')

const db = new Datastore({ filename: dbFile, autoload: true })

function publicPutState(state, callback) {
  if (!state) {
    callback()
  }
  try {
    db.update({ type: 'state' }, state, { upsert: true }, function(
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

function publicGetState(type, callback) {
  console.log('gettingt state in store')
  try {
    db.find({ type: type }, function(err, doc) {
      if (callback) callback(err, doc)
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  all: publicGetState,
  put: publicPutState
}
