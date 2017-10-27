// import RemoteStorageService from './services/RemoteStorageService.js'
// import LocalStorageService from './services/LocalStorageService.js'
const storage = function() {}

let appState = {}

let dataFromStorage = storage.getAll()

appState.type = 'state'
appState.style = dataFromStorage.style || 'day'
appState.filterItems = dataFromStorage.filterItems || false
appState.sortBy = dataFromStorage.sortBy || 'default'
appState.notes = dataFromStorage.notes || []

saveAllItems(appState)

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
  appState.notes = toPersist.notes

  if (callback) callback()

  storage.persist(toPersist)
}

function getAllItems() {
  return appState
}

export default {
  getAll: getAllItems,
  saveAll: saveAllItems,
  getItem: getItem,
  updateItem: updateItem
}