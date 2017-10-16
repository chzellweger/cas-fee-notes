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
      this._submitButton = $qs('button[type="submit"]')

      // hook for dynamically rendered content
      this._target = $qs('#rendered-content')
      
      // handlebars-template
      this._source = $qs('#note-template') && $qs('#note-template').innerHTML
    }
    
    initHandlebars() {
      Handlebars.registerHelper('repeat', helpers.handlebarsRepeatHelper)
      this._createHtml = Handlebars.compile(this._source)
    }

    initStyleListener(handler, style) {
      document.body.classList.add(style)

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

      const boundHandler = handler.bind(null, contentList)

      contentList.addEventListener('click', boundHandler)
    }

    initSortButtons(handler, initialValue) {
      initialValue = initialValue || 'finish_date'
      
      $qs(`#${initialValue}`).checked = true

      const boundHandler = handler.bind(null, this.sortButtons)

      this._sortButtons.addEventListener('click', boundHandler)
    }

    initSubmitButton(handler){
      if(this._submitButton) {
        this._submitButton.addEventListener('click', handler)
      }
    }

    setCount(content) {
      this._count.innerText = content
    }

    collectFields() {
      const title = this._title = $qs('#title').value
      const content = this._content = $qs('#content').value
      const importance = this._importance = [...$qsA('input[name="importance"]')].find(el => el.checked === true).value
      const finishby = this._finishby = $qs('#date').value
      
      const item = {
        title,
        content,
        importance,
        finishby
      }
      return item
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
