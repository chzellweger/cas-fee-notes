'use strict'

import model from '../model/model.js'
import { views, editing, render } from './controller.js'

export function setCount(e) {
  const length = model.notes.get().length
  views.main.countField.innerText =
    length + ' ' + (length === 1 ? 'Notiz' : 'Notizen')
}

export function setStyle(e) {
  console.log(this)
  const style = model.state.getItem('style')
  views.main.styleChanger.value = style
  document.body.className = style
}

export function setSort(e) {
  const inputs = views.main.sortNotes.querySelectorAll('input')

  let value = model.state.getItem('sortBy')

  let sortBy = ''

  if (value === 'default') {
    sortBy = 'finish_date'
  } else {
    switch (value) {
      case 'dueDate':
        sortBy = 'finish_date'
        break
      case 'createdAt':
        sortBy = 'created_at'
        break
      case 'importance':
        sortBy = 'importance'
        break
      default:
        sortBy = 'dueDate'
    }
  }

  const toCheck = [...inputs].find(input => input.value === sortBy)
  toCheck.checked = true
}

export function setToggleFinished() {
  const filterStatus = model.state.getItem('filterItems')
  
  views.main.toggleFinished.checked = filterStatus
}

export function onStyleChange(e) {
  console.log('onStyleChange')
  document.body.className = e.target.value
  model.state.updateItem('style', e.target.value)
}

export function onSort(e) {
  setTimeout(() => {
    console.log('onSort')
    const checked = document.querySelector('input[type=radio]:checked')
    const value = checked.value
    
    let sortBy = ''

    switch (value) {
      case 'finish_date':
        sortBy = 'dueDate'
        break
      case 'created_at':
        sortBy = 'createdAt'
        break
      case 'importance':
        sortBy = 'importance'
        break
      default:
        sortBy = 'dueDate'
    }

    model.state.updateItem('sortBy', sortBy, render)
  }, 0)
}

export function onFilter(e) {
  console.log('onFilter')
  model.state.updateItem(
    'filterItems',
    e.target.checked,
    render()
  )
}

export function onMarkNoteAsFinished(e) {
  if (e.target.type === 'checkbox') {
    console.log('onMarkNoteAsFinished')
    const id = e.target.dataset.id

    const note = model.notes.getNoteById(id).toJSON()
    note.isFinished = !note.isFinished

    model.notes.updateNote(note, id)

    setTimeout(() => {
      model.notes.updateItem(
        'notes',
        model.notes.getNotes(),
        render()
      )
    }, 500)
    console.log(this)
  }
}

export function onEditNote(e) {
  if (e.target.nodeName === 'A') {
    console.log('onEditNote')
    this.editing = e.target.dataset.id
  }
}

export function _readFields() {
  let note = {
    title: views.form.title.value,
    content: views.form.content.value,
    importance: [...views.form.importance].find(el => el.checked).value,
    dueDate: views.form.dueDate.value
  }

  views.form.title.value = ''
  views.form.content.value = ''
  views.form.dueDate.value = ''

  return note
}

export function onSubmitForm(mode, e) {
  e.preventDefault()

  let note = _readFields()

  if (mode === 'add') {
    model.notes.add(note)
  } else if (mode === 'edit') {
    model.notes.update(note, editing)
  }

  model.notes.updateItem(
    'notes',
    model.notes.get().map(note => note.toJSON())
  )
}
