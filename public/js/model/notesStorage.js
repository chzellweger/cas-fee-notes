import Note from './note.js'

export default class NotesStorage {
  constructor(notes) {
    this.notes = []

    notes.forEach(note => this.addNote(note))
  }
  _getIndex(id) {
    return this.notes.findIndex(note => note.note.id === id)
  }
  _readNote(id) {
    return this.notes.find(note => note.getValueOfProperty('id') === id)
  }
  addNote(content, id) {
    if (id) {
      this._updateNote(content, id)
      return
    }

    this.notes.push(new Note(content))

    return this
  }
  updateNote(content, id) {
    console.log('updating')
    let index = this._getIndex(id)
   
    if (index === -1) {
      throw new Error('no such note...')
    }

    content.id = id
    
    
    let note = new Note(content)
    
    
    this.notes[index] = note

    return this
  }
  deleteNote(id) {
    let index = this._getIndex(id)

    if (index === -1) {
      throw new Error('no such note...')
    }

    this.notes.splice(index, 1)

    return this
  }
  filterNotes(showFiltered) {
    if (showFiltered) return this.notes
    return this.notes.filter(note => note.getValueOfProperty('isFinished') === false)
  }
  sortNotes(sortBy) {
    console.log('sorting by ' + sortBy)
    if (sortBy === 'finishby') {
      this.notes.sort((a, b) => {
        return a[sortBy] - b[sortBy]
      })
    } else {
      this.notes.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return -1
        }
        if (a[sortBy] < b[sortBy]) {
          return 1
        }
        return 0
      })
    }

    return this
  }
  getNoteById(id) {
    return this._readNote(id)
  }
  getNotes(settings) {
    console.trace(settings)
    if(settings) {
      return this.filterNotes(settings.filterItems)
    }
    return this.notes
  }
}
