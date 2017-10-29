const path = require('path')

const Datastore = require('nedb')
const dbFile = path.resolve(__dirname, '../data/state.db')
const db = new Datastore({ filename: dbFile, autoload: true })

module.exports = db