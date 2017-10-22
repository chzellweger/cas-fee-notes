
import StorageService from './storageService.js'

export default class RemoteStorageService extends StorageService {
  async _readFromDataStorage() {
    let data
    await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(d => { data = d })
    console.log('data: ')
    console.log(data)
  } 
  _writeToDataStorage(toPersist) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(toPersist)
    })
  }
}
