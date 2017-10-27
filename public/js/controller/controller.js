/* global dateFns, Handlebars */

import Model from '../model/model.js'

// import TemplateStorage from './templateStorage.js'
// import routes from './routes.js'

import { getTemplate } from '../model/templateStore.js'

import handlers from './handlers.js'

import { handlebarsRepeatHelper } from '../lib/helpers.js'

export default class Controller {
  constructor(key, router) {
    if (key) {
      this.key = key
    } else {
      throw new Error('please provide a key for you controller object')
    }

    this.model = new Model(this.key)
    console.log(this.model)
    // this.templateStorage = new TemplateStorage(routes)
    // console.log(this.templateStorage)

    this.views = {
      form: {},
      main: {}
    }

    this.editing = ''

    Handlebars.registerHelper('repeat', handlebarsRepeatHelper)
  }
  init(hook) {
    console.log('init controller')
    this.hook = hook

    if (!window.location.hash) {
      window.location.hash = '#main'
    }

    window.addEventListener('hashchange', () => {
      this.render()
    })

    this.render()
  }
  render() {
    getTemplate(this.createView.bind(this))
  }
  createView(createHTML) {
    let items = {
      items: this.model.notesStorage
        .getNotes({
          filterItems: this.model.data.getItem('filterItems'),
          sortBy: this.model.data.getItem('sortBy')
        })
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
    const main = this.views.main

    main.countField = document.querySelector('#count')
    main.styleChanger = document.querySelector('#select-style')
    main.sortNotes = document.querySelector('nav > div:first-child')
    main.toggleFinished = document.querySelector('#toggle-finished')
    main.articles = document.querySelector('main')

    handlers.setStyle.call(this)
    handlers.setCount.call(this)
    handlers.setSort.call(this)
    handlers.setToggleFinished.call(this)

    main.sortNotes.addEventListener('click', handlers.onSort.bind(this))
    main.styleChanger.addEventListener(
      'change',
      handlers.onStyleChange.bind(this)
    )
    main.toggleFinished.addEventListener('click', handlers.onFilter.bind(this))
    main.articles.addEventListener(
      'click',
      handlers.onMarkNoteAsFinished.bind(this)
    )
    main.articles.addEventListener('click', handlers.onEditNote.bind(this))
  }
  initForm() {
    console.log('init form')
    const form = this.views.form

    form.title = document.querySelector('#title')
    form.content = document.querySelector('#content')
    form.importance = document.querySelectorAll('input[name=importance]')
    form.dueDate = document.querySelector('#due-date')
    form.submit = document.querySelector('button[type=submit]')

    form.submit.onclick = handlers.onSubmitForm.bind(this, 'add')
  }
  initEdit() {
    console.log('init edit')
    const form = this.views.form

    this.initForm()

    const note = this.model.notesStorage.getNoteById(this.editing).toJSON()

    form.title.value = note.title
    form.content.value = note.content
    ;[...form.importance].find(
      element => element.value === note.importance
    ).checked = true
    form.dueDate.value = dateFns.format(new Date(note.dueDate), 'YYYY-MM-DD')

    form.submit.onclick = handlers.onSubmitForm.bind(this, 'edit')
  }
}
