const express = require('express')
const router = express.Router()

const state = require('../controller/stateController.js')
const notes = require('../controller/notesController.js')

router.get('/store/notes', notes.getNotes)
router.put('/store/notes', notes.putNotes)

router.get('/store/state', state.getState)
router.put('/store/state', state.putState)

module.exports = router
