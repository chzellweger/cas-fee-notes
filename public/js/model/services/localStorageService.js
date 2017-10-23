
import StorageService from './storageService.js'

export default class LocalStorageService extends StorageService {
  _readFromDataStorage() {
    return JSON.parse(localStorage.getItem(this.key) || '{}')
  }
  _writeToDataStorage(toPersist) {
    console.trace()
    localStorage.setItem(this.key, JSON.stringify(toPersist))
  }
}
