import Controller from './js/controller/controller.js'

const controller = new Controller('notes')

document.addEventListener("DOMContentLoaded", function init() {
  controller.init(document.getElementById('app'))
})
