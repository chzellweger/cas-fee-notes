'use strict'
const model = (function() {
  function Model(){
    this.val = 'hi'
  }
  return {
    Model
  }
})()
/*
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
    console.log(helpers.getQueryVariable('mode'))
    if (helpers.getQueryVariable('mode') === 'edit') {
      console.log(this)
      this.editItem(helpers.getQueryVariable('id'))
      return
    }
  
 /*   
    if(id && note) {
      let note = items.find(el => el.id.toString() === id.toString())
      console.log(note)
    }
 */

 /*
  
    if (note) {
      note.id = new Date().getTime()
      note.importance = note.importance || 1
      note.finished = false
      // note.finishby = new Date(note.finishby).getTime() > new Date().getTime() ? note.finishby : new Date().format("dd-mm-yyyy")
      items.push(note)
      model.saveItems(items)
    }
  }

  const editItem = function(id) {
    const item = helpers.getQueryStringAsObject()
    item.id = id
    console.log(id)
  }

  const hello = function () {
    console.log('hello')
  }

  const exposeHello = function() {
    this.hello()
  }

  return {
    getItems,
    saveItems,
    setItem,
    getItem,
    markAsFinished,
    createItems,
    editItem,
    exposeHello
  }
})()
*/

