let _storage = {}

function _readFromDataStorage(store, callback) {
  return fetch('/store/' + store)
    .then(res => res.json())
    .catch(err => {
      console.log('ERROR: ' + err.code + ' (' + err.message + ')')
    })
  }

function _writeToDataStorage(store, toPersist) {
  fetch(`/store/${store}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: toPersist})
  })
  .catch(err => {
    console.log('ERROR: ' + err.code + ' (' + err.message + ')')
  })
}

async function getAll(items) {
  return _readFromDataStorage(items)
}

function persist(store, toPersist) {
  _storage = toPersist
  _writeToDataStorage(store, _storage)
}

export default {
  getAll,
  persist
}
