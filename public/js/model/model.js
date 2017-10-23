import DataStorage from './data.js'
import NotesStorage from './notesStorage.js'

export default class Model {
  constructor(key) {
    this.key = key
    this.data = new DataStorage(key)
    this.notesStorage = new NotesStorage(this.data.notes)
  }
}
