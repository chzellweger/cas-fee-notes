export default class StorageService {
  constructor(key) {
    this.key = key
  }
  _readFromDataStorage() {
    throw new TypeError(this.constructor.name+'._readFromDataStorage is not a function. Your class "' + this.constructor.name + '" extends from StorageService but does not implement a method _readFromDataStorage. Please implement the method _readFromDataStorage in your class "' + this.constructor.name + '" to use StorageService.')
  }
  _writeToDataStorage(toPersist) {
    throw new TypeError(this.constructor.name+'._writeToDataStorage is not a function. Your class "' + this.constructor.name + '" extends from StorageService but does not implement a method _writeToDataStorage. Please implement the method _writeToDataStorage in your class "' + this.constructor.name + '" to use StorageService.')
  }
  getAll() {
    return this._storage
  }
  persist(toPersist) {
    this._storage = toPersist
    this._writeToDataStorage(this._storage)
  }
}
