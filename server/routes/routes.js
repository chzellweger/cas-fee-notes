const express = require('express')
const router = express.Router()

const controller = require('../controller/controller')


router.get('/store/notes', (req, res) => {
  controller.getItems(req, res, 'notes')
})

router.put('/store/notes', (req, res) => {
  controller.putItems(req, res, 'notes')
})

router.get('/store/state', (req, res) => {
  controller.getItems(req, res, 'state')
})

router.put('/store/state', (req, res) => {
  controller.putItems(req, res, 'state')
})

module.exports = router
