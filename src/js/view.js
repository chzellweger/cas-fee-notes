'use strict'
const View = (function() {
  class View {
    constructor() {
      this._styleChanger = document.getElementById('select-style')
      this._sortButtons = document.getElementsByName('sorting')
      this._toggleShowFinishedButton = document.getElementById(
        'toggle-finished'
      )
      this._count = document.getElementById('count')
      this._target = document.getElementById('rendered-content')
      this._source =
        document.getElementById('note-template') &&
        document.getElementById('note-template').innerHTML
      this._title = document.getElementById('title')
      this._content = document.getElementById('content')
      this._importance = document.getElementsByName('importance')
      this._finishby = document.getElementById('date')
    }
    init() {
      this.initStyleListener()

      if (this._styleChanger) {
        this.initStyleChanger()
        this.setCount()
        this.initToggleShowFinish()
        this.initSetFinished()
        this.initSort()

        this.render()
      }
    }
    initStyleListener() {
      window.addEventListener('DOMContentLoaded', () => {
        const style = Controller.getItem('style') || 'day'
        document.body.className = style
        if (this._styleChanger) this._styleChanger.value = style
      })
    }
    initStyleChanger() {
      this._styleChanger.addEventListener('change', e => {
        Controller.setItem('style', e.target.value)
        document.body.className = e.target.value
      })
    }
    initSetFinished() {
      const contentList = this._target
      contentList.addEventListener('click', function(e) {
        if (e.target && e.target.matches('input[name="finish"]')) {
          Controller.markAsFinished(e.target.id)
        }
      })
    }
    initToggleShowFinish() {
      this._toggleShowFinishedButton.checked = Controller.getItem('filter')

      this._toggleShowFinishedButton.addEventListener('change', function(e) {
        Controller.setItem('filter', e.target.checked)
      })
    }
    initFinish() {
      const contentList = this._target
      contentList.addEventListener('click', function(e) {
        if (e.target && e.target.matches('input[name="finish"]')) {
          Controller.markAsFinished(e.target.id, this.render)
        }
      })
    }
    initSort() {
      const sortButtons = Array.from(this._sortButtons)
      sortButtons[0]['checked'] = true
      sortButtons.forEach(button =>
        addEventListener('change', function() {
          const value = sortButtons.find(el => el.checked).value
          Controller.setItem('sort', value)
        })
      )
    }
    setCount() {
      const items = Controller.getItems()
      const postFix = items.length === 1 ? 'Notiz' : 'Notizen'

      this._count.innerText = `${items.length} ${postFix}`
    }
    fillFields(item) {
      this._title.value = item.title
      this._content.value = item.content
      Array.from(this._importance).find(
        el => el.value === item.importance.toString()
      ).checked = true
      this._finishby.value = item.finishby
    }
    render() {
      // get app state
      let items = Controller.getItems('notes')
      

      Handlebars.registerHelper('repeat', helpers.handlebarsRepeatHelper)
      const template = Handlebars.compile(this._source)
      const target = this._target

      const showAll = Controller.getItem('filter')
      const sortBy = Controller.getItem('sort')

      // setup items according to state
      if (!showAll) {
        items = items.filter(item => item.finished !== true)
      }

      if (sortBy === 'finishby') {
        items = items.sort((a, b) => {
          return a[sortBy] > b[sortBy]
        })
      } else {
        items = items.sort((a, b) => {
          return a[sortBy] < b[sortBy]
        })
      }

      let content = ''

      items.forEach(item => {
        var context = item
        context.importance = parseInt(context.importance, 10)
        var html = template(context)
        content += html
      })

      this._target.innerHTML = content
    }
  }
  return new View()
})()
