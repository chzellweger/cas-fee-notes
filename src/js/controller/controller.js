/* global dateFns, Handlebars */

import Model from '../model/model.js'

import Router from './router.js'
import routes from './routes.js'

import handlers from './handlers.js'

import { handlebarsRepeatHelper } from '../lib/helpers.js'

export default class Controller {
  constructor(key, router) {
    if (key) {
      this.key = key
    } else {
      throw new Error('please provide a key for you controller object')
    }

    this.model = new Model(key)

    this.views = {
      form: {},
      main: {}
    }

    this.editing = 0

    Handlebars.registerHelper('repeat', handlebarsRepeatHelper)
  }
  init(hook) {
    this.hook = hook

    this.router = new Router(this, this.hook, routes)
    this.router.init()
  }
  
  render(createHTML) {
    console.log('render')
    let items = {
      items: this.model.notesStorage
        .getAllNotes()
        .map(el => el.getPrettyNote())
    }
    this.hook.innerHTML = createHTML(items)
    this.initView()
  }
  initView() {
    console.log('switch view')
    switch (window.location.hash) {
      case '#main':
        this.initMain()
        break
      case '#add':
        this.initForm()
        break
      case '#edit':
        this.initEdit()
        break
      default:
        return null
    }
  }
  initMain() {
    console.log('init main')
    this.views.main.countField = document.querySelector('#count')
    this.views.main.styleChanger = document.querySelector('#select-style')
    this.views.main.sortNotes = document.querySelector('nav > div:first-child')
    this.views.main.toggleFinished = document.querySelector('#toggle-finished')
    this.views.main.articles = document.querySelector('main')
    
    handlers.setStyle.call(this)
    handlers.setCount.call(this)
    handlers.setSort.call(this)
    handlers.setToggleFinished.call(this)

    this.views.main.sortNotes.addEventListener('click', handlers.onSort.bind(this))
    this.views.main.styleChanger.addEventListener('change', handlers.onStyleChange.bind(this))
    this.views.main.toggleFinished.addEventListener('click', handlers.onFilter.bind(this))
    this.views.main.articles.addEventListener('click', handlers.onMarkNoteAsFinished.bind(this))
    this.views.main.articles.addEventListener('click', handlers.onEditNote.bind(this))

  }
  initForm() {
    console.log('init form')
    this.views.form.title = document.querySelector('#title')
    this.views.form.content = document.querySelector('#content')
    this.views.form.importance = document.querySelectorAll('input[name=importance]')
    this.views.form.dueDate = document.querySelector('#due-date')
    this.views.form.submit = document.querySelector('button[type=submit]')
    
    this.views.form.submit.onclick = handlers.onSubmitAddForm.bind(this)
  }
  initEdit() {
    console.log('init edit')
    this.initForm()

    const note = this.model.notesStorage.getNoteById(this.editing).toJSON()

    this.views.form.title.value = note.title
    this.views.form.content.value = note.content
    ;[...this.views.form.importance]
      .find(element => element.value === note.importance).checked = true
    this.views.form.dueDate.value = dateFns.format(new Date(note.dueDate),'YYYY-MM-DD' )
  
    this.views.form.submit.onclick = handlers.onSubmitEditForm.bind(this)
  }
}
