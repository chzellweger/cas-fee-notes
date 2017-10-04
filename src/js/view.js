/* global Controller Handlebars helpers */
/* eslint no-unused-vars: "off" */

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
        this.initHandlebars()
        this.initStyleChanger()
        this.setCount()
        this.initToggleShowFinish()
        this.initSetFinished()
        this.initSort()

        this.render(Controller.getItems())
      }
    }
    initHandlebars() {
      Handlebars.registerHelper('repeat', helpers.handlebarsRepeatHelper)
      this._createHtml = Handlebars.compile(this._source)
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
    render(items) {
      const content = items.reduce((content, item) => {
        item.importance = parseInt(item.importance, 10)
        content += this._createHtml(item)
        return content
      }, '')

      this._target.innerHTML = content
    }
  }
  return new View()
})()
