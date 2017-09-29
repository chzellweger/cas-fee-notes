'use strict'
const controller = (function() {
  const init = function () {
    view.init()
  }

  const setItem = function (key, item) {
    model.setItem(key, item)
    view.render()
  }

  const getItem = function (key) {
    return model.getItem(key)
  }

  const toggleShowFinished = function(showFinishedButton) {
    model.setItem('filter', showFinishedButton.checked)
    view.render()
  }

  const createItems = function () {
    model.createItems()
  }

  const editItems = function (id) {
    console.log(id)
    console.log(model.getItems())
    const item = model.getItems().find(el => el.id.toString() === id)
    console.log(item)
    view.fillFields(item)

  }

  const getItems = function() {
    return model.getItems()
  }

  const markAsFinished = function(itemId) {
    model.markAsFinished(itemId)
  }
  
  const render = function () {
    const items =  model.getItems()
    view.render(items)
  }

  return {
    init,
    toggleShowFinished,
    markAsFinished,
    createItems,
    editItems,
    getItems,
    getItem,
    setItem,
    render
  }
})()
