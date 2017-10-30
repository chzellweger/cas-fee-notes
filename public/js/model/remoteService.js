let _storage = {}

function _readFromDataStorage(store, callback) {
  return fetch('/store/' + store)
    .then(res => {const d = res.json(); console.log(d); return d})
    .catch(e => console.error(e))
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