'use strict'
const Controller = (function() {
  class Controller {
    init() {
      View.init()
      
      if(window.location.search.substring(1)) {
        this.createItems(helpers.getQueryStringAsObject())
      }
    }
    getItem(key) {
      return Model.getItem(key)
    }
    setItem(key, item) {
      Model.setItem(key, item)
    }
    
    getItems() {
      return Model.getItems()
    }
    setItem(key, item) {
      Model.setItem(key, item)
      this.render()
    }
    render () {
      View.render()
    }
    markAsFinished(itemId, callback) {
      Model.markAsFinished(itemId, View.render.bind(View))
    }
    createItems(query) {
      if (query.mode) {
        View.fillFields(Model.getItems().find(el => el.id.toString() === query.id))
        // implement edit mode  
      }

      const items = Model.getItems()
      const note = query
      
      if (note) {
        note.id = new Date().getTime()
        note.importance = note.importance || 1
        note.finished = false
        // note.finishby = new Date(note.finishby).getTime() > new Date().getTime() ? note.finishby : new Date().format("dd-mm-yyyy")
        items.push(note)
        Model.saveItems(items)
      }
    }
  }
  return new Controller()
})()
  