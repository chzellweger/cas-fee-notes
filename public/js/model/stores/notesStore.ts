import remoteService from '../data/remoteService.js'

import Note from './note.js'

let notes: Note[] = []

function load(callback: Function) {
	;(async function() {
		let data: Object[] = await remoteService.getAll('notes')

		data = (data && data[0] && data[0]['notes']) || []
		_parseDataToNotes(data, callback)
	})()
}

function getNotes(settings): Note[] {
	if (settings) {
		_sortNotes(settings.sortBy)
		return _filterNotes(settings.filterItems)
	}
	return notes
}

function getNoteById(id): Note {
	return notes.find(note => note.id === id)
}

function addNote(content, id, callback) {
	if (id) {
		updateNote(content, id)
		return
	}

	notes.push(new Note(content))

	_saveAllNotes(notes, callback)
}

function updateNote(content, id, callback?: Function) {
	let index = _getIndex(id)

	if (index === -1) {
		console.log(new Error('no such note: ' + id))
		return
	}

	content.id = id

	let note = new Note(content)

	notes[index] = note

	_saveAllNotes(notes, callback)
}

function markNoteAsFinished(id, callback) {
	const note = getNoteById(id)
	const isFinished = note.getFinished()

	note.setFinished(!isFinished)

	updateNote(note.toJSON(), id, callback)
}

function deleteNote(id, callback) {
	let index = _getIndex(id)

	if (index === -1) {
		console.log(new Error('no such note: ' + id))
		return
	}
	notes.splice(index, 1)
	_saveAllNotes(notes, callback)
}

function _filterNotes(showFiltered) {
	if (showFiltered) return notes
	return notes.filter(note => note.getValueOfProperty('isFinished') === false)
}

function _sortNotes(sortBy) {
	if (sortBy === 'dueDate') {
		notes.sort((a: any, b: any) => {
			return a.toJSON()['dueDate'] - b.toJSON()['dueDate']
		})
	}

	if (sortBy === 'createdAt') {
		notes.sort((a: any, b: any) => {
			return a.toJSON()['createdAt'] - b.toJSON()['createdAt']
		})
	}

	if (sortBy === 'importance') {
		notes.sort((a, b) => {
			return parseInt(b.toJSON()['importance'], 10) - parseInt(a.toJSON()['importance'], 10)
		})
	}
}

function _parseDataToNotes(items, callback) {
	notes = items.map(note => new Note(note))
	_saveAllNotes(notes, callback)
}

function _getIndex(id) {
	return notes.findIndex(note => note.id === id)
}

function _saveAllNotes(toPersist, callback) {
	notes = toPersist
	let data = {
		type: 'notes',
		notes: toPersist.map(note => note.toJSON())
	}

	remoteService.persist('notes', data)

	if (callback) return callback(toPersist)
}

export default {
	get: getNotes,
	add: addNote,
	getById: getNoteById,
	delete: deleteNote,
	update: updateNote,
	markAsFinished: markNoteAsFinished,
	load: load
}
