import remoteService from '../data/remoteService.js'

let appState = {}

function load(callback) {

  ;(async function() {
    let data = await remoteService.getAll('state')
    
    data = data && data[0] || {}
    
    appState.type = 'state'
    appState.style = data.style || 'day'
    appState.filterItems = data.filterItems || false
    appState.sortBy = data.sortBy || 'default'

    saveAllItems(appState, callback)  
  })()
}

function updateItem(item, value, callback) {
  appState[item] = value
  
  saveAllItems(appState, callback)
}

function getItem(key) {
  return appState[key]
}

function saveAllItems(toPersist, callback) {
  appState.type = toPersist.type
  appState.style = toPersist.style
  appState.filterItems = toPersist.filterItems
  appState.sortBy = toPersist.sortBy
  
  remoteService.persist('state', toPersist)
  
  if (callback) return callback(toPersist)
}

function getAllItems() {
  return load('state', () => {
    return appState
  })
}

export default {
  load: load,
  getAll: getAllItems,
  saveAll: saveAllItems,
  getItem: getItem,
  updateItem: updateItem
}
