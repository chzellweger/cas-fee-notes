import model from '../model/model.js'
import c from './controller.js'

export function setCount() {
  const length = model.notes.get().length
  c.views.main.countField.innerText =
    length + ' ' + (length === 1 ? 'Notiz' : 'Notizen')
}

export function setStyle() {
  const style = model.state.getItem('style')
  c.views.main.styleChanger.value = style
  document.body.className = style
}

export function setSort() {
  const inputs = c.views.main.sortNotes.querySelectorAll('input')

  let value = model.state.getItem('sortBy')

  let sortBy = ''
  
  // map state-values to view-values
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
    sortBy = 'finish_date'
  }
  
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
}

export function onSort(e) {
  setTimeout(() => {
    const checked = document.querySelector('input[type=radio]:checked')
    const value = checked.value
    
    let sortBy = ''

    // map view-values to state-values
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

    model.state.updateItem('sortBy', sortBy, c.render)
  }, 0)
}

export function onFilter(e) {
  model.state.updateItem(
    'filterItems',
    e.target.checked,
    c.render
  )
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
