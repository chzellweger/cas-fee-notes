import remoteService from './remoteService.js'

import Note from './note.js'

let notes = []

function load(callback) {
  (async function() {
    let data = await remoteService.getAll('notes')
    
    data = data && data[0] && data[0]['notes'] || []
    parseDataToNotes(data)
    
    saveAllNotes(notes, callback)
  })()
}

function saveAllNotes(toPersist, callback) {
  notes = toPersist
  let data = {
    type: 'notes',
    notes: toPersist.map(note => note.toJSON())
  }
  
  remoteService.persist('notes', data)
  
  if (callback) return callback(toPersist)
}

function getAllNotes() {
  return load('notes', () => {
    return notes
  })
}

function parseDataToNotes(items) {
  items.forEach(note => addNote(note))
}

function _getIndex(id) {
  return notes.findIndex(note => note.note.id === id)
}

function _readNote(id) {
  return notes.find(note => note.getValueOfProperty('id') === id)
}

function addNote(content, id, callback) {
  if (id) {
    updateNote(content, id)
    return
  }
  notes.push(new Note(content))
  
  saveAllNotes(notes, callback)
}

function updateNote(content, id, callback) {
  let index = _getIndex(id)

  if (index === -1) {
    throw new Error('no such note...')
  }

  content.id = id

  let note = new Note(content)
  
  notes[index] = note

  saveAllNotes(notes, callback)
}

function markNoteAsFinished(id, callback){
  const note = getNoteById(id).toJSON()
  note.isFinished = !note.isFinished
  updateNote(note, id, callback)
}

function deleteNote(id) {
  let index = _getIndex(id)

  if (index === -1) {
    throw new Error('no such note...')
  }
  notes.splice(index, 1)
}

function _filterNotes(showFiltered) {
  if (showFiltered) return notes
  return notes.filter(
    note => note.getValueOfProperty('isFinished') === false
  )
}

function _sortNotes(sortBy) {
  if (sortBy === 'dueDate') {
    notes.sort((a, b) => {
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
    _sortNotes(settings.sortBy)
    return _filterNotes(settings.filterItems)
  }
  return notes
}

export default {
  parse: parseDataToNotes,
  get: getNotes,
  add: addNote,
  getById: getNoteById,
  delete: deleteNote,
  update: updateNote,
  markAsFinished: markNoteAsFinished,
  getAllNotes: getAllNotes,
  load: load
}
