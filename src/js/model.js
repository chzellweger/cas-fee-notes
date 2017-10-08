/* eslint no-unused-vars: "off" */

const Model = (function() {
  class Model {
    get(key) {
      if(key) return JSON.parse(localStorage.getItem(key))
    }
    set(key, data, callback) {
      if(key) {
        localStorage.setItem(key, JSON.stringify(data))
      } 
      if (callback) callback()
    }
  }
  return Model
})()
