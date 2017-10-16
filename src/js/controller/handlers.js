function setCount(e) {
  const length = this.model.notesStorage.getAllNotes().length
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

  let sortBy = this.model.data.getItem('sortBy')

  if(sortBy === 'default') { sortBy = 'finish_date' }
  console.log(sortBy)

  const toCheck = [...inputs].find(input => input.value === sortBy)
  console.log(toCheck)
  toCheck.checked = true
}

function onStyleChange(e) {
  console.log('onStyleChange')
  document.body.className = e.target.value
  this.model.data.updateItem('style', e.target.value)
}

function onSort(e) {
  console.log('onSort')
  const checked = document.querySelector('input[type=radio]:checked')
  const value = checked.value

  const sortNotes = this.model.notesStorage.sortNotes.bind(this.model.notesStorage)

  switch(value) {
    case 'finish_date': sortNotes('dueDate')
    break;
    case 'created_at': sortNotes('createdAt')
    break;
    case 'importance': sortNotes('importance')
    break;
    default: sortNotes('dueDate')
  }

  this.model.data.updateItem('sortBy', value)
  // this.router.route(window.location.hash)
}

function onFilter(e) {
  console.log('onFilter')
  this.model.data.updateItem('filterItems', e.target.checked)
}

function onMarkNoteAsFinished(e) {
  if (e.target.type === 'checkbox') {
    console.log('onMarkNoteAsFinished')
    const id = e.target.dataset.id

    const note = this.model.notesStorage.getNoteById(id).toJSON()
    note.isFinished = !note.isFinished

    this.model.notesStorage.updateNote(note, id)

    this.model.data.updateItem('notes', this.model.notesStorage.getAllNotes())
    console.log(this)
  }
}

function onEditNote(e) {
  if(e.target.nodeName === 'A') {
    this.editing = e.target.dataset.id
  }
}

function onSubmitAddForm(e) {
  e.preventDefault()

  let note = {
    title: this.views.form.title.value,
    content: this.views.form.content.value,
    importance: [...this.views.form.importance].find(el => el.checked).value,
    dueDate: this.views.form.dueDate.value
  }

  this.views.form.title.value = ''
  this.views.form.content.value = ''
  this.views.form.dueDate.value = ''

  this.model.notesStorage.addNote(note)

  this.model.data.updateItem(
    'notes',
    this.model.notesStorage.getAllNotes().map(note => note.toJSON())
  )
}

function onSubmitEditForm(e) {
  e.preventDefault()

  console.log(this.editing)
  console.log('i would edit..')
  // to do: implement edit
}

export default {
  setCount,
  onSort,
  setSort,
  setStyle,
  onStyleChange,
  onFilter,
  onMarkNoteAsFinished,
  onEditNote,
  onSubmitAddForm,
  onSubmitEditForm
}
