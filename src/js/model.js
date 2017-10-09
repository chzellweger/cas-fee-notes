/* eslint no-unused-vars: "off" */

const Model = (function() {
  class Model {
    async get(key) {
      // simulate very slow remote api
      await new Promise(resolve => setTimeout(resolve, 1))

      if(key) return JSON.parse(localStorage.getItem(key))
    }
    async set(key, data, callback) {
      if(key) {
        // simulate very slow remote api
        await new Promise(resolve => setTimeout(resolve, 1))

        localStorage.setItem(key, JSON.stringify(data))

        console.log('stored...')
      } 
      if (callback) callback()
    }
  }
  return Model
})()
