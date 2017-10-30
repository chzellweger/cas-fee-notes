/* global dateFns, Handlebars */

import { handlebarsRepeatHelper } from '../lib/helpers.js'

import model from '../model/model.js'
import * as handlers from './handlers.js'

let views = {
  form: {},
  main: {}
}

let hook = ''

let editing = ''

function setEditing(value) {
  editing = value
}

function getEditing() {
  return editing
}

const init = (hookElement) => {
  hook = hookElement
  
  Handlebars.registerHelper('repeat', handlebarsRepeatHelper)

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

const createView = (createHTML) => {
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
  switch (window.location.hash) {
    case '#main':
    initMain()
    break
    case '#add':
    initForm()
    break
    case '#edit':
    initEdit()
    break
    default:
    return null
    }
  }

function initMain () {
  const main = views.main
  
  main.countField = document.querySelector('#count')
  main.styleChanger = document.querySelector('#select-style')
  main.sortNotes = document.querySelector('nav > div:first-child')
  main.toggleFinished = document.querySelector('#toggle-finished')
  main.articles = document.querySelector('main')

  handlers.setStyle()
  handlers.setCount()
  handlers.setSort()
  handlers.setToggleFinished()
  
  main.sortNotes.addEventListener('click', handlers.onSort)

  main.styleChanger.addEventListener(
    'change',
    handlers.onStyleChange
  )
  main.toggleFinished.addEventListener('click', handlers.onFilter)
  main.articles.addEventListener(
    'click',
    handlers.onMarkNoteAsFinished
  )
  main.articles.addEventListener('click', handlers.onEditNote)
}

const initForm = () => {
  const form = views.form
  
  form.title = document.querySelector('#title')
  form.content = document.querySelector('#content')
  form.importance = document.querySelectorAll('input[name=importance]')
  form.dueDate = document.querySelector('#due-date')
  form.submit = document.querySelector('button[type=submit]')
  form.submit.onclick = handlers.onSubmitForm.bind(null, 'add')
  }
  
const initEdit = () => {
  const form = views.form
  
  initForm()
  
  const note = model.notes.getById(editing).toJSON()
  
  form.title.value = note.title
  form.content.value = note.content
  ;[...form.importance].find(
    element => element.value === note.importance
  ).checked = true
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
