const express = require('express')
const router = express.Router()

const state = require('../controller/stateController.js')

router.get('/store/state', state.getState)
router.put('/store/state', state.putState)

module.exports = router
