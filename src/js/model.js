/* eslint no-unused-vars: "off" */

const Model = (function() {
  class Model {
    setItem(key, value) {
      localStorage.setItem(key, JSON.stringify(value))
    }
    getItem(key) {
      return JSON.parse(localStorage.getItem(key))
    }
    getItems() {
      return localStorage.notes ? JSON.parse(localStorage.getItem('notes')) : []
    }
    saveItems(items) {
      localStorage.setItem('notes', JSON.stringify(items))
    }
    markAsFinished(id, callback) {
      const item = this.getItems().find(el => el.id.toString() === id)
      const restItems = this.getItems().filter(el => el.id.toString() !== id)

      const modifiedItem = Object.assign(item, { finished: !item.finished })

      restItems.push(modifiedItem)

      this.saveItems(restItems)

      callback()
    }
  }
  return new Model()
})()
