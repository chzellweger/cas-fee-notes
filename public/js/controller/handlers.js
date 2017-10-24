function setCount(e) {
  const length = this.model.notesStorage.getNotes().length
  this.views.main.countField.innerText =
    length + ' ' + (length === 1 ? 'Notiz' : 'Notizen')
}

function setStyle(e) {
  const style = this.model.data.getItem('style')
  this.views.main.styleChanger.value = style
  document.body.className = style
}

function setSort(e) {
  const inputs = this.views.main.sortNotes.querySelectorAll('input')

  let value = this.model.data.getItem('sortBy')

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

function setToggleFinished() {
  const filterStatus = this.model.data.getItem('filterItems')

  this.views.main.toggleFinished.checked = filterStatus
}

function onStyleChange(e) {
  console.log('onStyleChange')
  document.body.className = e.target.value
  this.model.data.updateItem('style', e.target.value)
}

function onSort(e) {
  setTimeout(() => {
    console.log('onSort')
    const checked = document.querySelector('input[type=radio]:checked')
    const value = checked.value

    const sortNotes = this.model.notesStorage.sortNotes.bind(
      this.model.notesStorage
    )
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
        sortNotes('dueDate')
    }

    this.model.data.updateItem('sortBy', sortBy, this.render.bind(this))
  }, 0)
}

function onFilter(e) {
  console.log('onFilter')
  this.model.data.updateItem(
    'filterItems',
    e.target.checked,
    this.render.bind(this)
  )
}

function onMarkNoteAsFinished(e) {
  if (e.target.type === 'checkbox') {
    console.log('onMarkNoteAsFinished')
    const id = e.target.dataset.id

    const note = this.model.notesStorage.getNoteById(id).toJSON()
    note.isFinished = !note.isFinished

    this.model.notesStorage.updateNote(note, id)

    setTimeout(() => {
      this.model.data.updateItem(
        'notes',
        this.model.notesStorage.getNotes(),
        this.render.bind(this)
      )
    }, 500)
    console.log(this)
  }
}

function onEditNote(e) {
  if (e.target.nodeName === 'A') {
    console.log('onEditNote')
    this.editing = e.target.dataset.id
  }
}

function _readFields() {
  let note = {
    title: this.views.form.title.value,
    content: this.views.form.content.value,
    importance: [...this.views.form.importance].find(el => el.checked).value,
    dueDate: this.views.form.dueDate.value
  }

  this.views.form.title.value = ''
  this.views.form.content.value = ''
  this.views.form.dueDate.value = ''

  return note
}

function onSubmitForm(mode, e) {
  e.preventDefault()

  let note = _readFields.call(this)

  if (mode === 'add') {
    this.model.notesStorage.addNote(note)
  } else if (mode === 'edit') {
    this.model.notesStorage.updateNote(note, this.editing)
  }

  this.model.data.updateItem(
    'notes',
    this.model.notesStorage.getNotes().map(note => note.toJSON())
  )
}
export default {
  setCount,
  onSort,
  setSort,
  setStyle,
  setToggleFinished,
  onStyleChange,
  onFilter,
  onMarkNoteAsFinished,
  onEditNote,
  onSubmitForm
}
