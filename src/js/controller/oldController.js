/* global Model View helpers dateFns */
/* eslint no-unused-vars: "off" */
import data from './data'
import model from './model'

const controller = {

  renderNotes: () => {
    appState.getAll().map(el=> {
        createNote(el);
    })
  }

  async init() {
      await Promise.all([
        this._getData('filter'),
        this._getData('notes'),
        this._getData('sortby'),
        this._getData('style')
      ]).then(promises => {
        this._appState = {
          filter: promises[0] || false,
          notes: promises[1] || [],
          sortby: promises[2] || 'finish_date',
          style: promises[3] || 'day'
        }
      })
      
      this.view.initStyleListener(
        this.styleListener.bind(this),
        this._appState.style
      )

      this.view.initSubmitButton(this.handleSubmitButton.bind(this))

      if (this.view._styleChanger) {
        console.log('main page')

        this.view.initStyleChanger(
          this.handleStyleChanger.bind(this),
          this._appState.style
        )

        this._setCount(this._appState.notes)

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

    // #methods
    // ## render
    render() {
      console.log('(re-)rendering...')

      // get app state
      const items = this._appState.notes
      const sortBy = this._appState.sortby

      // filter, prettify, sort, and render items
      this.view.render(
        this._sortItems(this._prettifyDates(this._filter(items)), sortBy)
      )
    }

    // ##view-handlers
    handleSubmitButton(e) {
      e.preventDefault()
      const item = this.view.collectFields()
      item.id = parseInt(helpers.getQueryVariable('id'), 10)

      this._createItems(item)
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

        this._setData('sortby', value, this.render)
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

      this._setData('filter', newFilter, this.render)
    }

    // #business-logic
    _markItemAsFinished(id) {
      const findItem = el => el.id.toString() === id

      const items = this._appState.notes

      const item = items.find(findItem)

      const index = items.findIndex(findItem)

      const modifiedItem = Object.assign(item, { finished: !item.finished })
      
      items[index] = modifiedItem
      
      // set short timeout before render for better visual feedback
      setTimeout(this._setData.bind(this, 'notes', items, this.render), 300)
    }

    _setCount(items) {
      // const items = this._getData('notes') || []
      const postFix = items.length === 1 ? 'Notiz' : 'Notizen'

      this.view.setCount(`${items.length} ${postFix}`)
    }

    _getData(key) {
      return this.model.get(key)
    }

    _setData(key, item, callback) {
      console.trace('setting data...')
      this._appState[key] = item

      // optimistically render new app-state
      if (callback) {
        callback()
      }

      // store new app-state
      console.log('storing...')
      this.model.set(key, item)
    }

    _editItem(query, items) {
      const item = items.find(el => el.id.toString() === query.id)
      this.view.fillFields(
        item
      )
      console.log(item)
    }

    _createItems(query) {
      const items = this._appState.notes || []

      if (query.id) {
        this._editItem(query, items)
        return
      }
      
      const note = query

      if (note) {
        note.finish_date = Date.parse(note.finish_date)

        note.id = Math.floor(new Date().getTime() * Math.random())

        note.createdAt = new Date().getTime()

        note.importance = parseInt(note.importance, 10) || 1

        note.finished = false

        items.push(note)

        this._setData('notes', items)
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
      return items.map(item => {
        const finishDate = item.finish_date
        const prefix = 'nächsten'
        const postfix = ', '

        item.pretty_finish_date = dateFns.format(
          dateFns.parse(item.finish_date),
          'DD.MM. YYYY'
        )

        if (
          dateFns.isSameWeek(new Date().getTime(), item.finish_date) &&
          dateFns.isAfter(item.finish_date, new Date().getTime())
        ) {
          const day = dateFns.getDay(item.finish_date)

          item.literal_finish_date = helpers.formatDay(day, prefix, postfix)
        } else {
          item.literal_finish_date = ''
        }
        return item
      })
    }

    _filter(items) {
      const showAll = this._appState.filter

      if (!showAll) {
        return items.filter(item => item.finished !== true)
      }

      return items
    }
  }
  
  export default Controller