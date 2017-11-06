/* global dateFns, Handlebars */

import { handlebarsRepeatHelper } from '../lib/helpers.js'

import model from '../model/model.js'
import * as handlers from './handlers.js'

Handlebars.registerHelper('repeat', handlebarsRepeatHelper)

let views = {
  form: {},
  main: {}
}

let hook = ''

let editing = ''

const setEditing = value => {
  editing = value
}

const getEditing = () => {
  return editing
}

const init = hookElement => {
  hook = hookElement
  
  if (!window.location.hash) {
    window.location.hash = '#main'
  }

  window.addEventListener('hashchange', () => {
    render()
  })

  model.notes.load(model.state.load(render))
}

const render = () => {
  model.templates.getTemplate(createView)
}

const createView = createHTML => {
  console.log(model.notes.
    get({
      filterItems: model.state.getItem('filterItems'),
      sortBy: model.state.getItem('sortBy')
    })
  )
  console.log(model.state.getItem('filterItems'))
  
  let items = {
    items: model.notes
      .get({
        filterItems: model.state.getItem('filterItems'),
        sortBy: model.state.getItem('sortBy')
      })
      .map(el => el.getPrettyNote())
  }

  hook.innerHTML = createHTML(items)

  initView()
}

const initView = () => {
  const views = {
    '#main': initMain,
    '#add': initForm,
    '#edit': initEdit
  }

  views[window.location.hash]()
}

const initMain = () => {
  const main = views.main

  main.countField = document.querySelector('#count')
  main.styleChanger = document.querySelector('#select-style')
  main.sortNotes = document.querySelector("#sort-notes")
  main.toggleFinished = document.querySelector('#toggle-finished')
  main.articles = document.querySelector('main')
  
  handlers.setStyle()
  handlers.setCount()
  handlers.setSort()
  handlers.setToggleFinished()

  main.sortNotes.addEventListener('change', handlers.onSort)
  main.styleChanger.addEventListener('change', handlers.onStyleChange)
  main.toggleFinished.addEventListener('change', handlers.onFilter)
  main.articles.addEventListener('click', handlers.onMarkNoteAsFinished)
  main.articles.addEventListener('click', handlers.onEditNote)
  main.articles.addEventListener('click', handlers.onDeleteNote)
}

const initForm = () => {
  const form = views.form

  form.title = document.querySelector('#title')
  form.content = document.querySelector('#content')
  form.importance = document.querySelector('#importance')
  form.dueDate = document.querySelector('#due-date')
  form.submit = document.querySelector('a[id=submit]')

  form.submit.onclick = handlers.onSubmitForm.bind(null, 'add')
}

const initEdit = () => {
  const form = views.form

  initForm()

  const note = model.notes.getById(editing).toJSON()
  form.title.value = note.title
  form.content.value = note.content
  form.importance.value = parseInt(note.importance, 10)
  form.dueDate.value = dateFns.format(new Date(note.dueDate), 'YYYY-MM-DD')

  form.submit.onclick = handlers.onSubmitForm.bind(null, 'edit')
}

export default {
  init,
  getEditing,
  setEditing,
  render,
  views
}
