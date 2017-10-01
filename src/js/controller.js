'use strict'
const controller = (function() {
  return class Controller {
    constructor(model, view) {
      this.model = new Model()
      this.view = new View()
    }
    init() {
      console.log('init')
      view.init;
    }
    getItem(key) {
      return model.getItem(key)
    }
    setItem(key, item) {
      model.getItem(key, item)
    }
  }
})()
  /*
  function Controller(model, view) {
    this.val = 'controller'
    this.model = new model.Model()
    this.view = new View()
  }
  Controller.prototype.log = function() {
    console.log(this.val)
  }
  Controller.prototype.init = function (){
    this.view.init()
  }
  return {
    Controller
  }
})()
/*
const controller = (function(model, view) {
  console.log(view)
  this.view = new view()
  this.controller = new controller()

  const init = function () {
    this.view.init()
    this.createItems()
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
    console.log('create')
    model.createItems()
  }

  const editItems = function (id) {
    const item = model.getItems().find(el => el.id.toString() === id)
    console.log(item)
    view.fillFields(item)

    //model.createItems(id)
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
})(window, document, model, view)
*/

