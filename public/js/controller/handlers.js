import model from '../model/model.js'
import c from './controller.js'

export function setCount() {
  const length = model.notes.get().length
  c.views.main.countField.innerText =
    length + ' ' + (length === 1 ? 'Notiz' : 'Notizen')
}

export function setStyle() {
  const style = model.state.getItem('style')

  if (c.views.main.styleChanger){
    c.views.main.styleChanger.value = style
  }
  
  c.views.header.classList.add(style)
  
  c.views.style = style

  document.body.className = style
}

export function setSort() {
  const mapStateToView = {
    dueDate: 'finish_date',
    createdAt: 'created_at',
    importance: 'importance'
  }

  const inputs = c.views.main.sortNotes.querySelectorAll('input')

  let value = model.state.getItem('sortBy')

  const sortBy = mapStateToView[value] || 'finish_date'

  const toCheck = [...inputs].find(input => input.value === sortBy)
  toCheck.checked = true
}

export function setToggleFinished() {
  const filterStatus = model.state.getItem('filterItems')

  c.views.main.toggleFinished.checked = filterStatus
}

export function onStyleChange(e) {
  document.body.className = e.target.value
  model.state.updateItem('style', e.target.value)

  c.views.header.classList.replace(c.views.style, e.target.value)
  c.views.style = e.target.value
}

export function onSort(e) {
  setTimeout(() => {
    const mapViewToState = {
      finish_date: 'dueDate',
      created_at: 'createdAt',
      importance: 'importance'
    }

    const checked = document.querySelector('input[type=radio]:checked')

    const value = checked.value

    const sortBy = mapViewToState[value] || 'dueDate'

    model.state.updateItem('sortBy', sortBy, c.render)
  }, 0)
}

export function onFilter(e) {
  model.state.updateItem('filterItems', e.target.checked, c.render)
}

export function onMarkNoteAsFinished(e) {
  if (e.target.type === 'checkbox') {
    const id = e.target.dataset.id
    model.notes.markAsFinished(id, c.render)
  }
}

export function onEditNote(e) {
  if (e.target.nodeName === 'A') {
    c.setEditing(e.target.dataset.id)
  }
}

export function onDeleteNote(e) {
  if (e.target.nodeName === 'A' && e.target.id === 'delete') {
    model.notes.delete(e.target.dataset.id, c.render)
  }
}

export function onSubmitForm(mode, e) {
  e.preventDefault()

  let note = _readFields()

  if (mode === 'add') {
    model.notes.add(note)
  } else if (mode === 'edit') {
    model.notes.update(note, c.getEditing())
  }
}

function _readFields() {
  let note = {
    title: c.views.form.title.value,
    content: c.views.form.content.value,
    importance: [...c.views.form.importance].find(el => el.checked).value,
    dueDate: c.views.form.dueDate.value
  }

  c.views.form.title.value = ''
  c.views.form.content.value = ''
  c.views.form.dueDate.value = ''

  return note
}
