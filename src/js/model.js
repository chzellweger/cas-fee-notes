'use strict'
const model = (function() {

  const setItem = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getItem = function (key) {
    return JSON.parse(localStorage.getItem(key))
  }

  const getItems = function() {
    return localStorage.notes ? JSON.parse(localStorage.getItem('notes')) : []
  }

  const saveItems = function(items) {
    localStorage.setItem('notes', JSON.stringify(items))
  }
  
  const markAsFinished = function(id) {
    const items = getItems()
    const item = items.find(el => el.id.toString() === id)

    const filtered = items.filter(el => el.id.toString() !== id)
    
    item.finished = true

    filtered.push(item)
    
    saveItems(filtered)

    controller.render()
  }

  const createItems = function () {
    const items = model.getItems()
    const note = helpers.getQueryStringAsObject()

    if (note) {
      note.id = new Date().getTime()
      note.importance = note.importance || 1
      note.finished = false
      // note.finishby = new Date(note.finishby).getTime() > new Date().getTime() ? note.finishby : new Date().format("dd-mm-yyyy")
      items.push(note)
      model.saveItems(items)
    }
  }

  return {
    getItems,
    saveItems,
    setItem,
    getItem,
    markAsFinished,
    createItems
  }
})()