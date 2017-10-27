import Note from './note.js'

const notes = []

function parseDataToNotes(items) {
  items.forEach(note => this.addNote(note))
}

function _getIndex(id) {
  return notes.findIndex(note => note.note.id === id)
}

function _readNote(id) {
  return notes.find(note => note.getValueOfProperty('id') === id)
}

function addNote(content, id) {
  if (id) {
    updateNote(content, id)
    return
  }
  notes.push(new Note(content))
}

function updateNote(content, id) {
  console.log('updating in clients notestorage')
  let index = _getIndex(id)

  if (index === -1) {
    throw new Error('no such note...')
  }

  content.id = id

  let note = new Note(content)
  
  notes[index] = note
}

function deleteNote(id) {
  let index = _getIndex(id)

  if (index === -1) {
    throw new Error('no such note...')
  }
  notes.splice(index, 1)
}

function filterNotes(showFiltered) {
  if (showFiltered) return this.notes
  return this.notes.filter(
    note => note.getValueOfProperty('isFinished') === false
  )
}

function sortNotes(sortBy) {
  if (sortBy === 'dueDate') {
    this.notes.sort((a, b) => {
      return a.toJSON()['dueDate'] - b.toJSON()['dueDate']
    })
  }

  if (sortBy === 'createdAt') {
    notes.sort((a, b) => {
      return a.toJSON()['createdAt'] - b.toJSON()['createdAt']
    })
  }

  if (sortBy === 'importance') {
    notes.sort((a, b) => {
      return (
        parseInt(b.toJSON()['importance'], 10) -
        parseInt(a.toJSON()['importance'], 10)
      )
    })
  }
}

function getNoteById(id) {
  return _readNote(id)
}

function getNotes(settings) {
  if (settings) {
    sortNotes(settings.sortBy)
    return filterNotes(settings.filterItems)
  }
  return notes
}

export default {
  parse: parseDataToNotes,
  get: getNotes,
  add: addNote,
  getById: getNoteById,
  delete: deleteNote
}
