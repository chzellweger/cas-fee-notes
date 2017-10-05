/* global Model View helpers dateFns */
/* eslint no-unused-vars: "off" */

const Controller = (function() {
  class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view

      this.handleStyleChanger = this.handleStyleChanger.bind(this)
      this.handleSetFinished = this.handleSetFinished.bind(this)
      this.handleSortButtons = this.handleSortButtons.bind(this)
      this.handleToggleShowFinished = this.handleToggleShowFinished.bind(this)

      this.render = this.render.bind(this)

      this.styleListener = this.styleListener.bind(this)
      this.setCount = this.setCount.bind(this)

      this.getItem = this.getItem.bind(this)
      this.setItem = this.setItem.bind(this)
      this.getItems = this.getItems.bind(this)
      this.setItems = this.setItems.bind(this)

      this.createItems = this.createItems.bind(this)

      this.sortItems = this.sortItems.bind(this)
    }
    init() {
      this.view.initStyleListener(this.styleListener)

      if (this.view._styleChanger) {
        console.log('main page')
        this.setCount()

        this.view.initStyleChanger(
          this.handleStyleChanger,
          this.getItem('style')
        )
        this.view.initSetFinished(this.handleSetFinished)
        this.view.initSortButtons(this.handleSortButtons)
        this.view.initToggleShowFinished(
          this.handleToggleShowFinished,
          this.getItem('filter')
        )

        this.view.initHandlebars()

        this.render(this.getItems())
      }

      if (window.location.search.substring(1)) {
        console.log('add page')
        this.createItems(helpers.getQueryStringAsObject())
      }
    }
    handleSetFinished(targetMarkup, e) {
      const contentList = targetMarkup
      if (e.target && e.target.matches('input[name="finish"]')) {
        this.markAsFinished(e.target.id)
      }
    }
    markAsFinished(id) {
      const findItem = el => el.id.toString() === id

      const items = this.model.getItems()

      const item = items.find(findItem)
      const index = items.findIndex(findItem)

      const modifiedItem = Object.assign(item, { finished: !item.finished })

      items[index] = modifiedItem

      this.model.saveItems(items, this.render)
    }
    handleToggleShowFinished() {
      const filter = this.getItem('filter')
      const newFilter = !filter

      this.setItem('filter', newFilter)
    }
    setCount() {
      const items = this.getItems()
      const postFix = items.length === 1 ? 'Notiz' : 'Notizen'

      this.view._count.innerText = `${items.length} ${postFix}`
    }
    handleStyleChanger(e) {
      this.setItem('style', e.target.value)
      document.body.className = e.target.value
    }
    styleListener() {
      const style = this.getItem('style') || 'day'
      document.body.className = style
      if (this.view._styleChanger) this.view._styleChanger.value = style
    }
    getItem(key) {
      return this.model.getItem(key)
    }
    getItems() {
      return this.model.getItems()
    }
    setItems(items) {
      this.model.setItems(items)
    }
    setItem(key, item) {
      this.model.setItem(key, item, this.render)
    }
    createItems(query) {
      if (query.mode) {
        this.view.fillFields(
          this.model.getItems().find(el => el.id.toString() === query.id)
        )
        return
        // implement edit mode
      }

      const items = this.model.getItems()
      const note = query

      if (note) {
        note.id = new Date().getTime()
        note.importance = note.importance || 1
        note.finished = false
        // note.finishby = dateFns.distanceInWordsToNow(new Date(), note.finishby)
        // new Date(note.finishby).getTime() > new Date().getTime() ? note.finishby : new Date().format("dd-mm-yyyy")
        items.push(note)
        this.model.saveItems(items)
      }
    }
    handleSortButtons(e, sortButtons) {
      const value = sortButtons.find(el => el.checked).value
      this.setItem('sort', value)
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
        item.finishby = dateFns.distanceInWordsToNow(
          item.finishby,
          new Date(),
          { locale: dateFns.eoLocale }
        )
        return item
      })

      items = this.sortItems(items, sortBy)
      this.view.render(items)
    }
  }
  return Controller
})()
