import LocalStorageService from './services/localStorageService.js'

export default class DataService {
  constructor(key) {
    this.storage = new LocalStorageService('notes')

    let dataFromStorage = this.storage.getAll()

    this.style = dataFromStorage.style || 'day'
    this.filterItems = dataFromStorage.filterItems || false
    this.sortBy = dataFromStorage.sortBy || 'default'
    this.notes = dataFromStorage.notes || []
    
    this.saveAllItems({
        style: this.style,
        filterItems: this.filterItems,
        sortBy: this.sortBy,
        notes: this.notes
      })
  }
  updateItem(item, value, callback) {
    this[item] = value

    this.saveAllItems({
      style: this.style,
      filterItems: this.filterItems,
      sortBy: this.sortBy,
      notes: this.notes
    })

    if(callback) callback()
  }
  getItem(key) {
    return this[key]
  }
  saveAllItems(toPersist) {
    this.style = toPersist.style
    this.filterItems = toPersist.filterItems
    this.sortBy = toPersist.sortBy
    this.notes = toPersist.notes

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
