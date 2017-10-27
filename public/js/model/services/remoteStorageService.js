
import StorageService from './storageService.js'

export default class RemoteStorageService extends StorageService {
  constructor(key) {
    super(key)
    this.storage = 'init storage state'
  }
  _readFromDataStorage() {
    console.log('reading from storage')
    return fetch('/store/state')
      .then(res => res.json())
    } 
  setData(data) {
    this._storage = data
    console.log(this._storage)
    this._writeToDataStorage(data)
  }
  _writeToDataStorage(toPersist) {
    console.log('remote write')
    console.log(toPersist)
    localStorage.setItem(this.key, JSON.stringify(toPersist))

    fetch('/store/state', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({state: toPersist})
    }).then(res => res.json()).then(console.log)

  }
  getAll(){
    console.log(this._readFromDataStorage())
    return this._readFromDataStorage()
  }
}
