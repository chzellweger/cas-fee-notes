/* global Model View helpers dateFns */
/* eslint no-unused-vars: "off" */

const Controller = (function() {
  class Controller {
    init() {
      View.init()

      if (window.location.search.substring(1)) {
        this.createItems(helpers.getQueryStringAsObject())
      }
    }
    getItem(key) {
      return Model.getItem(key)
    }
    getItems() {
      return Model.getItems()
    }
    setItem(key, item) {
      Model.setItem(key, item)
      this.render()
    }
    markAsFinished(itemId, callback) {
      Model.markAsFinished(itemId, this.render.bind(this))
    }
    createItems(query) {
      if (query.mode) {
        View.fillFields(
          Model.getItems().find(el => el.id.toString() === query.id)
        )
        return
        // implement edit mode
      }

      const items = Model.getItems()
      const note = query

      if (note) {
        note.id = new Date().getTime()
        note.importance = note.importance || 1
        note.finished = false
        // note.finishby = dateFns.distanceInWordsToNow(new Date(), note.finishby)
       // new Date(note.finishby).getTime() > new Date().getTime() ? note.finishby : new Date().format("dd-mm-yyyy")
        items.push(note)
        Model.saveItems(items)
      }
    }
    sortItems(items, sortBy) {
      if (sortBy === 'finishby') {
        items = items.sort((a, b) => {
          return a[sortBy] > b[sortBy]
        })
      } else {
        items = items.sort((a, b) => {
          return a[sortBy] < b[sortBy]
        })
      }
      return items
    }
    render() {
      // get app state
      const showAll = this.getItem('filter')
      const sortBy = this.getItem('sort')

      let items = this.getItems('notes')

      // setup items according to state
      if (!showAll) {
        items = items.filter(item => item.finished !== true)
      }
      
      items = items.map(item => {
        item.finishby = dateFns.distanceInWordsToNow(item.finishby, new Date())
        return item
      })
      
      items = this.sortItems(items, sortBy)
      View.render(items)
    }
  }
  return new Controller()
})()
