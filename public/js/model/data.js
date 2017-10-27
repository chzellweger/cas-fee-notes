import RemoteStorageService from './services/RemoteStorageService.js'
// import LocalStorageService from './services/LocalStorageService.js'

export default class DataStorage {
  constructor(key) {

    this.storage = new RemoteStorageService('notes')

    let dataFromStorage = this.storage.getAll()
    console.log(dataFromStorage)
    /* {}
    this.storage.getAll().then(val => { 
      dataFromStorage = val
      console.log(dataFromStorage)
    })
    */
    this.type = 'state'
    this.style = dataFromStorage.style || 'day'
    this.filterItems = dataFromStorage.filterItems || false
    this.sortBy = dataFromStorage.sortBy || 'default'
    this.notes = dataFromStorage.notes || []

    this.saveAllItems({
      type: this.type,
      style: this.style,
      filterItems: this.filterItems,
      sortBy: this.sortBy,
      notes: this.notes
    })
  }
  updateItem(item, value, callback) {
    this[item] = value

    this.saveAllItems({
      type: this.type,
      style: this.style,
      filterItems: this.filterItems,
      sortBy: this.sortBy,
      notes: this.notes
    }, callback)
  }
  getItem(key) {
    return this[key]
  }
  saveAllItems(toPersist, callback) {
    this.type = toPersist.type
    this.style = toPersist.style
    this.filterItems = toPersist.filterItems
    this.sortBy = toPersist.sortBy
    this.notes = toPersist.notes

    if (callback) callback()

    this.storage.persist(toPersist)
  }
  getAllItems() {
    return {
      style: this.style,
      filterItems: this.filterItems,
      sortBy: this.sortBy,
      notes: this.notes
    }
  }
}
