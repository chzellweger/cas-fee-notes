/* global Model View helpers dateFns */
/* eslint no-unused-vars: "off" */

const Controller = (function() {
  class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view

      this._appState = {
        filter: this._getData('filter') || false,
        notes: this._getData('notes') || [],
        sortby: this._getData('sort') || 'finish_date',
        style: this._getData('style') || 'day'
      }

      this.render = this.render.bind(this)
    }

    init() {
      this.view.initRouter()

      
      if (this.view._styleChanger) {
        console.log('main page')
        this.view.initStyleListener(this.styleListener.bind(this))
        
        this.view.initStyleChanger(
          this.handleStyleChanger.bind(this),
          this._appState.style
        )
        
        this._setCount()

        this.view.initSortButtons(
          this.handleSortButtons.bind(this),
          this._appState.sortby
        )

        this.view.initToggleShowFinishedItems(
          this.handleToggleShowFinishedItems.bind(this),
          this._appState.filter
        )

        this.view.initSetItemAsFinished(this.handleSetItemAsFinished.bind(this))

        this.view.initHandlebars()

        // initial render
        this.render()
      }

      if (window.location.search.substring(1)) {
        console.log('add page')
        this.createItems(helpers.getQueryStringAsObject())
      }
    }

    handleStyleChanger(e) {
      this._setData('style', e.target.value)

      document.body.className = e.target.value
    }

    styleListener() {
      const style = this._appState.style

      document.body.className = style

      if (this.view._styleChanger) this.view._styleChanger.value = style
    }

    handleSortButtons(sortButtons, event) {
      const value = event.target.value
        ? event.target.value
        : event.target.parentNode.previousElementSibling.value

      if (value) {
        this._appState.sortby = value
        this.render()

        this._setData('sortby', value)
      }
    }

    handleSetItemAsFinished(targetMarkup, e) {
      const contentList = targetMarkup
      if (e.target && e.target.matches('input[name="finish"]')) {
        this._markItemAsFinished(e.target.id)
      }
    }

    handleToggleShowFinishedItems() {
      const filter = this._appState.filter

      const newFilter = !filter

      this._appState.filter = newFilter
      this.render()

      this._setData('filter', newFilter)
    }
    
    _markItemAsFinished(id) {
      const findItem = el => el.id.toString() === id

      const items = this._getData('notes')

      const item = items.find(findItem)

      const index = items.findIndex(findItem)

      const modifiedItem = Object.assign(item, { finished: !item.finished })

      items[index] = modifiedItem

      this._setData('notes', items, this.render.bind(this))
    }

    _setCount() {
      const items = this._getData('notes') || []
      const postFix = items.length === 1 ? 'Notiz' : 'Notizen'

      this.view._count.innerText = `${items.length} ${postFix}`
    }


    _getData(key) {
      return this.model.get(key)
    }

    _setData(key, item, callback) {
      console.log('setting data')
      this.model.set(key, item, callback)
    }

    createItems(query) {
      if (query.mode === 'edit') {
        this.view.fillFields(
          this._getData('notes').find(el => el.id.toString() === query.id)
        )
        return
        // implement edit mode
      }

      const items = this._getData('notes') || []

      const note = query

      if (note) {
        note.finish_date = Date.parse(note.finish_date)

        note.id = Math.floor(new Date().getTime() * Math.random())

        note.createdAt = new Date().getTime()

        note.importance = parseInt(note.importance, 10) || 1

        note.finished = false

        items.push(note)

        this.model.set('notes', items)
      }
    }

    _sortItems(items, sortBy) {
      if (sortBy === 'finishby') {
        items = items.sort((a, b) => {
          return a[sortBy] - b[sortBy]
        })
      } else {
        items = items.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) {
            return -1
          }
          if (a[sortBy] < b[sortBy]) {
            return 1
          }
          return 0
        })
        return items
      }
    }

    _prettifyDates(items) {
      items = items.map(item => {
        item.literal_finish_date = dateFns.getDay(item.finish_date)

        item.finish_date = dateFns.format(
          dateFns.parse(item.finish_date),
          'DD.MM. YYYY'
        )

        return item
      })
      return items
    }

    _filter(items) {
      const showAll = this._appState.filter

      if (!showAll) {
        return items.filter(item => item.finished !== true)
      }

      return items
    }

    render() {
      // get app state
      const items = this._appState.notes
      const sortBy = this._appState.sortby
      
      // filter, prettify, sort, and render items
      this.view.render(
        this._sortItems(
          this._prettifyDates(
            this._filter(items),
            ),
            sortBy)
        )
    }
  }

  return Controller
})()
