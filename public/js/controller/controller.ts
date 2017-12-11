/* global dateFns, Handlebars */

import { handlebarsRepeatHelper } from '../lib/helpers.js'

import model from '../model/model.js'
import * as handlers from './handlers.js'

Handlebars.registerHelper('repeat', handlebarsRepeatHelper)

interface MainView {
	countField: HTMLElement;
	sortNotes: HTMLElement;
	toggleFinished: HTMLInputElement;
	styleChanger: HTMLInputElement;
	articles: HTMLElement;
}

interface FormView {
	title: HTMLInputElement;
	content: HTMLTextAreaElement;
	importance: NodeListOf<HTMLInputElement>;
  dueDate: HTMLInputElement;
  submit: HTMLButtonElement;
}

interface Views {
	form: FormView
	main: MainView
	style: string
	header: HTMLElement
}

interface Items {
	items: Array<string>
}

let views: Views

let hook: HTMLElement

let editing: string

const setEditing = (value: string): void => {
	editing = value
}

const getEditing = (): string => {
	return editing
}

const init = (hookElement: HTMLElement): void => {
	hook = hookElement

	if (!window.location.hash) {
		window.location.hash = '#main'
	}

	window.addEventListener('hashchange', () => {
		render()
	})

	model.notes.load(model.state.load(render))
}

const render = (): void => {
	model.templates.getTemplate(createView)
}

const createView = (createHTML: Function): void => {
	let items: Items = {
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

const initView = (): void => {
	const views = {
		'#main': initMain,
		'#add': initForm,
		'#edit': initEdit
	}

	views[window.location.hash] && views[window.location.hash]()
}

const initMain = () => {
	const main = views.main

	views.header = document.querySelector('header')

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
	main.styleChanger.addEventListener('change', handlers.onStyleChange)
	main.toggleFinished.addEventListener('click', handlers.onFilter)
	main.articles.addEventListener('click', handlers.onMarkNoteAsFinished)
	main.articles.addEventListener('click', handlers.onEditNote)
	main.articles.addEventListener('click', handlers.onDeleteNote)
}

const initForm = () => {
	const form = views.form

	views.header = document.querySelector('header')

	form.title = document.querySelector('#title')
	form.content = document.querySelector('#content')
	form.importance = document.querySelectorAll('input[name=importance]')
	form.dueDate = document.querySelector('#due-date')
	form.submit = document.querySelector('button[type=submit]')

	handlers.setStyle()

	form.submit.onclick = handlers.onSubmitForm.bind(null, 'add')
}

const initEdit = () => {
	const form = views.form

	initForm()

	const note = model.notes.getById(editing).toJSON()

	form.title.value = note.title
	form.content.value = note.content
	;[...form.importance].find(element => element.value === note.importance).checked = true
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
