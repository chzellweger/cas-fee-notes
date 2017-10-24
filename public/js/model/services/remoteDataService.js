
import StorageService from './storageService.js'

export default class RemoteStorageService extends StorageService {
  async _readFromDataStorage() {
    console.log('remote read')
    let data = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
    this.setData(data)
  } 
  setData(data) {
    this._storage = data
    console.log(this._storage)
  }
  _writeToDataStorage(toPersist) {
    console.log(toPersist)
    /*
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(toPersist)
    })
    */
  }
}
