/* eslint no-unused-vars: "off" */

const Model = (function() {
  class Model {
    setItem(key, value, callback) {
      localStorage.setItem(key, JSON.stringify(value))

      if(callback) callback()
    }
    getItem(key) {
      return JSON.parse(localStorage.getItem(key))
    }
    getItems() {
      return localStorage.notes ? JSON.parse(localStorage.getItem('notes')) : []
    }
    saveItems(items, callback) {
      localStorage.setItem('notes', JSON.stringify(items))

      if (callback) callback()
    }
    markAsFinished(id) {
      console.log('mark as finished')
      const item = this.getItems().find(el => el.id.toString() === id)
      const restItems = this.getItems().filter(el => el.id.toString() !== id)

      const modifiedItem = Object.assign(item, { finished: !item.finished })

      restItems.push(modifiedItem)

      this.saveItems(restItems)
    }
  }
  return Model
})()
