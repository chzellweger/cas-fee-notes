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
    initHandlebars() {
      Handlebars.registerHelper('repeat', helpers.handlebarsRepeatHelper)
      this._createHtml = Handlebars.compile(this._source)
    }
    initToggleShowFinished(handler, filter) {
      this._toggleShowFinishedButton.checked = filter

      this._toggleShowFinishedButton.addEventListener('change', handler)
    }
    initStyleListener(handler) {
      window.addEventListener('DOMContentLoaded', handler)
    }
    initStyleChanger(handler, style) {
      this._styleChanger.value = style
      this._styleChanger.addEventListener('change', handler)
    }
    initSetFinished(handler) {
      const contentList = this._target
      contentList.addEventListener('click', handler)
    }
    initFinish(handler) {
      const contentList = this._target
      contentList.addEventListener('click', handler)
    }
    initSortButtons(handler) {
      const sortButtons = Array.from(this._sortButtons)
      sortButtons[0]['checked'] = true

      sortButtons.forEach(button =>
        addEventListener('change', handler.bind(null, null, sortButtons))
      )
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
  return View
})()
