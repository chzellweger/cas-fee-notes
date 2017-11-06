import model from '../model/model.js'
import c from './controller.js'

export function setCount() {
  const length = model.notes.get().length
  c.views.main.countField.innerText = length
}

export function setStyle() {
  const style = model.state.getItem('style')
  c.views.main.styleChanger.value = style
  document.body.className = style
}

export function setSort() {
  const mapStateToView = {
    'dueDate': 'due_date',
    'createdAt': 'created_at',
    'importance': 'importance'
  }

  const sort = c.views.main.sortNotes
  
  let value = model.state.getItem('sortBy')
  
  const sortBy = mapStateToView[value] || 'finish_date'
  
  sort.value = sortBy
}

export function setToggleFinished() {
  const filterStatus = model.state.getItem('filterItems')

  c.views.main.toggleFinished.value = filterStatus
}

export function onStyleChange(e) {
  document.body.className = e.target.value
  model.state.updateItem('style', e.target.value)
}

export function onSort(e) {
  const mapViewToState = {
      'due_date': 'dueDate',
      'created_at': 'createdAt',
      'importance': 'importance'
    }

    setTimeout(() => {
      const value = e.target.value
      
      const sortBy = mapViewToState[value] // || 'dueDate'
      model.state.updateItem('sortBy', sortBy, c.render)
    }, 0)
  }

export function onFilter(e) {
  model.state.updateItem(
    'filterItems',
    e.target.value,
    c.render
  )
}

export function onMarkNoteAsFinished(e) {
  if (e.target.type === 'checkbox') {
    console.log('mark as finisehd')
    const id = e.target.dataset.id
    console.log(id)
    model.notes.markAsFinished(id, c.render)
  }
}

export function onEditNote(e) {
  if (e.target.nodeName === 'A') {
    c.setEditing(e.target.dataset.id)
  }
}

export function onDeleteNote(e) {
  if(e.target.nodeName === 'A' && e.target.id === 'delete') {
    model.notes.delete(e.target.dataset.id, c.render)
  }
}

export function onSubmitForm(mode, e) {
  console.log(c.views.form.importance[0].value)
  let note = _readFields()
  console.log(note.importance)
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
    importance: c.views.form.importance.value,
    dueDate: c.views.form.dueDate.value
  }
  
  c.views.form.title.value = ''
  c.views.form.content.value = ''
  c.views.form.dueDate.value = ''

  return note
}
