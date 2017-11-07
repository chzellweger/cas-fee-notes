/* global dateFns */
import { formatDay }  from '../../lib/helpers.js'

export default class Note {
  constructor(item = {}) {
    this.note = this._createNote(item)
  }

  _createNote({ id, title, content, dueDate, createdAt, isFinished, importance } = {}) {
    return {
      id: id || this._createId(),
      title: title || '',
      content: content || '',
      dueDate: new Date(dueDate).getTime() || '',
      createdAt: new Date(createdAt).getTime() || this._addCreationDate(),
      isFinished: isFinished || false,
      importance: importance || 1
    }
  }

  get id() {
    return this.note.id
  }

  set id(id) {
    this.note.id = id
  }

  getFinished() {
    return this.note.isFinished
  }

  setFinished(finished) {
    this.note.isFinished = finished
  }

  _createId() {
    const id = Math.random().toString(36).substr(2, 10)
    return `id-${id.toString()}`
  }

  _addCreationDate() {
    return new Date().getTime()
  }

  _getPrettyDueDate() {
    return dateFns.format(
      dateFns.parse(this.note.dueDate),
      'DD.MM. YYYY'
    )
  }

  _getLiteralDueDate(){
    const prefix = 'nächsten'
    const postfix = ', '

    if (
      dateFns.isSameWeek(new Date().getTime(), this.note.dueDate) &&
      dateFns.isAfter(this.note.dueDate, new Date().getTime())
    ) { 
      const day = dateFns.getDay(this.note.dueDate)

      return formatDay(day, prefix, postfix)
    } else {
      return ''
    }
  }

  _getPrettyCreatedAtDate() {
    return this.note.createdAt
  }

  editNote(item) {
    this.note = this._createNote(item)
  }

  getValueOfProperty(prop) {
    return this.note[prop]
  }

  toJSON() {
    return {
      "id": this.note.id,
      "title": this.note.title,
      "content": this.note.content,
      "dueDate": this.note.dueDate,
      "createdAt": this.note.createdAt,
      "importance": this.note.importance,
      "isFinished": this.note.isFinished
    }
  }

  getPrettyNote() {
    return {
      id: this.note.id,
      title: this.note.title,
      content: this.note.content,
      dueDate: this.dueDate,
      prettyDueDate: this._getPrettyDueDate(),
      literalDueDate: this._getLiteralDueDate(),
      createdAt: this._getPrettyCreatedAtDate(),
      importance: parseInt((this.note.importance), 10),
      isFinished: this.note.isFinished
    }
  }
}
