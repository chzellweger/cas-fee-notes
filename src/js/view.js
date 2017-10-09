/* global Controller Handlebars helpers dateFns */
/* eslint no-unused-vars: "off" */

const View = (function() {
  const $qs = helpers.$querySelector
  const $qsA = helpers.$querySelectorAll

  class View {
    constructor() {
      this._spinner = $qs('#spinner')

      // main-page elements
      this._count = $qs('#count')
      this._styleChanger = $qs('#select-style')
      this._sortButtons = $qs('nav > div:first-child')
      this._toggleShowFinishedButton = $qs('#toggle-finished')

      // form-elements
      this._title = $qs('#title')
      this._content = $qs('#content')
      this._importance = $qsA('input[name="importance"]')
      this._finishby = $qs('#date')

      // hook for dynamically rendered content
      this._target = $qs('#rendered-content')
      
      // handlebars-template
      this._source = $qs('#note-template') && $qs('#note-template').innerHTML
    }


    initRouter() {
      window.addEventListener('hashchange', () => console.log('hashchanged'))
    }

    initHandlebars() {
      Handlebars.registerHelper('repeat', helpers.handlebarsRepeatHelper)
      this._createHtml = Handlebars.compile(this._source)
    }

    initStyleListener(handler) {
      window.addEventListener('DOMContentLoaded', handler)
    }

    initStyleChanger(handler, style) {
      this._styleChanger.value = style
      this._styleChanger.addEventListener('change', handler)
    }

    initToggleShowFinishedItems(handler, filter = false) {
      this._toggleShowFinishedButton.checked = filter
      this._toggleShowFinishedButton.addEventListener('change', handler)
    }

    initSetItemAsFinished(handler) {
      const contentList = this._target
      contentList.addEventListener('click', handler.bind(null, contentList))
    }

    initSortButtons(handler, initialValue) {
      initialValue = initialValue || 'finish_date'
      
      document.getElementById(initialValue).checked = true

      this._sortButtons.addEventListener(
        'click',
        handler.bind(null, this._sortButtons)
      )
    }

    fillFields(item) {
      this._title.value = item.title

      this._content.value = item.content
      Array.from(this._importance).find(
        el => el.value === item.importance.toString()
      ).checked = true
      this._finishby.value = dateFns.format(dateFns.parse(item.finish_date), 'YYYY-MM-DD')
    }

    toggleSpinner() {}

    render(items) {
      const content = this._createHtml({ items: [...items] })

      this._target.innerHTML = content

      this.toggleSpinner()
    }
  }
  return View
})()
